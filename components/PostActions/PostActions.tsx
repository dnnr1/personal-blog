"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDeletePost } from "@/hooks";
import ConfirmModal from "@/components/ConfirmModal";

type Props = {
  postId: string;
};

export default function PostActions({ postId }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deletePost = useDeletePost();

  if (!session?.user) return null;

  async function handleDelete() {
    await deletePost.mutateAsync(postId);
    router.push("/");
  }

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => router.push(`/post/${postId}/edit`)}
          className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Edit
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          Delete
        </button>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        isLoading={deletePost.isPending}
      />
    </>
  );
}
