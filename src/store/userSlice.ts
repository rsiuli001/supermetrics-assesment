import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceNames, Strings } from '../constants';
import { User, UserSelectorProps, UserSliceState } from '../types';

const initialUserState: UserSliceState = {
  user: {
    client_id: Strings.empty,
    email: Strings.empty,
    sl_token: Strings.empty,
  },
};

const userSlice = createSlice({
  name: SliceNames.userSlice,
  initialState: initialUserState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = {
        client_id: action.payload.client_id,
        email: action.payload.email,
        sl_token: action.payload.sl_token,
      };
    },
  },
});

//actions
const { updateUser } = userSlice.actions;

//reducer
const userReducer = userSlice.reducer;

//selector
const selectUser = ({ user }: UserSelectorProps) => user.user;

export { updateUser, selectUser, userReducer };
