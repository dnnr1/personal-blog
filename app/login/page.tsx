"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema, LoginFormData } from "@/lib/validations";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setError("");

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials");
      return;
    }

    const session = await getSession();
    if (session) {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <form
      className="flex flex-col max-w-sm mx-auto mt-10 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input
          {...register("email")}
          type="email"
          className="w-full p-3 border rounded dark:bg-dark-background dark:border-gray-600"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("password")}
          type="password"
          className="w-full p-3 border rounded dark:bg-dark-background dark:border-gray-600"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="p-3 bg-smooth-orange text-white rounded hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? "Signing in..." : "Login"}
      </button>

      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
}
