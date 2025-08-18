import { fetchPosts } from "@/apis/getPosts";
import Post from "@/components/Post";
import { Suspense, use } from "react";

export default function Home() {
  const posts = use(fetchPosts()) || [];
  return (
    <Suspense fallback={<div>loading...</div>}>
      <main className="w-full h-full">
        <h1 className="text-center underline text-2xl">Latest Updates</h1>
        <div className="grid grid-cols-2 mt-6">
          {posts.map((post, idx) => {
            return <Post data={post} key={idx} />;
          })}
        </div>
      </main>
    </Suspense>
  );
}
