import { Post } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${baseURL}/posts`, {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await response.json();
  return data.data;
}
