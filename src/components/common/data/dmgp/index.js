import { getElement } from 'pages/api/global';

export const getValuesData = (props) => {
  getElement('v1/direction-data/dataDmgp?week=45&year=2023')
    .then((res) => {
      console.log('res data on another file ...', res);
    })
    .catch((error) => {
      console.log('Error:::in another file', error);
    });
};
