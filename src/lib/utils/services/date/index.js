import moment from 'moment';

export const getCurrentWeek = () => {
  return {
    week: moment().week(),
    month: moment().month(),
    year: moment().year(),
  };
};
export const getLastWeek = () => {
  const lastweek = moment().subtract(1, 'weeks');
  return {
    week: lastweek.week(),
    month: lastweek.month(),
    year: lastweek.year(),
  };
};

export const getLastWeekList = (n = 12) => {
  const lastweek = moment();
  const lastWeeks = [];

  for (let i = 0; i < n; i++) {
    const week = lastweek.clone().subtract(i, 'weeks');
    lastWeeks.push({
      week: week.week(),
      month: week.month(),
      year: week.year(),
    });
  }

  return lastWeeks;
};
