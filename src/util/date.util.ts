import dayjs from 'dayjs';

export const addSecond = (duration: number): Date => {
  return dayjs().add(duration, 'seconds').toDate();
};

export const isExpired = (date: Date): boolean => {
  const currentDate = dayjs();
  return dayjs(date).isBefore(currentDate);
};
