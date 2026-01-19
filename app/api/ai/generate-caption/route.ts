import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { clientId, platform, imageDescription, tone, language, includeHashtags, postType } = body;

    if (!clientId || !platform) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get client info and caption history
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      include: {
        captionHistory: {
          orderBy: { usedAt: "desc" },
          take: 20,
        },
      },
    });

    if (!client || client.adminId !== session.user.id) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Build previous captions context
    const previousCaptions = client.captionHistory
      .map((h) => h.caption)
      .join("\n---\n");

    // Build the prompt for Claude
    const prompt = buildCaptionPrompt({
      clientName: client.name,
      clientDescription: client.description || "",
      platform,
      imageDescription: imageDescription || "",
      tone: tone || "professional",
      language: language || "English",
      includeHashtags: includeHashtags !== false,
      postType: postType || "image_first",
      previousCaptions,
    });

    // Generate caption using Claude
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const captionContent = message.content[0];
    if (captionContent.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const generatedCaption = captionContent.text;

    return NextResponse.json({
      caption: generatedCaption,
      promptUsed: prompt,
    });
  } catch (error) {
    console.error("Error generating caption:", error);
    return NextResponse.json(
      { error: "Failed to generate caption. Please check your API key." },
      { status: 500 }
    );
  }
}

interface CaptionPromptParams {
  clientName: string;
  clientDescription: string;
  platform: string;
  imageDescription: string;
  tone: string;
  language: string;
  includeHashtags: boolean;
  postType: string;
  previousCaptions: string;
}

function buildCaptionPrompt(params: CaptionPromptParams): string {
  const {
    clientName,
    clientDescription,
    platform,
    imageDescription,
    tone,
    language,
    includeHashtags,
    postType,
    previousCaptions,
  } = params;

  const platformGuidelines: Record<string, string> = {
    instagram: `
- Keep it engaging and visually descriptive
- Use emojis sparingly but effectively
- Optimal length: 125-150 characters for engagement
- Can include a call-to-action`,
    facebook: `
- Can be longer and more conversational
- Focus on storytelling and community engagement
- Include a clear call-to-action
- Optimal length: 40-80 characters for link posts, up to 250 for image posts`,
    linkedin: `
- Professional and industry-focused
- Add value through insights or thought leadership
- Use line breaks for readability
- Optimal length: 150-300 characters`,
  };

  let prompt = `You are a social media content expert. Generate a unique, engaging caption for ${platform}.

CLIENT INFORMATION:
- Name: ${clientName}
${clientDescription ? `- Description: ${clientDescription}` : ""}

PLATFORM GUIDELINES (${platform.toUpperCase()}):
${platformGuidelines[platform] || "Create engaging content appropriate for this platform."}

REQUIREMENTS:
- Tone: ${tone}
- Language: ${language}
- Post type: ${postType === "image_first" ? "Image-focused post (caption supports the visual)" : "Text-focused post (caption is primary)"}
${includeHashtags ? "- Include 3-5 relevant hashtags at the end" : "- Do not include hashtags"}
`;

  if (imageDescription) {
    prompt += `
IMAGE/DESIGN DESCRIPTION:
${imageDescription}
`;
  }

  if (previousCaptions) {
    prompt += `
IMPORTANT - AVOID REPETITION:
The following captions have been used before for this client. Create something DIFFERENT and FRESH that doesn't repeat similar phrases, themes, or structures:

${previousCaptions}
`;
  }

  prompt += `
Generate only the caption text, nothing else. Make it unique and tailored to this specific post.`;

  return prompt;
}
