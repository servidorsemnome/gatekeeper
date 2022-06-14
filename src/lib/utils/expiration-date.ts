import dayjs from 'dayjs';
import type { ManipulateType } from 'dayjs';

export const generateExpirationDate = (value: number, unit: ManipulateType) =>
  dayjs().add(value, unit).format();

export const isDateExpired = (date: Date) => date < new Date();

export const getExpirationTime = (option: string): [number, ManipulateType] => {
  switch (option) {
    case '10y':
      return [10, 'years'];
    case '24h':
      return [24, 'hours'];
    case '7d':
      return [7, 'days'];
    case '10s':
    default:
      return [10, 'seconds'];
  }
};
