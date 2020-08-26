/**
 * @desc date time formatter
 * @param {*} date
 * @param {string} format, default 'yyyy-MM-dd'
 * @return {string}
 */
const format = (date, format = 'yyyy-MM-dd') => {
  if (!date) return '';

  switch (typeof date) {
    case 'string':
      date = new Date(date.replace(/-/, '/'));
      break;

    case 'number':
      date = new Date(date);
      break;
  }

  if (!(date instanceof Date)) return '';

  const dict = {
    'yyyy': date.getFullYear(),
    'M': date.getMonth() + 1,
    'd': date.getDate(),
    'H': date.getHours(),
    'm': date.getMinutes(),
    's': date.getSeconds(),
    'MM': ('' + (date.getMonth() + 101)).substr(1),
    'dd': ('' + (date.getDate() + 100)).substr(1),
    'HH': ('' + (date.getHours() + 100)).substr(1),
    'mm': ('' + (date.getMinutes() + 100)).substr(1),
    'ss': ('' + (date.getSeconds() + 100)).substr(1)
  };

  return format.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, function() {
    return dict[arguments[0]];
  });

};


/**
 * @desc transform duration to readable string
 * @param {number} duration
 * @param {string} separator, default ':'
 * @return {string}
 */
const duration = (duration, separator = ':') => {
  let hours = Math.floor(duration / 3600);
  let mins = Math.floor(duration % 3600 / 60);
  let secs = parseInt(duration % 60);

  hours = hours < 10 ? `0${hours}` : hours;
  mins = mins < 10 ? `0${mins}` : mins;
  secs = secs < 10 ? `0${secs}` : secs;

  return `${hours}${separator}${mins}${separator}${secs}`;

};

/**
 * @desc returns a monthly calendar according to the provided date
 * @param {number | string} date, optional params, default current month
 * @param {boolean?} day2cn, whether translate numerical day to chinese
 * @returns {[]}
 */
const monthlyCalendar = (date, day2cn = true) => {
  const targetDate = date ? new Date(date) : new Date();
  const targetMonth = targetDate.getMonth();
  const dayMap = ['日', '一', '二', '三', '四', '五', '六'];
  const dateAndDay = [];

  for (let i = 1; i <= 31; i++) {
    targetDate.setDate(i);

    const validDate = targetMonth === targetDate.getMonth();

    if (!validDate) break;

    const day = targetDate.getDay();

    dateAndDay.push({
      date: i,
      day: day2cn ? dayMap[day] : day
    });

  }

  return dateAndDay;

};

export default {format, duration, monthlyCalendar};
