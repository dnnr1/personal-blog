import { PostsResponse } from "@/types/posts";

const baseURL = process.env.API_BASE_URL || "";

export async function fetchPosts(): Promise<PostsResponse["data"]> {
  const res = await fetch(`${baseURL}/posts`);
  const body = await res.json();
  if (!res.ok || body.ok === false) {
    throw new Error(body.message || "Error fetching posts");
  }
  return body.data;
}
