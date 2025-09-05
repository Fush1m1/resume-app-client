import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import axios from "axios";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import { Buffer } from "buffer";
import crypto from "crypto";

// Helper function to create a hash for filenames
function createHash(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Helper function to sanitize filenames
function sanitizeFilename(filename: string): string {
  // If the filename is a data URL, create a hash
  if (filename.startsWith("data:image")) {
    return createHash(filename);
  }
  // Otherwise, sanitize as before
  return filename.replace(/[^a-zA-Z0-9-_.]/g, '_');
}

async function encodeImage(input: string): Promise<string> {
  let imageBuffer: Buffer;
  if (input.startsWith("data:image")) {
    // Handle data URL
    const base64Data = input.replace(/^data:image\/\w+;base64,/, "");
    imageBuffer = Buffer.from(base64Data, "base64");
  // } else if (input.startsWith("http://") || input.startsWith("https://")) {
  //   // Fetch image from URL
  //   const response = await axios.get(input, { responseType: 'arraybuffer' });
  //   imageBuffer = Buffer.from(response.data);
  } else {
    // Read image from local file path
    const filePath = path.resolve(`./public/png/${input}.png`);
    imageBuffer = await fs.readFile(filePath);
  }
  return imageBuffer.toString("base64");
}

export async function POST(req: Request) {
  const body = await req.json();
  const { person, dress } = body;

  if (!person || !dress) {
    return NextResponse.json({ success: false, error: "person と dress は必須です" });
  }

  try {
    const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, "\n");
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const projectId = process.env.PROJECT_ID;
    const auth = new GoogleAuth({
      credentials: {
        "private_key": privateKey,
        "client_email": clientEmail,
      },
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });
    const location = "us-central1";
    const modelId = "virtual-try-on-preview-08-04";

    const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${modelId}:predict`;

    const personBase64 = await encodeImage(person);
    const productBase64 = await encodeImage(dress);

    const requestBody = {
      instances: [
        {
          personImage: {
            image: { bytesBase64Encoded: personBase64 },
          },
          productImages: [
            {
              image: { bytesBase64Encoded: productBase64 },
            },
          ],
        },
      ],
      parameters: {
        sampleCount: 1,
        baseSteps: 32,
        addWatermark: false,
        personGeneration: "allow_all",
        safetySetting: "block_only_high",
        outputOptions: {
          mimeType: "image/png",
        },
        seed: 42,
      },
    };

    const response = await axios.post(endpoint, requestBody, {
      headers: {
        "Authorization": `Bearer ${(await auth.getAccessToken())}`
      }
    });

    if (response.status !== 200) {
      throw new Error(`APIエラー: ${response.status} - ${response.statusText}`);
    }

    const result = response.data;
    const outputDir = "/tmp/results";
    await fs.mkdir(outputDir, { recursive: true });

    const savedPaths = [];

    for (let i = 0; i < result.predictions.length; i++) {
      const prediction = result.predictions[i];
      const imgData = Buffer.from(prediction.bytesBase64Encoded, "base64");
      const sanitizedPerson = sanitizeFilename(person);
      const sanitizedDress = sanitizeFilename(dress);
      const filepath = path.join(outputDir, `vton_${sanitizedPerson}_${sanitizedDress}_${i}.png`);
      
      await sharp(imgData).toFile(filepath);
      
      const imageBuffer = await fs.readFile(filepath);
      const base64Image = imageBuffer.toString("base64");
      const dataUrl = `data:image/png;base64,${base64Image}`;
      savedPaths.push(dataUrl);
    }

    return NextResponse.json({ success: true, resultImage: savedPaths[0] });
  } catch (err: unknown) {
    let message = "不明なエラーです";

    if (err instanceof Error) {
      message = err.message;
    }

    return NextResponse.json({ success: false, error: message });
  }
}
