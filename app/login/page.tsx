"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Invalid credentials");
      } else {
        const session = await getSession();
        if (session) {
          router.push("/");
          router.refresh();
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Internal server error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="flex flex-col max-w-sm mx-auto mt-10"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        name="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 p-2 border border-smooth-black dark:border-gray-300 rounded"
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 p-2 border border-smooth-black dark:border-gray-300 rounded"
        placeholder="Password"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="p-2 bg-smooth-orange text-white rounded mb-2 cursor-pointer disabled:opacity-50"
      >
        {isLoading ? "Signing in..." : "Login"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
