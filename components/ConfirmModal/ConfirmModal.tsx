"use client";
import { useEffect, useRef } from "react";
import Button from "../Button";

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  isLoading,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto backdrop:bg-black/50 rounded-lg p-0 border-0"
      onClose={onCancel}
    >
      <div className="bg-background dark:bg-dark-background p-6 rounded-lg min-w-[300px]">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <Button text="Cancel" disabled={isLoading} onClick={onCancel} />
          <Button
            text={isLoading ? "Deleting..." : confirmLabel}
            disabled={isLoading}
            onClick={onConfirm}
          />
        </div>
      </div>
    </dialog>
  );
}
