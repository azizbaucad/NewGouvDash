import { getElement } from 'pages/api/global';

export const getStatus = (direction, setData, setError) => {
  const url = 'v1/status/' + direction;

  getElement(url)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log('Error::: ', err);
    });
};
