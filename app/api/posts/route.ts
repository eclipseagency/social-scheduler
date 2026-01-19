import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

// GET posts
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");
    const platform = searchParams.get("platform");
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};

    if (session.user.role === "admin") {
      // Admin can see all posts for their clients
      if (clientId) {
        where.clientId = clientId;
      } else {
        const clients = await prisma.client.findMany({
          where: { adminId: session.user.id },
          select: { id: true },
        });
        where.clientId = { in: clients.map((c) => c.id) };
      }
    } else {
      // Client can only see their posts
      const client = await prisma.client.findUnique({
        where: { userId: session.user.id },
      });
      if (!client) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      where.clientId = client.id;
    }

    if (platform) {
      where.socialAccount = { platform };
    }

    if (status) {
      where.status = status;
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        client: true,
        socialAccount: true,
      },
      orderBy: { scheduledAt: "asc" },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST create a new post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      clientId,
      socialAccountId,
      title,
      caption,
      imageUrl,
      mediaType,
      postType,
      scheduledAt,
      aiGenerated,
      aiPromptUsed,
    } = body;

    if (!clientId || !socialAccountId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify client and social account belong to admin
    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client || client.adminId !== session.user.id) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const socialAccount = await prisma.socialAccount.findUnique({
      where: { id: socialAccountId },
    });

    if (!socialAccount || socialAccount.clientId !== clientId) {
      return NextResponse.json(
        { error: "Social account not found" },
        { status: 404 }
      );
    }

    const post = await prisma.post.create({
      data: {
        clientId,
        socialAccountId,
        title,
        caption,
        imageUrl,
        mediaType: mediaType || "image",
        postType: postType || "image_first",
        status: scheduledAt ? "scheduled" : "draft",
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        aiGenerated: aiGenerated || false,
        aiPromptUsed,
      },
      include: {
        client: true,
        socialAccount: true,
      },
    });

    // Save caption to history if AI generated
    if (caption && aiGenerated) {
      await prisma.captionHistory.create({
        data: {
          clientId,
          caption,
          keywords: extractKeywords(caption),
        },
      });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to extract keywords from caption
function extractKeywords(caption: string): string {
  const words = caption.toLowerCase().split(/\s+/);
  const stopWords = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "do", "does", "did", "will", "would", "could",
    "should", "may", "might", "must", "shall", "can", "this", "that",
    "these", "those", "i", "you", "he", "she", "it", "we", "they",
  ]);

  const keywords = words
    .filter((word) => word.length > 3 && !stopWords.has(word))
    .slice(0, 10);

  return keywords.join(",");
}
