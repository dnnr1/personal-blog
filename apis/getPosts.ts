import { PostsResponse } from "@/types/posts";

export async function fetchPosts(): Promise<PostsResponse["data"]> {
  const res = await fetch("http://localhost:3030/blog-api/posts");
  const body = await res.json();
  if (!res.ok || body.ok === false) {
    throw new Error(body.message || "Error fetching posts");
  }
  return body.data;
}
