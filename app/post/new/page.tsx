"use client";
import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import { PostFormData } from "@/lib/validations";
import type { PendingImage } from "@/components/MDEditor/MDEditor";
import { useMutation } from "@tanstack/react-query";
import createPost from "@/api/posts/createPost";
import { PostInput } from "@/types";
import { uploadFiles } from "@/api/upload/uploadImages";

export default function NewPostPage() {
  const router = useRouter();

  const createPostMutation = useMutation({
    mutationFn: (data: PostInput) => createPost(data),
  });

  const uploadImagesMutation = useMutation({
    mutationFn: (data: File[]) => uploadFiles(data),
  });

  const isLoading =
    createPostMutation.isPending || uploadImagesMutation.isPending;

  async function handleSubmit(
    data: PostFormData,
    coverFile?: File,
    pendingImages?: PendingImage[]
  ) {
    let content = data.content;

    let pictureUrl: string | undefined;

    if (coverFile) {
      const urls = await uploadImagesMutation.mutateAsync([coverFile]);
      if (urls[0]) {
        pictureUrl = urls[0];
      }
    }

    if (pendingImages?.length) {
      const files = pendingImages.map((img) => img.file);
      const urls = await uploadImagesMutation.mutateAsync(files);

      pendingImages.forEach((img, i) => {
        if (urls[i]) {
          content = content.replace(img.blobUrl, urls[i]);
        }
      });
    }

    const post = await createPostMutation.mutateAsync({
      title: data.title,
      content,
      pictureUrl,
    });

    router.push("/post/" + post.id);
  }

  return (
    <div className="max-w-4xl mx-auto pt-8">
      <h1 className="text-3xl font-bold mb-6">New Post</h1>
      <PostForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Create Post"
      />
      {(createPostMutation.isError || uploadImagesMutation.isError) && (
        <p className="text-red-500 mt-4">Error creating post</p>
      )}
    </div>
  );
}
