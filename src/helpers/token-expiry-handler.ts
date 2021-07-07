import { fetchUser } from '../api';

const TokenExpiryHandler = (token: string, name: string, email: string) => {
  setTimeout(() => {
    fetchUser(name, email).then((response: any) => {
      //
    });
  }, 59000);
};

export default TokenExpiryHandler;
