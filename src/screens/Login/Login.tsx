import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchUser } from '../../api';
import { LocalStorageKeys, Routes, Strings } from '../../constants';
import { fetchTokenFromLocalStorage } from '../../helpers';
import { useFormInput } from '../../hooks';
import { updateUser } from '../../store/userSlice';
import { LocalStorageData, User } from '../../types';
import './Login.css';

interface LoginProps extends RouteComponentProps {}

const Login: React.FC<LoginProps> = ({ history }): JSX.Element => {
  const dispatch = useDispatch();

  const name = useFormInput(Strings.empty);
  const email = useFormInput(Strings.empty);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(Strings.empty);

  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

  useEffect(() => {
    setIsFetchingData(true);
    fetchDataFromLocalStorage();
  }, []);

  const fetchDataFromLocalStorage = (): void => {
    fetchTokenFromLocalStorage()
      .then((user: User) => {
        dispatch(updateUser(user));
        setIsFetchingData(false);
        history.push(Routes.postPath);
      })
      .catch(() => {
        setIsFetchingData(false);
      });
  };

  const handleLogin = () => {
    setIsLoading(true);

    // fetchUser(name.value, email.value)
    fetchUser('ram chandra siuli', 'ram.siuli@gmail.com')
      .then((response): any => {
        const dataToStoreLocally: LocalStorageData = {
          time: new Date(),
          userDetails: {
            client_id: response.data.client_id,
            sl_token: response.data.sl_token,
            email: response.data.email,
          },
        };

        localStorage.setItem(LocalStorageKeys.userDetails, JSON.stringify(dataToStoreLocally));

        dispatch(updateUser(response.data));
        setIsLoading(false);
        history.push(Routes.postPath);
      })
      .catch(() => {
        setIsLoading(false);
        setError(Strings.loginError);
      });
  };

  const renderLoading = (): JSX.Element => {
    return (
      <div className="login-card">
        <div className="loading">
          <p>{Strings.loginValidation}</p>
        </div>
      </div>
    );
  };

  const renderLogin = (): JSX.Element => {
    return (
      <div className="login-card">
        <div className="header">
          <h3>{Strings.login}</h3>
        </div>

        <div className="login-form">
          <div className="name">
            <div>{Strings.name}</div>
            <input type="text" {...name} placeholder={Strings.nameHint} />
          </div>

          <div className="email">
            <div>{Strings.email}</div>
            <input type="text" {...email} placeholder={Strings.emailHint} />
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="button">
          <input
            type="button"
            style={{ backgroundColor: isLoading ? '#C8C8C8' : '#85e085' }}
            value={isLoading ? Strings.loading : Strings.go}
            onClick={handleLogin}
          />
        </div>
      </div>
    );
  };

  return <div className="container">{isFetchingData ? renderLoading() : renderLogin()}</div>;
};

export default Login;
