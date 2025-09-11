export async function login(data: { email: string; password: string }) {
  const res = await fetch("http://localhost:3030/blog-api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.error("Login failed:", res);
    throw new Error("Error logging in");
  }
  return res.json();
}
