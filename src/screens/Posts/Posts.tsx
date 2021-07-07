import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchPost } from '../../api';
import { Routes, Strings } from '../../constants';
import { Loading, PostList, UserList } from '../../components';
import {
  fetchTokenFromLocalStorage,
  sortByDateAscending,
  sortByDateDescending,
} from '../../helpers';
import { useFormInput } from '../../hooks';
import { addPosts, selectPostsWithUserCount } from '../../store/postSlice';
import { selectUser, updateUser } from '../../store/userSlice';
import { Post, PostWithUserCount, User } from '../../types';
import './Posts.css';

export interface PostsProps extends RouteComponentProps {}

const Posts: React.FC<PostsProps> = ({ history }): JSX.Element => {
  const user = useSelector(selectUser);
  const posts = useSelector(selectPostsWithUserCount);

  const userSearch = useFormInput(Strings.empty);
  const postSearch = useFormInput(Strings.empty);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedUser, setSelectedUser] = useState<string>(Strings.empty);
  const [userList, setUserList] = useState<PostWithUserCount[]>(posts || []);
  const [postsForSelectedUser, setPostsForSelectedUser] = useState<Post[]>([]);

  useEffect(() => {
    if (user.sl_token && posts.length === 0) {
      getPosts();
    } else {
      fetchDataFromLocalStorage();
    }
  }, [user]);

  useEffect(() => {
    if (posts.length > 0) {
      setSelectedUser(posts[0].from_id);
      setPostsForSelectedUser(posts[0].posts);
      setUserList(posts);
    }
  }, [posts]);

  useEffect(() => {
    if (selectedUser) {
      setPostsForSelectedUser(getPostsForSelectedUser());
    }
  }, [selectedUser]);

  useEffect(() => {
    if (postSearch.value.length > 0) {
      const filteredPost = getPostsForSelectedUser().filter(
        (post: Post) =>
          post.message.toLowerCase().includes(postSearch.value.toLowerCase()) ||
          post.type.toLowerCase().includes(postSearch.value.toLowerCase()) ||
          post.id.toLowerCase().includes(postSearch.value.toLowerCase())
      );

      setPostsForSelectedUser(filteredPost);
    } else {
      setPostsForSelectedUser(getPostsForSelectedUser());
    }
  }, [postSearch.value]);

  useEffect(() => {
    if (userSearch.value.length > 0) {
      const filteredUserList: PostWithUserCount[] = posts.filter((post: PostWithUserCount) =>
        post.from_name.toLowerCase().includes(userSearch.value.toLowerCase())
      );
      setUserList(filteredUserList);
    } else {
      setUserList(posts);
    }
  }, [userSearch.value]);

  const fetchDataFromLocalStorage = (): void => {
    fetchTokenFromLocalStorage()
      .then((user: User) => {
        dispatch(updateUser(user));
      })
      .catch(() => {
        setIsLoading(false);
        history.replace(Routes.basePath);
      });
  };

  const getPosts = async () => {
    let posts: any = [];
    for (let i = 1; i <= 10; i++) {
      const { data } = await fetchPost(user.sl_token, i);
      posts = [...posts, ...data.posts];
    }

    setIsLoading(false);
    dispatch(addPosts(posts));
  };

  const getPostsForSelectedUser = (): Post[] => {
    let res: Post[] = [];
    posts.every((post: PostWithUserCount) => {
      if (post.from_id === selectedUser) {
        res = post.posts;
        return false;
      }
      return true;
    });

    return res;
  };

  const onClickUp = useCallback((): void => {
    setPostsForSelectedUser(sortByDateAscending(postsForSelectedUser.slice()));
  }, [postsForSelectedUser]);

  const onClickDown = useCallback((): void => {
    setPostsForSelectedUser(sortByDateDescending(postsForSelectedUser.slice()));
  }, [postsForSelectedUser]);

  const onCardClick = (fromId: string): void => {
    setSelectedUser(fromId);
  };

  const renderPosts = () => {
    return (
      <div className="content">
        <UserList
          onCardClick={onCardClick}
          selectedUser={selectedUser}
          userList={userList}
          userSearch={userSearch}
        />

        <PostList
          onClickUp={onClickUp}
          onClickDown={onClickDown}
          postSearch={postSearch}
          postsForSelectedUser={postsForSelectedUser}
        />
      </div>
    );
  };

  return (
    <div className="container">
      {isLoading ? <Loading text={Strings.loading} /> : renderPosts()}
    </div>
  );
};

export default Posts;
