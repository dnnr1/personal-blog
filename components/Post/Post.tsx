"use client";
import type { Post } from "@/types/posts";
import formatDate from "@/util/formatDate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const cutText = (text: string, max: number) => {
  if (text.length > max) {
    return text.substring(0, max).trim() + "...";
  }
  return text;
};

type PostProps = {
  data: Post;
};

function Post({ data }: PostProps) {
  const router = useRouter();

  const goToPost = useCallback(() => {
    router.push(`/post/${data.id}`);
  }, [data.id, router]);

  return (
    <div className={`p-4 m-2 bg-background dark:bg-dark-background`}>
      {data.pictureUrl ? (
        <Image
          src={data.pictureUrl}
          alt="Random Image"
          className="mb-4 rounded cursor-pointer"
          width={1920}
          height={1080}
          onClick={goToPost}
        />
      ) : null}
      <h2
        className="text-2xl font-bold font-serif mb-6 cursor-pointer"
        onClick={goToPost}
      >
        {cutText(data.title, 30)}
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        {cutText(data.content, 130)}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
        {formatDate(data.created_at)} by {data.author}
      </p>
    </div>
  );
}

export default Post;
