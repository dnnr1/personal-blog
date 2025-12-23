import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Post } from "@/types";

export const postKeys = {
  all: ["posts"] as const,
  detail: (id: string) => ["posts", id] as const,
};

export const fetchPosts = () => api.get<Post[]>("/posts");
export const fetchPost = (id: string) => api.get<Post>(`/posts/${id}`);

export function usePosts() {
  return useQuery({
    queryKey: postKeys.all,
    queryFn: fetchPosts,
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });
}
