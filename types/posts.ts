export type PostsResponse = {
  ok: true;
  status: number;
  message: string;
  data: Post[];
};

export type Post = {
  id: string;
  title: string;
  pictureUrl?: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
};
