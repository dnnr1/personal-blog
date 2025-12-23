export type Post = {
  id: string;
  title: string;
  content: string;
  pictureUrl?: string;
  author: string;
  created_at: string;
  updated_at: string;
};

export type PostInput = {
  title: string;
  content: string;
  pictureUrl?: string;
};

export type ApiResponse<T> = {
  ok: boolean;
  status: number;
  message: string;
  data: T;
};
