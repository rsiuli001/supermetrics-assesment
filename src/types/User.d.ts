interface User {
  client_id: string;
  email: string;
  sl_token: string;
}

interface UserSelectorProps {
  user: UserSliceState;
}

interface UserSliceState {
  user: User;
}

export { User, UserSelectorProps, UserSliceState };
