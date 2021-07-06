import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchUser } from '../../api';
import { LocalStorageKeys, Routes, Strings } from '../../constants';
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
    const localDataString: string | null = localStorage.getItem(LocalStorageKeys.userDetails);

    if (localDataString) {
      try {
        const localData: LocalStorageData = localDataString && JSON.parse(localDataString);
        console.log('debug: localdata: ', localData);

        if (isDateDiffIsOneHr(new Date(localData.time), new Date())) {
          dispatch(updateUser(localData.userDetails));
          setIsFetchingData(false);
          history.push(Routes.postPath);
        }
      } catch (err) {
        setIsFetchingData(false);
        localStorage.removeItem(LocalStorageKeys.userDetails);
      }
    } else {
      setIsFetchingData(false);
    }
  };

  const isDateDiffIsOneHr = (dateA: Date, dateB: Date): boolean => {
    let timeDiff = (dateB.getTime() - dateA.getTime()) / 1000;
    console.log('debug: timediff in mili: ', timeDiff);

    if (Math.abs(Math.round((timeDiff /= 60))) <= 60) {
      console.log('debug: true');

      return true;
    } else {
      console.log('debug: false');

      return false;
    }
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

  return (
    <div className="container">
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
    </div>
  );
};

export default Login;
