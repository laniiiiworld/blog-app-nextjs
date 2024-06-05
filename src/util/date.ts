import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale);

export function formatAgo(time: string) {
  const locale = window.navigator.language === 'ko-KR' ? 'ko' : 'en_US';
  return format(time, locale);
}

export function formatToISODate(datetime: string) {
  const [yyyy, mm, dd] = datetime.replaceAll(' ', '').split(/\.|-|\//g);
  return `${yyyy}-${mm}-${dd}`;
}
