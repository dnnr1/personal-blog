"use client";
import { useState } from "react";

import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@/components/MDEditor"), { ssr: false });

export default function Page() {
  const [value, setValue] = useState("**Hello World**");
  return (
    <div className="flex flex-col items-center justify-center pt-14">
      <div className="container">
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
        <MDEditor value={value} onChange={setValue} />
        <button className="border-1 mt-5 p-[0.5rem] text-xs rounded cursor-pointer">
          Create Post
        </button>
      </div>
    </div>
  );
}
