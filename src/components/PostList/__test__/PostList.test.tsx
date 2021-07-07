import { fireEvent } from '@testing-library/react';
import { TestIds } from '../../../constants';
import { render } from '../../../test-utils';
import PostList, { PostListProps } from '../PostList';

const props: PostListProps = {
  onClickUp: () => {},
  onClickDown: () => {},
  postSearch: {
    value: '',
    onChange: () => {},
  },
  postsForSelectedUser: [],
};

test('render post-list component.', () => {
  const { getByTestId } = render(<PostList {...props} />);

  const inputEl = getByTestId(TestIds.postList.postSearch);

  expect(inputEl.value).toBe(props.postSearch.value);
});
