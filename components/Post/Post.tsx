"use client";
import { getPost } from "@/server/posts/getPost";
import { useQuery } from "@tanstack/react-query";
import Dot from "@/components/Dot";
import MDPreview from "@/components/MDPreview";
import PostActions from "@/components/PostActions";
import formatDate from "@/util/formatDate";
import Image from "next/image";

type Props = {
  id: string;
};

function Post({ id }: Props) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  if (isPending) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-smooth-black/70 dark:text-white/70">
          Loading post...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-red-600 dark:text-red-400">
          Could not load this post.
        </p>
      </div>
    );
  }

  return (
    <article className="mx-auto w-full max-w-5xl pb-10">
      <header className="mb-6 border-b border-smooth-black/10 pb-6 dark:border-white/10">
        <p className="mb-2 text-sm font-medium tracking-wide text-smooth-orange uppercase">
          Post
        </p>
        <h1 className="pb-5 text-3xl font-bold leading-tight sm:text-4xl">
          {data.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <div className="mr-3 h-12 w-12 overflow-hidden rounded-full border border-smooth-black/10 bg-black dark:border-white/10">
              <Image src="/avatar.png" alt="avatar" height={48} width={48} />
            </div>
            <div>
              <p className="text-smooth-orange">{data.author}</p>
              <p className="text-sm text-smooth-black/60 dark:text-white/60">
                {formatDate(data.created_at)}
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center">
            <PostActions postId={id} />
          </div>
        </div>
      </header>

      <div className="mb-6 flex items-center justify-center gap-2">
        <Dot />
        <Dot />
        <Dot />
      </div>

      <div className="rounded-xl border border-smooth-black/10 bg-background p-4 sm:p-6 dark:border-white/10 dark:bg-dark-background">
        {data.pictureUrl && (
          <Image
            src={data.pictureUrl}
            alt="Post image"
            className="mb-8 w-full rounded-lg border border-smooth-black/10 object-cover dark:border-white/10"
            width={1920}
            height={1080}
            priority
          />
        )}
        <div className="max-w-none">
          <MDPreview value={data.content} />
        </div>
      </div>
    </article>
  );
}

export default Post;
