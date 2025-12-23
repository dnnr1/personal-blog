import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.apiToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      Cookie: `token=${session.user.apiToken}`,
    },
    body: formData,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
