import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

// POST create a new social account
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { clientId, platform, accountName, accountId, accessToken, profileUrl } = body;

    if (!clientId || !platform || !accountName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify client belongs to admin
    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client || client.adminId !== session.user.id) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const socialAccount = await prisma.socialAccount.create({
      data: {
        clientId,
        platform,
        accountName,
        accountId,
        accessToken,
        profileUrl,
        isConnected: !!accessToken,
      },
    });

    return NextResponse.json(socialAccount);
  } catch (error) {
    console.error("Error creating social account:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
