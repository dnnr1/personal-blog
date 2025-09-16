import { NextResponse } from "next/server";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";

const baseURL = process.env.API_BASE_URL || "";

export async function POST(req: Request) {
  try {
    const session = await getServerAuthSession();
    const token = session?.user?.apiToken as string | undefined;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await req.formData();
    const upstream = await fetch(`${baseURL}/upload`, {
      method: "POST",
      body: formData,
      headers: {
        cookie: `token=${token}`,
      },
    });
    const contentType =
      upstream.headers.get("content-type") || "application/json";
    const bodyText = await upstream.text();
    return new NextResponse(bodyText, {
      status: upstream.status,
      headers: {
        "content-type": contentType,
      },
    });
  } catch (err) {
    console.error("Upload proxy error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
