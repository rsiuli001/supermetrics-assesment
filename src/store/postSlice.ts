import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceNames } from '../constants';
import { Post, PostSelectorProps, PostSliceState, PostWithUserCount } from '../types';

const initialPostState: PostSliceState = {
  posts: [],
  postsWithUser: [],
};

const postSlice = createSlice({
  name: SliceNames.postSlice,
  initialState: initialPostState,
  reducers: {
    addPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = [...state.posts, ...action.payload];
      state.postsWithUser = getPostsWithUser(action.payload);
    },
  },
});

const getPostsWithUser = (posts: Post[]): PostWithUserCount[] => {
  const res: PostWithUserCount[] = [];
  const index: string[] = [];

  posts.forEach((item: Post) => {
    const userId = item.from_id.toLowerCase();

    if (index.includes(userId)) {
      res[index.indexOf(userId)].posts.push(item);
      res[index.indexOf(userId)].count += 1;
    } else {
      index.push(userId);
      const temp: PostWithUserCount = {
        count: 1,
        from_id: item.from_id,
        from_name: item.from_name,
        posts: [item],
      };
      res.push(temp);
    }
  });

  return res;
};

//actions
const { addPosts } = postSlice.actions;

//reducer
const postReducer = postSlice.reducer;

//selector
const getAllPosts = ({ posts }: any) => posts.posts;

const selectPostsWithUserCount = ({ posts }: PostSelectorProps): PostWithUserCount[] => {
  return posts.postsWithUser;
};

export { addPosts, postReducer, getAllPosts, selectPostsWithUserCount };
