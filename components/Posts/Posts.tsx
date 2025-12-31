"use client";

import { getPosts } from "@/api/posts/getPosts";
import formatDate from "@/util/formatDate";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

function cutText(text: string, max: number) {
  return text.length > max ? `${text.substring(0, max).trim()}...` : text;
}

export default function Posts() {
  const router = useRouter();
  const {
    data: posts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  if (!posts || posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg">No content at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 max-xl:grid-cols-1">
      {posts.map((data) => (
        <div
          className="bg-background dark:bg-dark-background cursor-pointer"
          onClick={() => router.push(`/post/${data.id}`)}
          key={data.id}
        >
          {data.pictureUrl && (
            <Image
              src={data.pictureUrl}
              alt="Post image"
              className="mb-4 rounded border-2 grayscale hover:grayscale-0 hover:scale-101 transition-all duration-750"
              width={1920}
              height={1080}
              priority
            />
          )}
          <h2 className="text-2xl font-bold font-serif mb-3">
            {cutText(data.title, 30)}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {cutText(data.content, 130)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
            {formatDate(data.created_at)} by{" "}
            <span className="text-smooth-orange">{data.author}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
