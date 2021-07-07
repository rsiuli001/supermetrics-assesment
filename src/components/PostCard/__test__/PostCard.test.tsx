import { render } from '@testing-library/react';
import { TestIds } from '../../../constants';
import PostCard from '../PostCard';

const props = {
  postDate: 'Date',
  postMessage: 'this is a test string',
  postType: 'Test post type',
};

test('Post Card Component', () => {
  const { getByTestId } = render(<PostCard {...props} />);

  expect(getByTestId(TestIds.postCard.postDate).textContent).toBe(props.postDate);
  expect(getByTestId(TestIds.postCard.postMessage).textContent).toBe(props.postMessage);
  expect(getByTestId(TestIds.postCard.postType).textContent).toBe(props.postType);
});
