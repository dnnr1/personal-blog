import { Post } from "@/types/posts";

const baseURL = process.env.API_BASE_URL || "";

export async function fetchPost(postId: string): Promise<Post> {
  const res = await fetch(`${baseURL}/posts/${postId}`);
  const body = await res.json();
  if (!res.ok || body.ok === false) {
    throw new Error(body.message || "Error fetching post");
  }
  return body.data;
}
