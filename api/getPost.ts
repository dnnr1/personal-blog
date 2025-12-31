import { Post } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getPost(id: string): Promise<Post> {
  const response = await fetch(`${baseURL}/posts/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  const data = await response.json();
  return data.data;
}
