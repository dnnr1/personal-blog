"use client";
import { getPost } from "@/api/getPost";
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

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <div className="flex flex-col items-center pt-14">
      <h1 className="text-center text-4xl font-bold pb-4">{data.title}</h1>
      <div className="flex items-center pb-6">
        <div className="h-12 w-12 mr-3 rounded-full overflow-hidden bg-black">
          <Image src="/avatar.png" alt="avatar" height={48} width={48} />
        </div>
        <div>
          <p className="text-smooth-orange">{data.author}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(data.created_at)}
          </p>
        </div>
      </div>
      <div className="flex items-center w-10 justify-between pb-6">
        <Dot />
        <Dot />
        <Dot />
      </div>
      <PostActions postId={id} />
      <div className="w-full max-w-2xl mt-6">
        {data.pictureUrl && (
          <Image
            src={data.pictureUrl}
            alt="Post image"
            className="mb-4 rounded"
            width={1920}
            height={1080}
            priority
          />
        )}
        <MDPreview value={data.content} />
      </div>
    </div>
  );
}

export default Post;
