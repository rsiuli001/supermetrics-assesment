import React from 'react';
import { TestIds } from '../../constants';
import './UserCard.css';

interface UserCardProps {
  isSelected: boolean;
  onClick: () => void;
  userName: string;
  postCount: number;
}

const UserCard: React.FC<UserCardProps> = ({
  isSelected,
  onClick,
  userName,
  postCount,
}): JSX.Element => {
  return (
    <div
      data-testid="user-card"
      className="user-card"
      style={{
        backgroundColor: isSelected ? '#888888' : '#E8E8E8',
      }}
      onClick={onClick}
    >
      <div data-testid={TestIds.userCard.userName}>{userName}</div>
      <div data-testid={TestIds.userCard.postCount} className="user-count">
        {postCount}
      </div>
    </div>
  );
};

export default React.memo(UserCard);
