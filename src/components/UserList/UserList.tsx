import { FC, memo } from 'react';
import { PostWithUserCount } from '../../types';
import { UserCard } from '../';
import { UserFormInput } from '../../hooks/useFormInput';
import { Strings } from '../../constants';

export interface UserListProps {
  onCardClick: (formId: string) => void;
  selectedUser: string;
  userList: PostWithUserCount[];
  userSearch: UserFormInput;
}

const UserList: FC<UserListProps> = ({
  onCardClick,
  selectedUser,
  userList,
  userSearch,
}): JSX.Element => {
  return (
    <div className="left">
      <input type="text" {...userSearch} placeholder={Strings.searchUser} style={{ height: 30 }} />

      <div className="user-container">
        {userList.map((post: PostWithUserCount): JSX.Element => {
          return (
            <UserCard
              key={post.from_id}
              isSelected={post.from_id === selectedUser}
              onClick={() => {
                onCardClick(post.from_id);
              }}
              userName={post.from_name}
              postCount={post.posts.length}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(UserList);
