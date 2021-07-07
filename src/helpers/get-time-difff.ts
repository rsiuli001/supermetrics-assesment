const getTimeDiff = (dateA: Date, dateB: Date): number => {
  let timeDiff = (dateB.getTime() - dateA.getTime()) / 1000;

  return Math.abs(Math.round((timeDiff /= 60)));
};

export default getTimeDiff;
