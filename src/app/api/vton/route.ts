
import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import axios from "axios";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import {writeFileSync} from "fs";
import { Buffer } from "buffer";

async function encodeImage(filePath: string): Promise<string> {
  const imageBuffer = await fs.readFile(filePath);
  return imageBuffer.toString("base64");
}

export async function POST(req: Request) {
  const body = await req.json();
  const { person, dress } = body;

  if (!person || !dress) {
    return NextResponse.json({ success: false, error: "person と dress は必須です" });
  }
  
  if (process.env.GOOGLE_AUTH_JSON) {
    writeFileSync("/tmp/auth.json", process.env.GOOGLE_AUTH_JSON);
    process.env.GOOGLE_APPLICATION_CREDENTIALS = "/tmp/auth.json";
  }

  try {
    const auth = new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/cloud-platform",
    });
    const projectId = await auth.getProjectId();
    const location = "us-central1";
    const modelId = "virtual-try-on-preview-08-04";

    const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${modelId}:predict`;

    const personImagePath = path.resolve(`./public/png/${person}.png`);
    const dressImagePath = path.resolve(`./public/png/${dress}.png`);

    const personBase64 = await encodeImage(personImagePath);
    const productBase64 = await encodeImage(dressImagePath);

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
    const outputDir = path.resolve("./public/results");
    await fs.mkdir(outputDir, { recursive: true });

    const savedPaths = [];

    for (let i = 0; i < result.predictions.length; i++) {
      const prediction = result.predictions[i];
      const imgData = Buffer.from(prediction.bytesBase64Encoded, "base64");
      const timestamp = `${person}_${dress}`;
      const filepath = path.join(outputDir, `vton_${timestamp}_${i}.png`);
      
      await sharp(imgData).toFile(filepath);
      
      const relativePath = `/results/vton_${timestamp}_${i}.png`;
      savedPaths.push(relativePath);
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
