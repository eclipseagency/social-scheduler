import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

// GET all clients for the admin
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clients = await prisma.client.findMany({
      where: { adminId: session.user.id },
      include: {
        socialAccounts: true,
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

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, phone, company, logoUrl, description, createUserAccount, password } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Client name is required" },
        { status: 400 }
      );
    }

    let userId: string | undefined;

    // Create client user account if requested
    if (createUserAccount && email && password) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "A user with this email already exists" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const clientUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: "client",
        },
      });
      userId = clientUser.id;
    }

    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        company,
        logoUrl,
        description,
        adminId: session.user.id,
        userId,
      },
      include: {
        socialAccounts: true,
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
