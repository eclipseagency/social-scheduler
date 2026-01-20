import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      clientId,
      brandTone,
      platforms,
      title,
      imageDescription,
      language = "English",
    } = body;

    if (!clientId) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    // Get client info and caption history
    const client = await prisma.client.findFirst({
      where: { id: clientId, userId: session.user.id },
      include: {
        captionHistory: {
          orderBy: { usedAt: "desc" },
          take: 10,
        },
      },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Build previous captions context
    const previousCaptions = client.captionHistory
      .map((h) => h.caption)
      .slice(0, 5)
      .join("\n---\n");

    // Build the prompt
    const prompt = buildCaptionPrompt({
      clientName: client.name,
      clientDescription: client.description || "",
      brandTone: brandTone || client.brandTone,
      platforms: platforms || ["Instagram"],
      title: title || "",
      imageDescription: imageDescription || "",
      language,
      previousCaptions,
    });

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      // Return mock response for development
      return NextResponse.json({
        caption: generateMockCaption(client.brandTone, platforms?.[0] || "Instagram"),
        hashtags: generateMockHashtags(client.name),
        promptUsed: prompt,
      });
    }

    // Generate caption using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional social media content creator. Generate engaging, platform-appropriate captions. Always respond in JSON format with 'caption' and 'hashtags' fields.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
      response_format: { type: "json_object" },
    });

    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error("No content generated");
    }

    const parsed = JSON.parse(generatedContent);

    return NextResponse.json({
      caption: parsed.caption || "",
      hashtags: parsed.hashtags || "",
      promptUsed: prompt,
    });
  } catch (error) {
    console.error("Error generating caption:", error);

    // Return mock response on error
    return NextResponse.json({
      caption: "Discover what makes us unique! We're here to bring value to your everyday life. Follow along for more updates and inspiration.",
      hashtags: "#socialmedia #marketing #business #growth #inspiration",
      error: "Using fallback caption - API key may be missing or invalid",
    });
  }
}

interface CaptionPromptParams {
  clientName: string;
  clientDescription: string;
  brandTone: string;
  platforms: string[];
  title: string;
  imageDescription: string;
  language: string;
  previousCaptions: string;
}

function buildCaptionPrompt(params: CaptionPromptParams): string {
  const {
    clientName,
    clientDescription,
    brandTone,
    platforms,
    title,
    imageDescription,
    language,
    previousCaptions,
  } = params;

  const toneDescriptions: Record<string, string> = {
    PROFESSIONAL: "formal, expert, trustworthy, and authoritative",
    FRIENDLY: "warm, approachable, conversational, and welcoming",
    CASUAL: "relaxed, informal, easy-going, and authentic",
    FORMAL: "proper, official, respectful, and dignified",
    HUMOROUS: "witty, fun, playful, and entertaining",
    INSPIRATIONAL: "motivating, uplifting, empowering, and encouraging",
    SALES_DRIVEN: "persuasive, compelling, action-oriented, and benefit-focused",
    EDUCATIONAL: "informative, helpful, teaching, and value-adding",
  };

  const platformGuidelines: Record<string, string> = {
    Instagram: "Use engaging hooks, emojis sparingly, and keep under 2200 characters. Focus on visual storytelling.",
    Facebook: "Be conversational, include a call-to-action, and encourage engagement. Can be longer form.",
    LinkedIn: "Be professional and insightful. Add value through industry knowledge. Use line breaks for readability.",
  };

  const platformContext = platforms
    .map((p) => platformGuidelines[p] || "Create engaging content.")
    .join(" ");

  let prompt = `Generate a social media caption for ${clientName}.

CLIENT INFO:
- Brand Name: ${clientName}
${clientDescription ? `- About: ${clientDescription}` : ""}

TONE: ${toneDescriptions[brandTone] || brandTone}

PLATFORMS: ${platforms.join(", ")}
GUIDELINES: ${platformContext}

REQUIREMENTS:
- Language: ${language}
- Generate ONLY the caption and hashtags
- Include 4-6 relevant hashtags
${title ? `- Topic/Context: ${title}` : ""}
${imageDescription ? `- Image/Visual: ${imageDescription}` : ""}

`;

  if (previousCaptions) {
    prompt += `AVOID REPETITION - These captions were used before:
${previousCaptions}

Create something fresh and different!

`;
  }

  prompt += `Respond in JSON format: {"caption": "your caption here", "hashtags": "#tag1 #tag2 #tag3"}`;

  return prompt;
}

// Mock caption generator for development/demo
function generateMockCaption(brandTone: string, platform: string): string {
  const captions: Record<string, string[]> = {
    PROFESSIONAL: [
      "Excellence is not a destination but a continuous journey. Today we're proud to share our latest milestone.",
      "Innovation meets expertise. Discover how we're transforming the industry, one solution at a time.",
      "Building the future requires vision and dedication. Here's what we're working on.",
    ],
    FRIENDLY: [
      "Hey there! We've got something exciting to share with you today. Ready to dive in?",
      "What a wonderful day to connect with our amazing community! Here's what's happening.",
      "We couldn't wait to share this with you! Your support means everything to us.",
    ],
    CASUAL: [
      "Just dropped something cool. Check it out!",
      "No big deal, just doing what we love. Come along for the ride!",
      "Real talk: we're pretty excited about this one.",
    ],
    INSPIRATIONAL: [
      "Dream big. Work hard. Make it happen. This is what transformation looks like.",
      "Every great achievement starts with the decision to try. What will you start today?",
      "Your potential is limitless. Let's unlock it together.",
    ],
    SALES_DRIVEN: [
      "Limited time offer! Don't miss your chance to experience the difference.",
      "Transform your results today. See why thousands have already made the switch.",
      "Ready to level up? Here's exactly what you've been looking for.",
    ],
    EDUCATIONAL: [
      "Did you know? Here's an insight that could change your perspective.",
      "Let's break this down: understanding the fundamentals makes all the difference.",
      "Pro tip: small changes lead to big results. Here's how.",
    ],
  };

  const toneCaption = captions[brandTone] || captions.PROFESSIONAL;
  return toneCaption[Math.floor(Math.random() * toneCaption.length)];
}

function generateMockHashtags(clientName: string): string {
  const baseHashtags = ["#business", "#growth", "#success", "#motivation", "#innovation"];
  const brandHashtag = `#${clientName.toLowerCase().replace(/\s+/g, "")}`;
  return [brandHashtag, ...baseHashtags.slice(0, 4)].join(" ");
}
