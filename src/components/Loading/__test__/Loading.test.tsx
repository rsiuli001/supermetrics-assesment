import { render } from '@testing-library/react';
import { TestIds } from '../../../constants';
import Loading from '../Loading';

const props = {
  text: 'Loading',
};

test('Renders Loading component', () => {
  const component = render(<Loading {...props} />);
  const element = component.getByTestId(TestIds.loading.loading);

  expect(element.textContent).toBe(props.text);
});
