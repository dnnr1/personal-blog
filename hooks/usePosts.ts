import { useQuery } from "@tanstack/react-query";
import { PostsResponse } from "@/types/posts";

export async function fetchPosts(): Promise<PostsResponse["data"]> {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseURL}/posts`, {
    cache: "no-store",
  });
  const body = await res.json();
  if (!res.ok || body.ok === false) {
    throw new Error(body.message || "Error fetching posts");
  }
  return body.data;
}

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
}
