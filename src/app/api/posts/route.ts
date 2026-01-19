import { NextRequest, NextResponse } from "next/server";

// Mock data for posts
const posts = [
  { id: "1", title: "New product launch announcement", content: "Excited to announce our new product!", platform: "twitter", status: "scheduled", scheduledAt: "2026-01-20T10:00:00Z", createdAt: "2026-01-18T08:00:00Z" },
  { id: "2", title: "Weekly tips and tricks", content: "Here are this week's tips...", platform: "linkedin", status: "draft", scheduledAt: null, createdAt: "2026-01-17T14:00:00Z" },
  { id: "3", title: "Behind the scenes content", content: "Take a look behind the scenes!", platform: "instagram", status: "published", scheduledAt: "2026-01-18T09:00:00Z", createdAt: "2026-01-16T12:00:00Z" },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform");
  const status = searchParams.get("status");

  let filteredPosts = [...posts];

  if (platform) {
    filteredPosts = filteredPosts.filter((post) => post.platform === platform);
  }

  if (status) {
    filteredPosts = filteredPosts.filter((post) => post.status === status);
  }

  return NextResponse.json({
    success: true,
    data: filteredPosts,
    total: filteredPosts.length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, platform, scheduledAt } = body;

    if (!title || !content || !platform) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: title, content, platform" },
        { status: 400 }
      );
    }

    const newPost = {
      id: String(posts.length + 1),
      title,
      content,
      platform,
      status: scheduledAt ? "scheduled" : "draft",
      scheduledAt: scheduledAt || null,
      createdAt: new Date().toISOString(),
    };

    posts.push(newPost);

    return NextResponse.json({
      success: true,
      data: newPost,
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
