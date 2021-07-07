import { LocalStorageKeys } from '../constants';
import { LocalStorageData, User } from '../types';
import getTimeDiff from './get-time-difff';

const fetchTokenFromLocalStorage = () => {
  return new Promise<User>((resolve, reject) => {
    const localDataString: string | null = localStorage.getItem(LocalStorageKeys.userDetails);

    if (localDataString) {
      try {
        const localData: LocalStorageData = localDataString && JSON.parse(localDataString);

        if (getTimeDiff(new Date(localData.time), new Date()) < 60) {
          resolve(localData.userDetails);
        } else {
          localStorage.removeItem(LocalStorageKeys.userDetails);
          reject('');
        }
      } catch (err) {
        localStorage.removeItem(LocalStorageKeys.userDetails);
        reject('');
      }
    } else {
      reject('');
    }
  });
};

export default fetchTokenFromLocalStorage;
