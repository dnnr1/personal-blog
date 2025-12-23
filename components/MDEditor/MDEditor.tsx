"use client";
import ReactMDEditor from "@uiw/react-md-editor";
import { useCallback, useImperativeHandle, forwardRef, useRef } from "react";

export type PendingImage = {
  blobUrl: string;
  file: File;
};

export type MDEditorRef = {
  getPendingImages: () => PendingImage[];
};

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const MDEditor = forwardRef<MDEditorRef, Props>(({ value, onChange }, ref) => {
  const pendingImagesRef = useRef<PendingImage[]>([]);

  useImperativeHandle(ref, () => ({
    getPendingImages: () => pendingImagesRef.current,
  }));

  const addImage = useCallback(
    (file: File) => {
      const blobUrl = URL.createObjectURL(file);
      pendingImagesRef.current.push({ blobUrl, file });
      onChange(`${value}\n\n![image](${blobUrl})`);
    },
    [onChange, value]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) {
        addImage(file);
      }
    },
    [addImage]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      const items = e.clipboardData.items;
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            addImage(file);
            return;
          }
        }
      }
    },
    [addImage]
  );

  return (
    <div onDrop={handleDrop} onPaste={handlePaste} onDragOver={(e) => e.preventDefault()}>
      <ReactMDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={400}
      />
    </div>
  );
});

MDEditor.displayName = "MDEditor";

export default MDEditor;
