import { fireEvent } from '@testing-library/react';
import { Strings, TestIds } from '../../../constants';
import { render } from '../../../test-utils';
import Login, { LoginProps } from '../Login';

const props: LoginProps = {
  history: {} as any,
  location: {} as any,
  match: {} as any,
};

test('renders login component', async () => {
  const { findByTestId } = render(<Login {...props} />);
  const header = await findByTestId(TestIds.login.header);
  const name = await findByTestId(TestIds.login.name);
  const nameInput = await findByTestId(TestIds.login.nameInput);
  const email = await findByTestId(TestIds.login.email);

  expect(header.textContent).toBe(Strings.login);
  expect(name.textContent).toBe(Strings.name);
  expect(email.textContent).toBe(Strings.email);
  expect(nameInput.nodeValue).toBe(null);
});
