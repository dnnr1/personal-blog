"use client";
import { useRouter, useParams } from "next/navigation";
import { usePost, useUpdatePost, useUploadImages } from "@/hooks";
import PostForm from "@/components/PostForm";
import { PostFormData } from "@/lib/validations";
import type { PendingImage } from "@/components/MDEditor/MDEditor";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams<{ postId: string }>();
  const { data: post, isLoading: isLoadingPost } = usePost(params.postId);
  const updatePost = useUpdatePost();
  const uploadImages = useUploadImages();

  const isLoading = updatePost.isPending || uploadImages.isPending;

  async function handleSubmit(data: PostFormData, coverFile?: File, pendingImages?: PendingImage[]) {
    let content = data.content;
    let pictureUrl = post?.pictureUrl;

    if (coverFile) {
      const urls = await uploadImages.mutateAsync([coverFile]);
      if (urls[0]) pictureUrl = urls[0];
    }

    if (pendingImages?.length) {
      const files = pendingImages.map((img) => img.file);
      const urls = await uploadImages.mutateAsync(files);

      pendingImages.forEach((img, i) => {
        if (urls[i]) {
          content = content.replace(img.blobUrl, urls[i]);
        }
      });
    }

    await updatePost.mutateAsync({
      id: params.postId,
      data: { title: data.title, content, pictureUrl },
    });

    router.push(`/post/${params.postId}`);
  }

  if (isLoadingPost) return <p className="text-center py-8">Loading...</p>;
  if (!post) return <p className="text-center py-8">Post not found</p>;

  return (
    <div className="max-w-4xl mx-auto pt-8">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm
        defaultValues={{
          title: post.title,
          content: post.content,
          pictureUrl: post.pictureUrl || "",
        }}
        defaultCoverUrl={post.pictureUrl}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Save Changes"
      />
      {(updatePost.isError || uploadImages.isError) && (
        <p className="text-red-500 mt-4">Error updating post</p>
      )}
    </div>
  );
}
