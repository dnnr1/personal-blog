import MDEditor from "@/components/MDEditor";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center pt-14">
      <div className="container">
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
        <MDEditor />
      </div>
    </div>
  );
}
