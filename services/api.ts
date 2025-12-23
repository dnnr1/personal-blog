const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
};

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body } = options;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok || data.ok === false) {
    throw new Error(data.message || "API Error");
  }

  return data.data;
}

async function authRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body } = options;

  const res = await fetch(`/api${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok || data.ok === false) {
    throw new Error(data.message || data.error || "API Error");
  }

  return data.data;
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) => authRequest<T>(endpoint, { method: "POST", body }),
  put: <T>(endpoint: string, body: unknown) => authRequest<T>(endpoint, { method: "PUT", body }),
  delete: <T>(endpoint: string) => authRequest<T>(endpoint, { method: "DELETE" }),
};

export async function uploadFiles(files: File[]): Promise<string[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("image", file));

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || data.ok === false) {
    throw new Error(data.message || "Upload failed");
  }

  return data.data.fileUrls;
}
