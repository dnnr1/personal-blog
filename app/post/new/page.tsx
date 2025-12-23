"use client";
import { useRouter } from "next/navigation";
import { useCreatePost, useUpdatePost, useUploadImages } from "@/hooks";
import PostForm from "@/components/PostForm";
import { PostFormData } from "@/lib/validations";
import type { PendingImage } from "@/components/MDEditor/MDEditor";

export default function NewPostPage() {
  const router = useRouter();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const uploadImages = useUploadImages();

  const isLoading = createPost.isPending || updatePost.isPending || uploadImages.isPending;

  async function handleSubmit(data: PostFormData, coverFile?: File, pendingImages?: PendingImage[]) {
    let content = data.content;

    const post = await createPost.mutateAsync({
      title: data.title,
      content,
    });

    if (!post?.id) return;

    let pictureUrl: string | undefined;
    let needsUpdate = false;

    if (coverFile) {
      const urls = await uploadImages.mutateAsync([coverFile]);
      if (urls[0]) {
        pictureUrl = urls[0];
        needsUpdate = true;
      }
    }

    if (pendingImages?.length) {
      const files = pendingImages.map((img) => img.file);
      const urls = await uploadImages.mutateAsync(files);

      pendingImages.forEach((img, i) => {
        if (urls[i]) {
          content = content.replace(img.blobUrl, urls[i]);
        }
      });
      needsUpdate = true;
    }

    if (needsUpdate) {
      await updatePost.mutateAsync({
        id: post.id,
        data: { title: data.title, content, pictureUrl },
      });
    }

    router.push("/");
  }

  return (
    <div className="max-w-4xl mx-auto pt-8">
      <h1 className="text-3xl font-bold mb-6">New Post</h1>
      <PostForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Create Post"
      />
      {(createPost.isError || updatePost.isError || uploadImages.isError) && (
        <p className="text-red-500 mt-4">Error creating post</p>
      )}
    </div>
  );
}
