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
    const status = searchParams.get("status");

    // Build where clause
    const where: Record<string, unknown> = {
      client: { userId: session.user.id },
    };

    if (clientId) {
      where.clientId = clientId;
    }

    if (status) {
      where.status = status;
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        client: true,
        createdBy: {
          select: { id: true, name: true, email: true },
        },
        platformSchedules: {
          include: {
            platform: true,
            socialAccount: true,
          },
        },
        mediaAssets: {
          include: { mediaAsset: true },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
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

// POST create a new post with platform-specific scheduling
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      clientId,
      title,
      caption,
      hashtags,
      mediaType,
      aiGenerated,
      aiPromptUsed,
      platformSchedules, // Array of { platformId, socialAccountId, scheduledAt }
      mediaAssetIds,     // Array of media asset IDs
    } = body;

    if (!clientId) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    // Verify client belongs to user
    const client = await prisma.client.findFirst({
      where: { id: clientId, userId: session.user.id },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Determine post status based on schedules
    let postStatus = "DRAFT";
    if (platformSchedules && platformSchedules.length > 0) {
      postStatus = "SCHEDULED";
    }

    // Create post with platform schedules
    const post = await prisma.post.create({
      data: {
        clientId,
        createdById: session.user.id,
        title,
        caption,
        hashtags,
        mediaType: mediaType || "IMAGE",
        status: postStatus,
        aiGenerated: aiGenerated || false,
        aiPromptUsed,
        platformSchedules: platformSchedules
          ? {
              create: platformSchedules.map((schedule: {
                platformId: string;
                socialAccountId: string;
                scheduledAt: string;
              }) => ({
                platformId: schedule.platformId,
                socialAccountId: schedule.socialAccountId,
                scheduledAt: new Date(schedule.scheduledAt),
                status: "SCHEDULED",
              })),
            }
          : undefined,
        mediaAssets: mediaAssetIds
          ? {
              create: mediaAssetIds.map((id: string, index: number) => ({
                mediaAssetId: id,
                order: index,
              })),
            }
          : undefined,
      },
      include: {
        client: true,
        platformSchedules: {
          include: {
            platform: true,
            socialAccount: true,
          },
        },
        mediaAssets: {
          include: { mediaAsset: true },
        },
      },
    });

    // Save caption to history if AI generated
    if (caption && aiGenerated) {
      await prisma.captionHistory.create({
        data: {
          clientId,
          caption,
          hashtags,
          platform: platformSchedules?.[0]?.platformId || "general",
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
