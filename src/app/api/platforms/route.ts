import { NextRequest, NextResponse } from "next/server";

// Mock connected platforms data
const connectedPlatforms = [
  { id: "1", platform: "twitter", username: "@socialscheduler", connected: true, connectedAt: "2026-01-01T00:00:00Z" },
  { id: "2", platform: "linkedin", username: "Social Scheduler", connected: true, connectedAt: "2026-01-02T00:00:00Z" },
  { id: "3", platform: "instagram", username: "@social.scheduler", connected: true, connectedAt: "2026-01-03T00:00:00Z" },
  { id: "4", platform: "facebook", username: "Social Scheduler", connected: true, connectedAt: "2026-01-04T00:00:00Z" },
];

const supportedPlatforms = [
  { id: "twitter", name: "Twitter/X", icon: "twitter" },
  { id: "linkedin", name: "LinkedIn", icon: "linkedin" },
  { id: "instagram", name: "Instagram", icon: "instagram" },
  { id: "facebook", name: "Facebook", icon: "facebook" },
  { id: "tiktok", name: "TikTok", icon: "tiktok" },
  { id: "pinterest", name: "Pinterest", icon: "pinterest" },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (type === "supported") {
    return NextResponse.json({
      success: true,
      data: supportedPlatforms,
    });
  }

  return NextResponse.json({
    success: true,
    data: connectedPlatforms,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, authCode } = body;

    if (!platform || !authCode) {
      return NextResponse.json(
        { success: false, error: "Platform and authCode are required" },
        { status: 400 }
      );
    }

    const supportedPlatform = supportedPlatforms.find((p) => p.id === platform);
    if (!supportedPlatform) {
      return NextResponse.json(
        { success: false, error: "Unsupported platform" },
        { status: 400 }
      );
    }

    // In a real app, exchange authCode for access token
    const newConnection = {
      id: String(connectedPlatforms.length + 1),
      platform,
      username: `@user_${platform}`,
      connected: true,
      connectedAt: new Date().toISOString(),
    };

    connectedPlatforms.push(newConnection);

    return NextResponse.json({
      success: true,
      data: newConnection,
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platformId = searchParams.get("id");

    if (!platformId) {
      return NextResponse.json(
        { success: false, error: "Platform ID is required" },
        { status: 400 }
      );
    }

    const index = connectedPlatforms.findIndex((p) => p.id === platformId);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Platform not found" },
        { status: 404 }
      );
    }

    connectedPlatforms.splice(index, 1);

    return NextResponse.json({
      success: true,
      message: "Platform disconnected successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to disconnect platform" },
      { status: 500 }
    );
  }
}
