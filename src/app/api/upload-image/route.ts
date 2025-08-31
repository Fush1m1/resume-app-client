import { NextResponse } from "next/server";
import { put } from '@vercel/blob';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageData } = body;

    if (!imageData) {
      return NextResponse.json({ success: false, error: "Image data is missing." }, { status: 400 });
    }

    // Extract base64 data from Data URL
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const contentType = imageData.match(/^data:(image\/\w+);base64,/)?.[1] || 'image/png';
    const buffer = Buffer.from(base64Data, "base64");

    const filename = `uploaded-person-${Date.now()}.png`; // Unique filename
    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: contentType,
    });

    return NextResponse.json({ success: true, filePath: blob.url });
  } catch (err: unknown) {
    let message = "不明なエラーです";

    if (err instanceof Error) {
      message = err.message;
    }
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}