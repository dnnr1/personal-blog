import { useMutation } from "@tanstack/react-query";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

type UploadResponse = {
  ok: boolean;
  data: {
    fileUrl: string;
  };
};

export async function uploadImage(
  file: File,
  token: string
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${baseURL}/upload`, {
    method: "POST",
    body: formData,
    credentials: "include",
    headers: {
      cookie: `token=${token}`,
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to upload image: ${errorText}`);
  }
  return await res.json();
}

export function useUploadImage() {
  return useMutation({
    mutationFn: ({ file, token }: { file: File; token: string }) =>
      uploadImage(file, token),
  });
}
