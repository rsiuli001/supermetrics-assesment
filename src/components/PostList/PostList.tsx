import { FC, memo } from 'react';
import { Strings, TestIds } from '../../constants';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import { UserFormInput } from '../../hooks/useFormInput';
import { Post } from '../../types';
import { PostCard } from '../';

export interface PostListProps {
  onClickUp: () => void;
  onClickDown: () => void;
  postSearch: UserFormInput;
  postsForSelectedUser: Post[];
}

const PostList: FC<PostListProps> = ({
  onClickUp,
  onClickDown,
  postSearch,
  postsForSelectedUser,
}): JSX.Element => {
  return (
    <div className="right">
      <div className="search-bar-right">
        <div className="icon-container">
          <div className="icon" onClick={onClickUp}>
            <ArrowUpward style={{ color: '#fff', marginRight: 5 }} />
          </div>

          <div className="icon" onClick={onClickDown}>
            <ArrowDownward style={{ color: '#fff', marginLeft: 5 }} />
          </div>
        </div>
        <input
          data-testid={TestIds.postList.postSearch}
          type="text"
          {...postSearch}
          placeholder={Strings.searchPosts}
          style={{ marginRight: 10, height: 30 }}
        />
      </div>

      <div className="post-container ">
        {postsForSelectedUser.map((post: Post) => {
          const date = new Date(post.created_time).toString();

          return (
            <PostCard
              key={post.id}
              postDate={date.slice(date.indexOf(' ') + 1, date.indexOf('GMT') - 1)}
              postMessage={post.message}
              postType={post.type}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(PostList);
