"use client";
import ReactMDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import MDPreview from "../MDPreview";

export default function MDEditor() {
  const [value, setValue] = useState("**Hello world!!!**");
  return (
    <>
      <ReactMDEditor
        value={value}
        onChange={(val) => setValue(val || "")}
        textareaProps={{
          onDrop: async (e) => {
            e.preventDefault();
            try {
              const file = e.dataTransfer.files[0];
              if (file) {
                const formData = new FormData();
                formData.append("image", file);
                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                  credentials: "same-origin",
                });
                if (!res.ok) {
                  console.error("Upload failed", res.status, await res.text());
                  return;
                }
                const data = await res.json();
                if (!data?.data.fileUrl) {
                  console.error("Upload response missing url", data);
                  return;
                }
                setValue(
                  (prev) => `${prev}\n\n![alt text](${data.data.fileUrl})`
                );
              }
            } catch (err) {
              console.error("Upload error:", err);
            }
          },
        }}
      />
    </>
  );
}
