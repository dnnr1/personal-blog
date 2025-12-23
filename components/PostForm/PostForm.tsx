"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostFormData } from "@/lib/validations";
import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { MDEditorRef, PendingImage } from "@/components/MDEditor/MDEditor";

const MDEditor = dynamic(() => import("@/components/MDEditor"), { ssr: false });

export type PostFormRef = {
  getPendingImages: () => PendingImage[];
};

type Props = {
  defaultValues?: PostFormData;
  defaultCoverUrl?: string;
  onSubmit: (data: PostFormData, coverFile?: File, pendingImages?: PendingImage[]) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
};

const PostForm = forwardRef<PostFormRef, Props>(({
  defaultValues,
  defaultCoverUrl,
  onSubmit,
  isLoading,
  submitLabel = "Save",
}, ref) => {
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(defaultCoverUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mdEditorRef = useRef<MDEditorRef>(null);

  useImperativeHandle(ref, () => ({
    getPendingImages: () => mdEditorRef.current?.getPendingImages() || [],
  }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: defaultValues || { title: "", content: "", pictureUrl: "" },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  }

  function removeCover() {
    setCoverFile(null);
    setCoverPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleFormSubmit(data: PostFormData) {
    const pendingImages = mdEditorRef.current?.getPendingImages() || [];
    await onSubmit(data, coverFile || undefined, pendingImages);
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <input
          {...register("title")}
          placeholder="Post title"
          className="w-full p-3 border rounded dark:bg-dark-background dark:border-gray-600"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-2">Cover image</label>
        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {coverPreview ? "Change image" : "Select image"}
          </button>
          {coverPreview && (
            <button
              type="button"
              onClick={removeCover}
              className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Remove
            </button>
          )}
        </div>
        {coverPreview && (
          <div className="mt-3 relative w-full max-w-md aspect-video">
            <Image
              src={coverPreview}
              alt="Preview"
              fill
              className="object-cover rounded"
            />
          </div>
        )}
      </div>

      <input type="hidden" {...register("pictureUrl")} />

      <div>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <MDEditor ref={mdEditorRef} value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-2 bg-smooth-orange text-white rounded hover:opacity-90 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
});

PostForm.displayName = "PostForm";

export default PostForm;
