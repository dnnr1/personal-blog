"use client";

import { getPosts } from "@/server/posts/getPosts";
import formatDate from "@/util/formatDate";
import getExcerpt from "@/util/getExcerpt";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

  if (isPending) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <p className="text-smooth-black/70 dark:text-white/70">
          Loading posts...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <p className="text-red-600 dark:text-red-400">Could not load posts.</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center rounded-xl border border-dashed border-smooth-black/20 dark:border-white/20">
        <p className="text-lg text-smooth-black/75 dark:text-white/75">
          No content at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="columns-1 [column-gap:1.25rem] xl:columns-2">
      {posts.map((data) => (
        <div
          className="mb-5 inline-block w-full cursor-pointer break-inside-avoid rounded-xl border border-smooth-black/10 bg-background p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-smooth-orange/40 hover:shadow-md dark:border-white/10 dark:bg-dark-background"
          onClick={() => router.push(`/post/${data.id}`)}
          key={data.id}
        >
          {data.pictureUrl && (
            <Image
              src={data.pictureUrl}
              alt="Post image"
              className="mb-4 h-auto w-full rounded-lg border border-smooth-black/10 object-cover transition-transform duration-500 hover:scale-[1.01] dark:border-white/10"
              width={1920}
              height={1080}
              priority
            />
          )}
          <h2 className="mb-2 text-2xl font-bold font-serif leading-tight">
            {getExcerpt(data.title, 60)}
          </h2>
          <p className="text-smooth-black/80 dark:text-white/80">
            {getExcerpt(data.content, 300)}
          </p>
          <p className="pt-3 text-sm text-smooth-black/60 dark:text-white/60">
            {formatDate(data.created_at)} by{" "}
            <span className="text-smooth-orange">{data.author}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
