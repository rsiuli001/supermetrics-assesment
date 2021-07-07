import { Post } from '../types';

const sortByDateAscending = (data: Post[]): Post[] => {
  return data.sort((itemA: Post, itemB: Post): number => {
    return compareTime(new Date(itemA.created_time), new Date(itemB.created_time));
  });
};

const sortByDateDescending = (data: Post[]): Post[] => {
  return data.sort((itemA: Post, itemB: Post): number => {
    return compareTime(new Date(itemB.created_time), new Date(itemA.created_time));
  });
};

const compareTime = (dateA: Date, dateB: Date): number => {
  return dateA.getTime() - dateB.getTime();
};

export { sortByDateAscending, sortByDateDescending };
