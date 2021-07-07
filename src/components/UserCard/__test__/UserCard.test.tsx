import { render } from '@testing-library/react';
import { TestIds } from '../../../constants';
import UserCard from '../UserCard';

const props = {
  isSelected: false,
  onClick: () => {},
  userName: 'User One',
  postCount: 12,
};

test('Render User Card', () => {
  const component = render(<UserCard {...props} />);

  expect(component.getByTestId(TestIds.userCard.userName).textContent).toBe(props.userName);
  expect(component.getByTestId(TestIds.userCard.postCount).textContent).toBe(
    props.postCount.toString()
  );
});
