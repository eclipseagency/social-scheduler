import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

// PUT update social account
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { accountName, accountId, accessToken, refreshToken, profileUrl, isConnected } = body;

    const socialAccount = await prisma.socialAccount.findUnique({
      where: { id },
      include: { client: true },
    });

    if (!socialAccount || socialAccount.client.adminId !== session.user.id) {
      return NextResponse.json({ error: "Social account not found" }, { status: 404 });
    }

    const updated = await prisma.socialAccount.update({
      where: { id },
      data: {
        accountName,
        accountId,
        accessToken,
        refreshToken,
        profileUrl,
        isConnected,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating social account:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE social account
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const socialAccount = await prisma.socialAccount.findUnique({
      where: { id },
      include: { client: true },
    });

    if (!socialAccount || socialAccount.client.adminId !== session.user.id) {
      return NextResponse.json({ error: "Social account not found" }, { status: 404 });
    }

    await prisma.socialAccount.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting social account:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
