import { PostInput } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function editPost(id: string, body: PostInput) {
  const response = await fetch(`${baseURL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  console.log(body, id);

  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to edit post");
  }
  const data = await response.json();
  return data.data;
}

export default editPost;
