"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ConfirmModal from "@/components/ConfirmModal";
import Button from "../Button";
import deletePost from "@/api/posts/deletePost";

type Props = {
  postId: string;
};

export default function PostActions({ postId }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.user?.apiToken || "";

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const mutation = useMutation({
    mutationFn: () => deletePost(postId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/");
    },
  });

  const handleDelete = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  if (!session?.user) return null;

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
        isLoading={mutation.isPending}
      />
    </>
  );
}
