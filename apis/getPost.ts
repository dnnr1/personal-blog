import { Post } from "@/types/posts";

export const fetchPost = async (postId: string): Promise<Post> => {
  const res = await fetch(`http://localhost:3030/blog-api/posts/${postId}`);
  const body = await res.json();
  if (!res.ok || body.ok === false) {
    throw new Error(body.message || "Error fetching post");
  }
  return body.data;
};
