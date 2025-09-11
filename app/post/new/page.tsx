"use client";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

export default function Page() {
  const [value, setValue] = useState("**Hello world!!!**");
  return (
    <div className="flex flex-col items-center justify-center pt-14">
      <div className="container">
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
        <MDEditor value={value} onChange={(val) => setValue(val || "")} />
        <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
      </div>
    </div>
  );
}
