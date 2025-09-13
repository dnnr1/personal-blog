import { fetchPost } from "@/apis/getPost";
import Dot from "@/components/Dot";
import formatDate from "@/util/formatDate";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const data = await fetchPost(postId);
  return (
    <div className="flex flex-col items-center justify-center pt-14">
      <h1 className="text-center text-4xl font-bold pb-4">{data.title}</h1>
      <div className="flex pb-10">
        <div className="h-[50px] w-[50px] mr-2 rounded-full overflow-hidden bg-black">
          <Image src="/avatar.png" alt="avatar" height={500} width={500} />
        </div>
        <div>
          <h1 className="text-smooth-orange">{data.author}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {formatDate(data.created_at)}
          </p>
        </div>
      </div>
      <div className="flex items-center w-[40px] justify-between pb-10">
        <Dot />
        <Dot />
        <Dot />
      </div>
      <div className="w-[600px]">
        {data.pictureUrl ? (
          <Image
            src={data.pictureUrl}
            alt="Post image"
            className="mb-4 rounded"
            width={1920}
            height={1080}
            priority
          />
        ) : null}
        <p>{data.content}</p>
      </div>
    </div>
  );
}
