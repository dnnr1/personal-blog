"use client";
import ReactMDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useUploadImage } from "@/hooks/useUpload";

type Props = {
  value: string;
  onChange?: (val: string) => void;
};

export default function MDEditor({ value, onChange }: Props) {
  const [editorValue, setValue] = useState(value);
  const [file, setFile] = useState<File | null>(null);
  const { data: session } = useSession();
  const uploadMutation = useUploadImage();

  function handleChange(val: string | undefined) {
    if (val === undefined) return;
    setValue(val);
    onChange?.(val);
  }

  function onDrop(e: React.DragEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    const objectURL = URL.createObjectURL(droppedFile);
    setFile(droppedFile);
    setValue((prev) => `${prev}\n\n![alt text](${objectURL})`);
  }

  async function handleUpload() {
    if (!file || !session?.user?.apiToken) {
      console.error("No file or no authentication token");
      return;
    }

    try {
      const result = await uploadMutation.mutateAsync({
        file,
        token: session.user.apiToken as string,
      });

      if (result?.data?.fileUrl) {
        setValue((prev) => `${prev}\n\n![alt text](${result.data.fileUrl})`);
        setFile(null);
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  }

  return (
    <div>
      <ReactMDEditor
        value={editorValue}
        onChange={handleChange}
        textareaProps={{
          onDrop: (e) => onDrop(e),
        }}
      />
      {file && (
        <button
          onClick={handleUpload}
          disabled={uploadMutation.isPending}
          className="mt-2 border-1 p-[0.5rem] text-xs rounded cursor-pointer disabled:opacity-50"
        >
          {uploadMutation.isPending ? "Uploading..." : "Upload Image"}
        </button>
      )}
    </div>
  );
}
