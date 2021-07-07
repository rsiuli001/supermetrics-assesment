import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { userReducer } from './store/userSlice';
import { postReducer } from './store/postSlice';

const render = (
  ui: any,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        user: userReducer,
        posts: postReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: any = {}
) => {
  const Wrapper = ({ children }: any) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };
