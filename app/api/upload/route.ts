import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string | null; // "logo" or "post"
    const clientId = formData.get("clientId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!clientId) {
      return NextResponse.json({ error: "Client ID is required" }, { status: 400 });
    }

    // Verify client belongs to user
    const client = await prisma.client.findFirst({
      where: { id: clientId, userId: session.user.id },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "video/mp4"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP, MP4" },
        { status: 400 }
      );
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 50MB" },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), "public", "uploads", type || "general");
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const fileExtension = file.name.split(".").pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const filePath = join(uploadDir, uniqueFileName);
    const fileUrl = `/uploads/${type || "general"}/${uniqueFileName}`;

    // Write file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Save to database
    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        client: { connect: { id: clientId } },
        fileName: uniqueFileName,
        originalName: file.name,
        filePath: filePath,
        fileUrl: fileUrl,
        fileType: file.type.startsWith("video/") ? "video" : "image",
        fileSize: file.size,
        mimeType: file.type,
      },
    });

    return NextResponse.json({
      id: mediaAsset.id,
      url: mediaAsset.fileUrl,
      fileName: mediaAsset.originalName,
      fileType: mediaAsset.fileType,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
