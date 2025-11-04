import { fetchPosts } from "@/hooks/usePosts";
import Post from "@/components/Post";

export default async function Home() {
  const data = await fetchPosts();

  return (
    <div className="w-full h-full">
      <h1 className="text-center underline text-2xl">Latest Updates</h1>
      <div className="grid grid-cols-2 mt-6 gap-5 max-xl:grid-cols-1">
        {data.map((post, idx) => {
          return <Post data={post} key={idx} />;
        })}
      </div>
    </div>
  );
}
