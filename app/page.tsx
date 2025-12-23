import { fetchPosts } from "@/hooks/posts/queries";
import Post from "@/components/Post";

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl underline mb-6">Latest Posts</h1>
      <div className="grid grid-cols-2 gap-5 max-xl:grid-cols-1">
        {posts.map((post) => (
          <Post key={post.id} data={post} />
        ))}
      </div>
    </div>
  );
}
