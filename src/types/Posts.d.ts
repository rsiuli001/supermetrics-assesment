interface Post {
  id: string;
  created_time: string;
  from_id: string;
  from_name: string;
  message: string;
  type: string;
}

interface PostWithUserCount {
  from_id: string;
  from_name: string;
  count: number;
  posts: Post[];
}

interface PostSelectorProps {
  posts: PostSliceState;
}

interface PostSliceState {
  posts: Post[];
  postsWithUser: PostWithUserCount[];
}

export { Post, PostSelectorProps, PostWithUserCount, PostSliceState };
