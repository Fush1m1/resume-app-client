
import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import axios from "axios";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
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

  try {
    const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, "\n") ?? '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDtwhSkGCvE2XhZ\n/RZPO7iHBmus9owsjxAGe+ZUwKFhu3XeDplOIobQxMPb2z2n6VgTfaqyiMfCPOjG\nopBc6MU3qZ2ECgzX7jrykid25fST7k40w2HVIUgfFJRuM0iT+rxsHTw5ieID/dbX\nxLlXrzMnXJ41t90cD5ISMcSeICdSRMqzppw3eaudBZCks81etijQkofd55kIkg/o\njxCbifq3NqUNkkfLgdu1hMf+uKf5JQaqvRtSJ5X3jT7WaMGQC2k28xiVAR70VvwK\nv5zwjJSvDaOT+/clM7lyoZIWt2/i587kEciADCy2CSRyPMcEvqKHNwe4Ty+kwKGJ\nRSEIeIQLAgMBAAECggEASmbUJ7+qnrjBGUQCYbwaFCL1uhQTLHR+etD19KqtNdTA\nX0NpRRK35ofUlK3ofu2eEsdeDe2QuV9vJo3DqFdtM+x/rsyoVUAnMTZ8ZBA097/4\nuDk2GciG9bbudgfVW/14TkrdyFG2KTKbszzMFTztwJESr1PAvSHAP7JUSXldZLgo\n3j4SRlI7l0qV5RhAEMjiCs6ygJ4/C8796Fyo2E+9VK4TRIE/A0weNtc1TI22HGrM\n7+tdzHYYbnJDQeOls6zfZVrbOgIJtIIrlKe8l1sQRGeVg7Nrh7IBaXwlZ+k75Iqe\n2jAHp2lHISpWEY9cY6chHxVTmUwmQbKBMOfHNCMpHQKBgQD5AK9yAMSAmODwlugi\nSl43CBF6syAYDtbuGV7kqxiIpyBmaJ4LZm51AJxugE2JSLfyjZkySez9kU8aCq6t\nLDL+8eylN7ahF/Jbc6Sc2q79WHvP/m05aluWcdGp1JqjvnHwrQ3Hg/hzntOZ1yBm\nTjKrFBChtv75glLY4qBu0e4iZQKBgQD0cICiyOXdJjS5uN/bX9OeRz5Viy+QLb1I\nWezubnKvkNV6r07nPN+0SWblkHsNSWoPQV4IbZhsHeJ//fOxLI8SkfCkeQfDWeOE\nszMtFYoDHqydf+nch4C2mqjpswQgwjwEw38ibSbbvj7xtRzwrND5MD//gKIPM/0X\njgWQ9EJtrwKBgH7lmYPY3kvHHYOe9GhdTAxxoS7N0MJR9bjb1x9kDpm9ymZGVJzs\ns8gO6qnp2xnmpFAJV5RoVk2XWx+jaAe66bZBpl9AuGL6qDlxAugpDlrwWBDU0ecb\ny9cs5DPPtItUSA7msooGOHz76UySdOGOYoYLMLqpXuHbR8teG3K+q8R9AoGBAPCi\nlDAswAVu6DbxZgbrlkNZ9WZ3SBKSxKUmSdYLiwGE/nPxgyanSb6NCCv0iP7yh+OO\nwUhgw82jueewlCeWKx7n5tOzhk3s/ssTMs0uSBh8KQg/9XSxPKgHJ0QxhF3PeRBj\neJPminuHFSYT2vKf3nWB527bLi7zSjPXD2m83GxnAoGAJ9zg50YdjvhvF1c9Lgsi\nINVQ7P8WEFGaiaWQ6hCIKahMUlzm4JlNs/Q/eSqr640SXhXyr4KSHqDB0faJM1EY\ni/ZsNA2SL9xeKHdfRzkTxt5zCFxjMtX8rl6lMy7IzoWdLU3nUvnoXjcgcyjZG0q0\n/3LFi+3z3fmgcTeP5RETDFk=\n-----END PRIVATE KEY-----\n';
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL ?? "tryontest@nomadic-freedom-353208.iam.gserviceaccount.com";
    const projectId = process.env.PROJECT_ID ?? "nomadic-freedom-353208";
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
