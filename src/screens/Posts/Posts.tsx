import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../../api';
import { Strings } from '../../constants';
import { useFormInput } from '../../hooks';
import { addPosts, selectPostsWithUserCount } from '../../store/postSlice';
import { selectUser } from '../../store/userSlice';
import { Post, PostWithUserCount } from '../../types';
import './Posts.css';

const Posts: React.FC = (): JSX.Element => {
  const user = useSelector(selectUser);
  const posts = useSelector(selectPostsWithUserCount);

  const userSearch = useFormInput(Strings.empty);
  const postSearch = useFormInput(Strings.empty);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(Strings.empty);

  const [selectedUser, setSelectedUser] = useState<string>(Strings.empty);
  const [userList, setUserList] = useState<PostWithUserCount[]>(posts || []);
  const [postsForSelectedUser, setPostsForSelectedUser] = useState<Post[]>([]);

  useEffect(() => {
    if (user.sl_token && posts.length === 0) {
      getPosts();
    } else {
      setIsLoading(false);
      setError(Strings.noTokenFound);
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
    setPostsForSelectedUser(getPostsForSelectedUser());
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

  const renderLoading = (message?: string): JSX.Element => {
    return (
      <div className="loading-container">
        <p>{message ? message : Strings.loading}</p>
      </div>
    );
  };

  const renderUserCard = (post: PostWithUserCount): JSX.Element => {
    return (
      <div
        key={post.from_id}
        className="user-card"
        style={{
          backgroundColor: post.from_id === selectedUser ? '#888888' : '#E8E8E8',
        }}
        onClick={() => {
          setSelectedUser(post.from_id);
        }}
      >
        <div>{post.from_name}</div>
        <div className="user-count">{post.posts.length}</div>
      </div>
    );
  };

  const renderLeft = (): JSX.Element => {
    return (
      <div className="left">
        <input
          type="text"
          {...userSearch}
          placeholder={Strings.searchUser}
          style={{ height: 30 }}
        />

        <div className="user-container">
          {userList.map((post: PostWithUserCount): JSX.Element => {
            return renderUserCard(post);
          })}
        </div>
      </div>
    );
  };

  const renderPostCard = (post: Post): JSX.Element => {
    const date = new Date(post.created_time).toString();
    return (
      <div key={post.id} className="post-card">
        <div className="post-header">
          {date.slice(date.indexOf(' ') + 1, date.indexOf('GMT') - 1)}
        </div>

        <div className="post-content">
          <div>{post.message}</div>

          <div>{post.type}</div>
        </div>
      </div>
    );
  };

  const renderRight = (): JSX.Element => {
    return (
      <div className="right">
        <div className="search-bar-right">
          <input
            type="text"
            {...postSearch}
            placeholder={Strings.searchPosts}
            style={{ marginRight: 10, height: 30 }}
          />
        </div>

        <div className="post-container ">
          {postsForSelectedUser.map((post: Post) => {
            return renderPostCard(post);
          })}
        </div>
      </div>
    );
  };

  const renderPosts = () => {
    return (
      <div className="content">
        {renderLeft()}

        {renderRight()}
      </div>
    );
  };

  return (
    <div className="container">
      {isLoading ? renderLoading() : error ? renderLoading(error) : renderPosts()}
    </div>
  );
};

export default Posts;
