import { Post } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function deletePost(id: string): Promise<Post> {
  const response = await fetch(`${baseURL}/posts/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to delete post");
  }
  const data = await response.json();
  return data;
}

export default deletePost;
