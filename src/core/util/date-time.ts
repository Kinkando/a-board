import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);
dayjs.locale('en');

export function timeRange(dateTime: Date, fromDateTime?: Date) {
  const suffix = 'ago';
  const now = new Date();
  const date = fromDateTime && fromDateTime < now ? fromDateTime : now;
  const second = dayjs(date).diff(dateTime, 'second');
  if (second < 60) {
    return `a few seconds ${suffix}`;
  }
  return dayjs(dateTime).fromNow();
}

export function timeRangeDate(dateTime: Date) {
  const isoDate = new Date().toISOString();
  const now = new Date(isoDate.substring(0, isoDate.indexOf('T')));
  return dayjs(dateTime).from(now);
}

export function timeFormat(dateTime: Date) {
  return new Date(dateTime).toLocaleString('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
