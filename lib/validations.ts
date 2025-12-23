import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  content: z.string().min(10, "Content must be at least 10 characters"),
  pictureUrl: z.string().url().optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type PostFormData = z.infer<typeof postSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
