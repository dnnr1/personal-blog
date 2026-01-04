import { getPost } from "@/server/posts/getPost";
import Hydrate from "@/components/Hydrate/Hydrate";
import Post from "@/components/Post/Post";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";

type Props = {
  params: Promise<{ postId: string }>;
};

export default async function PostPage({ params }: Props) {
  const { postId } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPost(postId),
  });

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Post id={postId} />
    </Hydrate>
  );
}
