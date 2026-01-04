const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function uploadFiles(
  files: File[],
  token: string
): Promise<string[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("image", file));
  const res = await fetch(`${baseURL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok || data.ok === false) {
    throw new Error(data.message || "Upload failed");
  }
  return data.data.fileUrls;
}
