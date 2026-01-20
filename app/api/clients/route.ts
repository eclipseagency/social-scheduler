import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

// GET all clients for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clients = await prisma.client.findMany({
      where: { userId: session.user.id },
      include: {
        socialAccounts: {
          include: { platform: true },
        },
        _count: {
          select: { posts: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST create a new client
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      logoUrl,
      description,
      brandTone,
      industry,
      website,
      platforms,
    } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Client name is required" },
        { status: 400 }
      );
    }

    // Get the social platforms
    const socialPlatforms = await prisma.socialPlatform.findMany({
      where: { isActive: true },
    });

    // Create client with social accounts
    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        company,
        logoUrl,
        description,
        brandTone: brandTone || "PROFESSIONAL",
        industry,
        website,
        userId: session.user.id,
        socialAccounts: {
          create: socialPlatforms
            .filter((platform) => {
              const platformKey = platform.name.toLowerCase();
              return platforms ? platforms[platformKey] !== false : true;
            })
            .map((platform) => ({
              accountName: `${name} ${platform.name}`,
              username: `@${name.toLowerCase().replace(/\s+/g, "")}`,
              platformId: platform.id,
              isConnected: false, // Default to not connected until OAuth
            })),
        },
      },
      include: {
        socialAccounts: {
          include: { platform: true },
        },
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
