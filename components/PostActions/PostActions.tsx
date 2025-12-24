"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDeletePost } from "@/hooks";
import ConfirmModal from "@/components/ConfirmModal";
import Button from "../Button";

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
        <Button
          text="Edit"
          onClick={() => router.push(`/post/${postId}/edit`)}
        />
        <Button text="Delete" onClick={() => setShowDeleteModal(true)} />
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
