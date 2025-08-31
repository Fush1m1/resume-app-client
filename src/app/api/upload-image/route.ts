import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageData } = body;

    if (!imageData) {
      return NextResponse.json({ success: false, error: "Image data is missing." }, { status: 400 });
    }

    // Extract base64 data from Data URL
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const uploadDir = path.resolve(process.cwd(), "public", "png");
    const filePath = path.join(uploadDir, "uploaded-person.png");

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ success: true, filePath: "/png/uploaded-person.png" });
  } catch (error: any) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
