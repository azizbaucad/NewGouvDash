import { getElement } from 'pages/api/global';

export const getHightlightData = (week, year, direction, setData, setError) => {
  const dateParams = week + '/' + year;
  const url = direction
    ? 'v1/highlight/by-direction/' + dateParams + '/' + direction
    : 'v1/highlight/by-week-year/' + dateParams;
  getElement(url)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log('Error::: ', err);
    });
};

export const getHightlightStatus = (direction, setData, setError) => {
  const url = direction
    ? 'v1/status/byDirectionId?id=' + direction
    : 'v1/status/default';
  getElement(url)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log('Error::: ', err);
    });
};
