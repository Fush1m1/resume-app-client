import { describe, it, expect, vi } from "vitest";
import { POST } from "./route";
import axios from "axios";
import fs from "fs/promises";
import sharp from "sharp";
import { GoogleAuth } from "google-auth-library";

vi.mock("axios");
vi.mock("fs/promises");
vi.mock("sharp");
vi.mock("google-auth-library");

describe("POST /api/vton", () => {
  it("should return a success response when person and dress are provided", async() => {
    process.env.PRIVATE_KEY = "test_private_key";
    process.env.GOOGLE_CLIENT_EMAIL = "test_client_email";
    process.env.PROJECT_ID = "test_project_id";

    const mockAuth = {
      getAccessToken: vi.fn().mockResolvedValue("test_token"),
    };
    vi.mocked(GoogleAuth).mockReturnValue(mockAuth as unknown as GoogleAuth);

    vi.mocked(fs.readFile).mockResolvedValue(Buffer.from("test_image_data"));

    const mockAxiosResponse = {
      status: 200,
      data: {
        predictions: [
          { bytesBase64Encoded: Buffer.from("test_result_image").toString("base64") },
        ],
      },
    };
    vi.mocked(axios.post).mockResolvedValue(mockAxiosResponse);

    const mockSharpInstance = {
      toFile: vi.fn().mockResolvedValue(undefined),
    };
    vi.mocked(sharp).mockReturnValue(mockSharpInstance as unknown as sharp.Sharp);

    const requestBody = { person: "person1", dress: "dress1" };
    const req = new Request("http://localhost/api/vton", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    const response = await POST(req);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody.success).toBe(true);
    expect(responseBody.resultImage).toContain("data:image/png;base64,");
  });
});