import { getPosts } from "@/server/posts/getPosts";
import Hydrate from "@/components/Hydrate/Hydrate";
import Posts from "@/components/Posts";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <div className="w-full pb-8">
        <div className="mb-8 space-y-2 border-b border-smooth-black/10 pb-6 dark:border-white/10">
          <p className="text-sm font-medium tracking-wide text-smooth-orange uppercase">
            Blog
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">Latest Posts</h1>
          <p className="text-sm text-smooth-black/70 dark:text-white/70 sm:text-base">
            Thoughts and writings on software development, technology, and
            programming.
          </p>
        </div>
        <Posts />
      </div>
    </Hydrate>
  );
}
