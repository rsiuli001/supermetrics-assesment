import { FC, memo } from 'react';
import { TestIds } from '../../constants';

interface PostCardProps {
  postDate: string;
  postMessage: string;
  postType: string;
}

const PostCard: FC<PostCardProps> = ({ postDate, postMessage, postType }): JSX.Element => {
  return (
    <div className="post-card">
      <div data-testid={TestIds.postCard.postDate} className="post-header">
        {postDate}
      </div>

      <div className="post-content">
        <div data-testid={TestIds.postCard.postMessage}>{postMessage}</div>

        <div data-testid={TestIds.postCard.postType}>{postType}</div>
      </div>
    </div>
  );
};

export default memo(PostCard);
