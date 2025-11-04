import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/posts";

export async function fetchPost(postId: string): Promise<Post> {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseURL}/posts/${postId}`, {
    cache: "no-store",
  });
  const body = await res.json();
  if (!res.ok || body.ok === false) {
    throw new Error(body.message || "Error fetching post");
  }
  return body.data;
}

export function usePost(postId: string) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
    enabled: !!postId,
  });
}
