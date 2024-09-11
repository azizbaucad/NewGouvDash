import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  elements,
} from 'chart.js';
import { createElement, getElement } from 'pages/api/global';
import { useEffect, useState } from 'react';
import { Line, Chart } from 'react-chartjs-2';
//import { Treemap } from 'react-chartjs-2';
import {
  abreviateNumber,
  formatNumber,
  numberMonthToName,
  weekNumber,
} from '@utils/formater';
import { direction } from '@theme';
import 'chartjs-chart-treemap';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';

ChartJS.register(
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TreemapController,
  TreemapElement
);

//Integrate data parc_dmgp_data
//const [week, setWeek] = useState

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sept'],
  datasets: [
    {
      label: 'Wave',
      data: [80, 100, 150, 80, 120, 100, 80, 130],
      fill: false,
      backgroundColor: '#34a4ec',
      borderColor: '#34a4ec',
    },
    {
      label: 'Orange Money',
      data: [90, 70, 100, 100, 100, 120, 130, 140],
      fill: false,
      backgroundColor: '#ff903d',
      borderColor: '#ff903d',
    },
  ],
};

const options = {
  layout: {
    padding: {
      left: 0,
      right: 60,
      top: 0,
      bottom: 0,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    line: {
      fill: false,
      tension: 0.01,
      borderWidth: 2,
    },
  },
  scales: {
    x: {
      border: {
        display: true,
      },
      grid: {
        color: 'rgb(0, 0, 0, 0.02)',
      },
      ticks: {
        font: {
          size: 12, // Taille de la police pour l'axe X
        },
      },
    },
    y: {
      beginAtZero: false, // Ensure the y-axis does not start at zero
      ticks: {
        callback: formatNumber, // Use formatNumber function for y-axis ticks
        beginAtZero: false,
        font: {
          size: 12,
        },
      },
      border: {
        display: true,
      },
      grid: {
        color: 'rgb(0, 0, 0, 0.02)',
      },
      gridLines: {
        color: 'red',
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: {
        color: '#666',
        usePointStyle: true,
        pointStyle: function () {
          return 'rectRounded';
        },
        boxHeight: 8,
        boxWidth: 16,
        padding: 5,
        borderWidth: 1,
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
    title: {
      display: false,
    },
    datalabels: {
      display: false,
      labels: {
        display: true,
      },
    },
  },
};

const simulatedData = {
  caRechargeArrayData: ['Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juillet', 'Aout'],
  dataSetCa: [730000000000, 630000000000, 530000000000, 430000000000, 330000000000, 230000000000, 130000000000, 30000000000],// Objectifs proches des valeurs réelles
  labelNameCa: 'Budget consommé',
};


export const LineChartsParcOM = () => {
  const [caRechargeChartData, setCaRechargeChartData] = useState({
    caRechargeArrayData: [],
    dataSetCa: [],
  });

  useEffect(() => {
    // Simulation des données
    const newCaRechargeChartData = {
      caRechargeArrayData: simulatedData.caRechargeArrayData,
      dataSetCa: simulatedData.dataSetCa,
    };
    setCaRechargeChartData(newCaRechargeChartData);
  }, []);

  // Mapping des données pour le graphique
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: 'Budget consommé',
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#991b1b',
        borderColor: '#991b1b',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        border: {
          display: true,
        },
        ticks: {
          font: {
            size: 12, // Taille de la police pour l'axe X
          },
        },
        grid: {
          color: 'rgb(0, 0, 0, 0.02)',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: formatNumber, // Use formatNumber function for y-axis ticks
          beginAtZero: false,
          font: {
            size: 12,
          },
        },
        border: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: '#666',
          usePointStyle: true,
          pointStyle: function () {
            return 'rectRounded';
          },
          boxHeight: 8,
          boxWidth: 16,
          padding: 5,
          borderWidth: 1,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      title: {
        display: false,
      },
      datalabels: {
        display: false,
        labels: {
          display: true,
        },
      },
    },
  };

  return <Line data={data_} options={options} />;
};

export const LineCharts = ({ selectedWeek }) => {
  const [week_, year_] = selectedWeek.split('-');

  const [caRechargeChartData, setCaRechargeChartData] = useState({
    caRechargeArrayData: [],
    dataSetCa: [],
    labelNameCa: '',
    dataSetObj: [],
    labelNameObj: [],
  });

  const getLinesChartsDataCaRecharge = (week_, year_) => {
    getElement(
      'v1/direction-data/ca-recharge?week=' + week_ + '&year=' + year_
    ).then((response) => {
      const newCaRechargeChartData = {
        caRechargeArrayData: response?.data
          .map((item) => numberMonthToName(item.month, item.year))
          .reverse(),
        dataSetCa: response?.data.map((item) => item.data[0].value).reverse(),
        dataSetObj: response?.data.map((item) => item.data[1].value).reverse(),
        labelNameCa: response?.data[0].data[0].name,
        labelNameObj: response?.data[0].data[1].name,
      };

      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  useEffect(() => {
    getLinesChartsDataCaRecharge(week_, year_);
  }, [week_, year_]);

  // Mapping data
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: 'CA Recharge TTC',
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#38c172',
        borderColor: '#38c172',
      },
      {
        label: 'Objectif',
        data: caRechargeChartData.dataSetObj,
        fill: false,
        backgroundColor: '#dc3030',
        borderColor: '#dc3030',
      },
    ],
  };

  return <Line data={data_} options={options} />;
};


export const LineChartsCAFixe = ({ selectedWeek }) => {
  const [week_, year_] = selectedWeek.split('-');

  const [caRechargeChartData, setCaRechargeChartData] = useState({
    caRechargeArrayData: [],
    dataSetCa: [],
    labelNameCa: '',
    dataSetObj: [],
    labelNameObj: [],
  });

  const getLinesChartsDataCaRecharge = (week_, year_) => {
    getElement(
      'v1/direction-data/ca-fixe?week=' + week_ + '&year=' + year_
    ).then((response) => {
      const newCaRechargeChartData = {
        caRechargeArrayData: response?.data
          .map((item) => numberMonthToName(item.month, item.year))
          .reverse(),
        dataSetCa: response?.data.map((item) => item.data[0].value).reverse(),
        dataSetObj: response?.data.map((item) => item.data[1].value).reverse(),
        labelNameCa: response?.data[0].data[0].name,
        labelNameObj: response?.data[0].data[1].name,
      };

      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  useEffect(() => {
    getLinesChartsDataCaRecharge(week_, year_);
  }, [week_, year_]);

  //Mapping data
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: 'CA Fixe',
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#38c172',
        borderColor: '#38c172',
      },
      {
        label: 'Objectif',
        data: caRechargeChartData.dataSetObj,
        fill: false,
        backgroundColor: '#dc3030',
        borderColor: '#dc3030',
      },
    ],
  };

  return <Line data={data_} options={options} />;
};

export const TreeMapChartDst = ({ selectedWeek }) => {
  const [week_, year_] = selectedWeek.split('-');

  const [caRechargeChartData, setCaRechargeChartData] = useState({
    caRechargeArrayData: [],
    dataSetCa: [],
    labelNameCa: '',
    dataSetObj: [],
    labelNameObj: '',
  });

  const getLinesChartsDataCaRecharge = (week_, year_) => {
    getElement(
      'v1/direction-data/ca-fixe?week=' + week_ + '&year=' + year_
    ).then((response) => {
      const newCaRechargeChartData = {
        caRechargeArrayData: response?.data
          .map((item) => numberMonthToName(item.month, item.year))
          .reverse(),
        dataSetCa: response?.data.map((item) => item.data[0].value).reverse(),
        dataSetObj: response?.data.map((item) => item.data[1].value).reverse(),
        labelNameCa: response?.data[0].data[0].name,
        labelNameObj: response?.data[0].data[1].name,
      };

      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  useEffect(() => {
    getLinesChartsDataCaRecharge(week_, year_);
  }, [week_, year_]);

  // Mapping data
  const data_ = {
    datasets: [
      {
        tree: caRechargeChartData.caRechargeArrayData.map((label, index) => ({
          category: label,
          value: caRechargeChartData.dataSetCa[index],
          label: caRechargeChartData.labelNameCa,
        })),
        backgroundColor: '#38c172',
      },
      {
        tree: caRechargeChartData.caRechargeArrayData.map((label, index) => ({
          category: label,
          value: caRechargeChartData.dataSetObj[index],
          label: caRechargeChartData.labelNameObj,
        })),
        backgroundColor: '#dc3030',
      },
    ],
  };

  const options_tree = {
    // Treemap options here
  };

  return <Chart type="treemap" data={data_} options={options_tree} />;
};

export const LineChartsParcMobile = ({ selectedWeek }) => {
  const [week_, year_] = selectedWeek.split('-');

  const [caRechargeChartData, setCaRechargeChartData] = useState({
    caRechargeArrayData: [],
    dataSetCa: [],
    labelNameCa: '',
    dataSetObj: [],
    labelNameObj: [],
  });

  const getLinesChartsDataCaRecharge = () => {
    getElement(
      'v1/direction-data/parc-mobile?week=' + week_ + '&year=' + year_
    ).then((response) => {
      const newCaRechargeChartData = {
        caRechargeArrayData: response?.data
          .map((item) => numberMonthToName(item.month, item.year))
          .reverse(),
        dataSetCa: response?.data.map((item) => item.data[0].value).reverse(),
        dataSetObj: response?.data.map((item) => item.data[1].value).reverse(),
        labelNameCa: response?.data[0].data[0].name,
        labelNameObj: response?.data[0].data[1].name,
      };

      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  useEffect(() => {
    getLinesChartsDataCaRecharge(week_, year_);
  }, [week_, year_]);

  //Mapping data
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: 'Parc Mobile',
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#38c172',
        borderColor: '#38c172',
      },
      {
        label: 'Objectif',
        data: caRechargeChartData.dataSetObj,
        fill: false,
        backgroundColor: '#dc3030',
        borderColor: '#dc3030',
      },
    ],
  };

  return <Line data={data_} options={options} />;
};

export const LineChartsMobileDv = ({ selectedWeek }) => {
  const [week_, year_] = selectedWeek.split('-');

  const [caRechargeChartData, setCaRechargeChartData] = useState({
    caRechargeArrayData: [],
    dataSetCa: [],
    labelNameCa: '',
    dataSetObj: [],
    labelNameObj: [],
  });

  const getLinesChartsDataCaRecharge = (week_, year_) => {
    getElement(
      'v1/direction-data/gross-add-mobile?week=' + week_ + '&year=' + year_
    ).then((response) => {
      const newCaRechargeChartData = {
        caRechargeArrayData: response.data
          .map((item) => weekNumber(item.week, item.year))
          .reverse(),
        dataSetCa: response.data.map((item) => item.data[0].value).reverse(),
        dataSetObj: response.data.map((item) => item.data[1].value).reverse(),
        labelNameCa: response?.data[0].data[0].name,
        labelNameObj: response?.data[0].data[1].name,
      };

      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  useEffect(() => {
    getLinesChartsDataCaRecharge(week_, year_);
  }, [week_, year_]);

  //Mapping data
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: 'Mobile',
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#38c172',
        borderColor: '#38c172',
      },
      {
        label: 'Objectif',
        data: caRechargeChartData.dataSetObj,
        fill: false,
        backgroundColor: '#dc3030',
        borderColor: '#dc3030',
      },
    ],
  };

  return <Line data={data_} options={options} />;
};

export const LineChartsPrc = ({ selectedWeek, key1, key2, name_1, name_2 }) => {
  //const [week_, year_] = selectedWeek_.split('-');

  const [caRechargeChartData, setCaRechargeChartData] = useState({
    caRechargeArrayData: [],
    dataSetCa: [],
    labelNameCa: '',
    dataSetObj: [],
    labelNameObj: [],
  });

  useEffect(() => {
    if (selectedWeek) {
      const [week_, year_] = selectedWeek.split('-');
      getLinesChartsDataCaRecharge(week_, year_, key1, key2);
    }
  }, [selectedWeek]);

  const getLinesChartsDataCaRecharge = (week_, year_, key1, key2) => {
    getElement(
      'v1/direction-data/4300/prc/weeks' + '/' + week_ + '/' + year_
    ).then((response) => {
      const dmcDataObj = response.data.filter(
        (element) => element.name === key1
      );

      const dmcDataFtth = response.data.filter(
        (element) => element.name === key2
      );

      const newCaRechargeChartData = {
        caRechargeArrayData: dmcDataFtth
          .map((item) => weekNumber(item.week, item.year))
          .reverse(),
        dataSetCa: dmcDataFtth.map((item) => item.value).reverse(),
        dataSetObj: dmcDataObj.map((item) => item.value).reverse(),
        labelNameCa: dmcDataFtth.name,
        labelNameObj: dmcDataObj.name,
      };
      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  // Mapping data
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: name_1,
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#4cc4c4',
        borderColor: '#4cc4c4',
      },
      {
        label: name_2,
        data: caRechargeChartData.dataSetObj,
        fill: false,
        backgroundColor: '#fc8064',
        borderColor: '#fc8064',
      },
    ],
  };

  return selectedWeek ? (
    <Line data={data_} options={options} />
  ) : (
    <div>Loading...</div>
  );
};

export const LineChartsNpsPrc = ({ selectedWeek }) => {
  const [week_, year_] = selectedWeek.split('-');

  const [caRechargeChartData, setCaRechargeChartData] = useState({
    caRechargeArrayData: [],
    dataSetCa: [],
    labelNameCa: '',
    dataSetObj: [],
    labelNameObj: [],
  });

  const getLinesChartsDataCaRecharge = (week_, year_) => {
    getElement(
      'v1/direction-data/gross-add-mobile?week=' + week_ + '&year=' + year_
    ).then((response) => {
      const newCaRechargeChartData = {
        caRechargeArrayData: response.data
          .map((item) => weekNumber(item.week, item.year))
          .reverse(),
        dataSetCa: response.data.map((item) => item.data[0].value).reverse(),
        dataSetObj: response.data.map((item) => item.data[1].value).reverse(),
        labelNameCa: response?.data[0].data[0].name,
        labelNameObj: response?.data[0].data[1].name,
      };

      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  useEffect(() => {
    getLinesChartsDataCaRecharge(week_, year_);
  }, [week_, year_]);

  //Mapping data
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: 'NPS recouvré',
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#4cc4c4',
        borderColor: '#4cc4c4',
      },
      {
        label: 'Objectif',
        data: caRechargeChartData.dataSetObj,
        fill: false,
        backgroundColor: '#fc8064',
        borderColor: '#fc8064',
      },
    ],
  };

  return <Line data={data_} options={options} />;
};

export const LineChartsCAPrc = ({ selectedWeek }) => {
  const [week_, year_] = selectedWeek.split('-');

  const [caRechargeChartData, setCaRechargeChartData] = useState({
    caRechargeArrayData: [],
    dataSetCa: [],
    labelNameCa: '',
    dataSetObj: [],
    labelNameObj: [],
  });

  const getLinesChartsDataCaRecharge = (week_, year_) => {
    getElement(
      'v1/direction-data/gross-add-mobile?week=' + week_ + '&year=' + year_
    ).then((response) => {
      const newCaRechargeChartData = {
        caRechargeArrayData: response.data
          .map((item) => weekNumber(item.week, item.year))
          .reverse(),
        dataSetCa: response.data.map((item) => item.data[0].value).reverse(),
        dataSetObj: response.data.map((item) => item.data[1].value).reverse(),
        labelNameCa: response?.data[0].data[0].name,
        labelNameObj: response?.data[0].data[1].name,
      };

      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  useEffect(() => {
    getLinesChartsDataCaRecharge(week_, year_);
  }, [week_, year_]);

  //Mapping data
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: 'CA recouvré',
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#4cc4c4',
        borderColor: '#4cc4c4',
      },
      {
        label: 'Objectif',
        data: caRechargeChartData.dataSetObj,
        fill: false,
        backgroundColor: '#fc8064',
        borderColor: '#fc8064',
      },
    ],
  };

  return <Line data={data_} options={options} />;
};

export const LineChartsFibreDv = ({ selectedWeek }) => {
  const [week_, year_] = selectedWeek.split('-');

  const [caRechargeChartData, setCaRechargeChartData] = useState({
    caRechargeArrayData: [],
    dataSetCa: [],
    labelNameCa: '',
    dataSetObj: [],
    labelNameObj: [],
  });

  const getLinesChartsDataCaRecharge = (week_, year_) => {
    getElement(
      'v1/direction-data/gross-add-fibre?week=' + week_ + '&year=' + year_
    ).then((response) => {
      const newCaRechargeChartData = {
        caRechargeArrayData: response.data
          .map((item) => weekNumber(item.week, item.year))
          .reverse(),
        dataSetCa: response.data.map((item) => item.data[0].value).reverse(),
        dataSetObj: response.data.map((item) => item.data[1].value).reverse(),
        labelNameCa: response?.data[0].data[0].name,
        labelNameObj: response?.data[0].data[1].name,
      };

      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  useEffect(() => {
    getLinesChartsDataCaRecharge(week_, year_);
  }, [week_, year_]);

  //Mapping data
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: 'Fibre',
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#38c172',
        borderColor: '#38c172',
      },
      {
        label: 'Objectif',
        data: caRechargeChartData.dataSetObj,
        fill: false,
        backgroundColor: '#dc3030',
        borderColor: '#dc3030',
      },
    ],
  };

  return <Line data={data_} options={options} />;
};

export const LineChartsOMDv = ({ selectedWeek }) => {
  const [week_, year_] = selectedWeek.split('-');

  const [caRechargeChartData, setCaRechargeChartData] = useState({
    caRechargeArrayData: [],
    dataSetCa: [],
    labelNameCa: '',
    dataSetObj: [],
    labelNameObj: [],
  });

  const getLinesChartsDataCaRecharge = (week_, year_) => {
    getElement(
      'v1/direction-data/gross-add-om?week=' + week_ + '&year=' + year_
    ).then((response) => {
      const newCaRechargeChartData = {
        caRechargeArrayData: response.data
          .map((item) => weekNumber(item.week, item.year))
          .reverse(),
        dataSetCa: response.data.map((item) => item.data[0].value).reverse(),
        dataSetObj: response.data.map((item) => item.data[1].value).reverse(),
        labelNameCa: response?.data[0].data[0].name,
        labelNameObj: response?.data[0].data[1].name,
      };

      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  useEffect(() => {
    getLinesChartsDataCaRecharge(week_, year_);
  }, [week_, year_]);

  //Mapping data
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: 'OM',
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#38c172',
        borderColor: '#38c172',
      },
      {
        label: 'Objectif',
        data: caRechargeChartData.dataSetObj,
        fill: false,
        backgroundColor: '#dc3030',
        borderColor: '#dc3030',
      },
    ],
  };

  return <Line data={data_} options={options} />;
};

export const LineChartsMobileDsi = ({ selectedWeek }) => {
  const [week_, year_] = selectedWeek.split('-');

  const [caRechargeChartData, setCaRechargeChartData] = useState({
    caRechargeArrayData: [],
    dataSetCa: [],
    labelNameCa: '',
    dataSetObj: [],
    labelNameObj: [],
  });

  const getLinesChartsDataCaRecharge = (week_, year_) => {
    getElement(
      'v1/direction-data/gross-add-mobile?week=' + week_ + '&year=' + year_
    ).then((response) => {
      const newCaRechargeChartData = {
        caRechargeArrayData: response.data
          .map((item) => weekNumber(item.week, item.year))
          .reverse(),
        dataSetCa: response.data.map((item) => item.data[0].value).reverse(),
        dataSetObj: response.data.map((item) => item.data[1].value).reverse(),
        labelNameCa: response?.data[0].data[0].name,
        labelNameObj: response?.data[0].data[1].name,
      };

      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  useEffect(() => {
    getLinesChartsDataCaRecharge(week_, year_);
  }, [week_, year_]);

  //Mapping data
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: 'Mobile',
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#38c172',
        borderColor: '#38c172',
      },
      {
        label: 'Objectif',
        data: caRechargeChartData.dataSetObj,
        fill: false,
        backgroundColor: '#dc3030',
        borderColor: '#dc3030',
      },
    ],
  };

  return <Line data={data_} options={options} />;
};

export const GlobalLineChartsDsi = ({ selectedWeek, name_, key_ }) => {
  const [week_, year_] = selectedWeek.split('-');
  const { dsi } = direction;

  const [dataChart, setDataChart] = useState({
    arrayData: [],
    dataSetCa: [],
    labelNameCa: '',
  });

  const getLinesChartsData = (week_, year_) => {
    const params = '/' + 'weeks' + '/' + week_ + '/' + year_;
    getElement('v1/direction-data/' + dsi.id + params).then((response) => {
      const globalData = response.data.filter(
        (element) => element.name === key_
      );

      if (globalData.length > 0) {
        const newChartData = {
          arrayData: globalData
            .map((item) => weekNumber(item.week, item.year))
            .reverse(),
          dataSetGlobal: globalData.map((item) => item.value).reverse(),
          labelNameCa: globalData.map((item) => item.name),
        };

        setDataChart(newChartData);
      }
    });
  };

  useEffect(() => {
    getLinesChartsData(week_, year_);
  }, [week_, year_]);

  //Mapping data
  const data_ = {
    labels: dataChart.arrayData,
    datasets: [
      {
        label: name_,
        data: dataChart.dataSetGlobal,
        fill: false,
        backgroundColor: '#4cc4c4',
        borderColor: '#4cc4c4',
      },
    ],
  };

  return <Line data={data_} options={options} />;
};

export const LineChartsFibreDsi = ({ selectedWeek }) => {
  const [week_, year_] = selectedWeek.split('-');

  const [caRechargeChartData, setCaRechargeChartData] = useState({
    caRechargeArrayData: [],
    dataSetCa: [],
    labelNameCa: '',
    dataSetObj: [],
    labelNameObj: [],
  });

  const getLinesChartsDataCaRecharge = (week_, year_) => {
    getElement(
      'v1/direction-data/gross-add-fibre?week=' + week_ + '&year=' + year_
    ).then((response) => {
      const newCaRechargeChartData = {
        caRechargeArrayData: response.data
          .map((item) => weekNumber(item.week, item.year))
          .reverse(),
        dataSetCa: response.data.map((item) => item.data[0].value).reverse(),
        dataSetObj: response.data.map((item) => item.data[1].value).reverse(),
        labelNameCa: response?.data[0].data[0].name,
        labelNameObj: response?.data[0].data[1].name,
      };

      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  useEffect(() => {
    getLinesChartsDataCaRecharge(week_, year_);
  }, [week_, year_]);

  //Mapping data
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: 'Fibre',
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#38c172',
        borderColor: '#38c172',
      },
      {
        label: 'Objectif',
        data: caRechargeChartData.dataSetObj,
        fill: false,
        backgroundColor: '#dc3030',
        borderColor: '#dc3030',
      },
    ],
  };

  return <Line data={data_} options={options} />;
};
