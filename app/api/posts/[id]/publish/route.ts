import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

// POST - Publish a post to social media platforms (mock implementation)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { scheduleId } = body; // Optional: publish specific schedule

    // Get the post with schedules
    const post = await prisma.post.findFirst({
      where: {
        id,
        client: { userId: session.user.id },
      },
      include: {
        platformSchedules: {
          include: {
            platform: true,
            socialAccount: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Get schedules to publish
    const schedulesToPublish = scheduleId
      ? post.platformSchedules.filter((s) => s.id === scheduleId)
      : post.platformSchedules.filter((s) => s.status === "SCHEDULED");

    if (schedulesToPublish.length === 0) {
      return NextResponse.json(
        { error: "No scheduled posts to publish" },
        { status: 400 }
      );
    }

    const results = [];

    // Mock publishing to each platform
    for (const schedule of schedulesToPublish) {
      const result = await mockPublishToplatform(
        schedule.platform.name,
        schedule.socialAccount.accessToken,
        post.caption || "",
        post.hashtags || ""
      );

      // Update schedule status
      await prisma.platformSchedule.update({
        where: { id: schedule.id },
        data: {
          status: result.success ? "POSTED" : "FAILED",
          publishedAt: result.success ? new Date() : null,
          platformPostId: result.postId || null,
          errorMessage: result.error || null,
        },
      });

      results.push({
        platform: schedule.platform.name,
        success: result.success,
        postId: result.postId,
        error: result.error,
      });
    }

    // Update main post status based on all schedules
    const allSchedules = await prisma.platformSchedule.findMany({
      where: { postId: id },
    });

    const allPosted = allSchedules.every((s) => s.status === "POSTED");
    const anyFailed = allSchedules.some((s) => s.status === "FAILED");
    const anyScheduled = allSchedules.some((s) => s.status === "SCHEDULED");

    let newStatus = post.status;
    if (allPosted) {
      newStatus = "POSTED";
    } else if (anyFailed && !anyScheduled) {
      newStatus = "FAILED";
    }

    if (newStatus !== post.status) {
      await prisma.post.update({
        where: { id },
        data: { status: newStatus },
      });
    }

    return NextResponse.json({
      success: true,
      results,
      postStatus: newStatus,
    });
  } catch (error) {
    console.error("Error publishing post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Mock function to simulate publishing to social platforms
// TODO: Replace with actual API integrations
async function mockPublishToplatform(
  platform: string,
  accessToken: string | null,
  caption: string,
  hashtags: string
): Promise<{ success: boolean; postId?: string; error?: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500));

  // Simulate occasional failures for demo purposes (10% failure rate)
  const shouldFail = Math.random() < 0.1;

  if (shouldFail) {
    const errors: Record<string, string> = {
      Instagram: "Instagram API rate limit exceeded. Please try again later.",
      Facebook: "Facebook page token has expired. Please reconnect your account.",
      LinkedIn: "LinkedIn post failed due to content policy violation.",
    };
    return {
      success: false,
      error: errors[platform] || "Unknown error occurred",
    };
  }

  // Check if account is connected (has access token)
  if (!accessToken) {
    return {
      success: false,
      error: `${platform} account is not connected. Please authenticate.`,
    };
  }

  // Generate mock post ID
  const postId = `${platform.toLowerCase()}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  // Log the mock publish action
  console.log(`[MOCK] Published to ${platform}:`, {
    postId,
    caption: caption.slice(0, 50) + "...",
    hashtags,
  });

  return {
    success: true,
    postId,
  };
}
