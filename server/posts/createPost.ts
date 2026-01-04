import { PostInput } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function createPost(body: PostInput, token: string) {
  const response = await fetch(`${baseURL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  const data = await response.json();
  return data.data;
}

export default createPost;
