import { getPosts } from "@/api/getPosts";
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
      <div className="w-full">
        <h1 className="text-center text-2xl underline mb-6">Latest Posts</h1>
        <Posts />
      </div>
    </Hydrate>
  );
}
