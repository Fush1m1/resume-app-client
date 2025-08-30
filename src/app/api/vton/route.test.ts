import { describe, it, expect, vi } from "vitest";
import { POST } from "./route";

vi.mock("axios");
vi.mock("fs/promises");
vi.mock("sharp");

describe("POST /api/vton", () => {
  it("should return an error if person or dress is missing", async() => {
    const requestBody = { person: "person1" }; // dress is missing
    const req = new Request("http://localhost/api/vton", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    const response = await POST(req);
    const responseBody = await response.json();

    expect(response.status).toBe(200); // The status is 200 but the body contains the error
    expect(responseBody.success).toBe(false);
    expect(responseBody.error).toBe("person と dress は必須です");
  });

  // TODO(@Fush1m1): add test
});
