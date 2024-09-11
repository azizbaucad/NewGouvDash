import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { position } from '@chakra-ui/react';
import { color } from 'framer-motion';
import { BsBorderWidth } from 'react-icons/bs';
import { getElement, createElement } from 'pages/api/global';
import { formatNumber, weekNumber } from '@utils/formater';
import { DataUnavailable } from '@components/common/data_unavailable';
import { titles } from '@theme';

ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title
);

export const options2 = {
  layout: {
    padding: {
      left: 0,
      right: 30,
      top: 0,
      bottom: 0,
    },
  },
  maintainAspectRatio: false,
  indexAxis: 'y',
  elements: {
    bar: {
      display: false,
    },
  },
  Legend: {
    display: false,
    labels: 'Legend',
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: 'Pourcentage indice BES',
      padding: {
        top: 0,
        bottom: 30,
      },
      color: '#666666',
      font: {
        size: 14,
        style: 'normal',
        weight: '500',
      },
      align: 'start',
    },
    datalabels: {
      display: true,
      color: '#000',
      align: 'end',
      anchor: 'end',
      labels: {
        title: {
          font: {
            weight: 'bold',
            size: '12',
          },
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        display: false,
      },
      border: {
        display: false,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    y: {
      ticks: {
        display: true,
      },
      border: {
        display: false,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
  },
};

export const options = {
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 10,
      bottom: 0,
    },
  },
  maintainAspectRatio: false,
  indexAxis: 'x',
  elements: {
    bar: {
      display: false,
    },
  },
  Legend: {
    display: false,
    labels: 'Legend',
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Pourcentage du Nbre. de visites',
      padding: {
        top: 0,
        bottom: 30,
      },
      color: '#666666',
      font: {
        size: 14,
        style: 'normal',
        weight: '500',
      },
      align: 'start',
    },
    datalabels: {
      display: true,
      color: '#000',
      align: 'end',
      anchor: 'end',
      labels: {
        title: {
          font: {
            weight: 'bold',
            size: '12',
          },
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        display: false,
      },
      border: {
        display: false,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    y: {
      ticks: {
        display: true,
      },
      border: {
        display: false,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
  },
};

export const backgroundColors = ['#ff903d', '#4bc0c0', '#36a2eb', '#c9cbcf'];

export const options_verticalBar = {
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
  maintainAspectRatio: false,
  indexAxis: 'x',
  elements: {
    bar: {
      display: true,
      barPercentage: 1,
      categoryPercentage: 0.5,
    },
  },
  Legend: {
    display: false,
    labels: 'Legend',
  },
  responsive: true,
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
        padding: 8,
        borderWidth: 1,
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
    title: {
      display: false,
      text: 'Evolution du nombre de ventes par semaine',
      padding: {
        top: 10,
        bottom: 10,
      },
      color: '#666666',
      font: {
        size: 14,
        style: 'normal',
        weight: '500',
      },
      align: 'start',
    },
    datalabels: {
      display: false,
      color: '#000',
      align: 'end',
      anchor: 'end',
      labels: {
        title: {
          font: {
            weight: 'bold',
            size: '12',
          },
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        display: true,
      },
      border: {
        display: true,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    y: {
      ticks: {
        display: true,
        callback: formatNumber,
      },
      border: {
        display: true,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
  },
};

export const HorizontalBarChart = ({ chartData }) => {
  return <Bar options={options} data={chartData} />;
};

export const HorizontalBarChart2 = ({ chartData }) => {
  return <Bar options={options2} data={chartData} />;
};

export const VerticalBarChart = ({ chartData }) => {
  return <Bar options={options_verticalBar} data={chartData} />;
};

export const VerticalBarChartDmc = ({ selectedWeek }) => {
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
      getLinesChartsDataCaRecharge(week_, year_);
    }
  }, [selectedWeek]);

  const getLinesChartsDataCaRecharge = (week_, year_) => {
    getElement(
      'v1/direction-data/4300/dmc/weeks' + '/' + week_ + '/' + year_
    ).then((response) => {
      const prcVentes = response.data.filter(
        (element) => element.name === 'FTTH '
      );
      const prcResiliations = response.data.filter(
        (element) => element.name === 'OBJ PARC FTTH'
      );

      const newCaRechargeChartData = {
        caRechargeArrayData: prcResiliations
          .map((item) => weekNumber(item.week, item.year))
          .reverse(),
        dataSetCa: prcResiliations.map((item) => item.value).reverse(),
        dataSetObj: prcVentes.map((item) => item.value).reverse(),
        labelNameCa: prcResiliations.name,
        labelNameObj: prcVentes.name,
      };
      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  // Mapping data
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: 'Parc FTTH',
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#4cc4c4',
        borderColor: '#4cc4c4',
        barPercentage: 0.5, // Ajustez cette valeur pour la largeur des barres
        categoryPercentage: 0.5,
      },
      {
        label: 'Objectif',
        data: caRechargeChartData.dataSetObj,
        fill: false,
        backgroundColor: '#fc8064',
        borderColor: '#fc8064',
        barPercentage: 0.5, // Ajustez cette valeur pour la largeur des barres
        categoryPercentage: 0.5,
      },
    ],
  };

  if (caRechargeChartData.dataSetCa.length === 0) {
    return (
      <DataUnavailable
        message={titles.title.label.dataunavailable}
        marginTop={8}
        paddingY={8}
        SizeIcon={40}
      />
    );
  }

  return selectedWeek ? (
    <Bar data={data_} options={options_verticalBar} />
  ) : (
    <div>Loading...</div>
  );
};

export const VerticalBarChartDst = ({ selectedWeek }) => {
  const [caRechargeChartData, setCaRechargeChartData] = useState({
    caRechargeArrayData: [],
    dataSetCa: [],
    labelNameCa: '',
  });

  useEffect(() => {
    if (selectedWeek) {
      const [week_, year_] = selectedWeek.split('-');
      getLinesChartsDataCaRecharge(week_, year_);
    }
  }, [selectedWeek]);

  const getLinesChartsDataCaRecharge = (week_, year_) => {
    //Integrate Url and params
    const params = '/' + week_ + '/' + year_;
    const url = 'v1/direction-data/filter/4200' + params;
    const requestData = {
      tag: 'kpi_commerciaux_global',
      name: 'nombre_nouveaux_kits_vendu',
      historicLength: 6,
    };

    createElement(url, requestData).then((response) => {
      const dstDataVentes = response.data.filter(
        (element) => element.name === 'nombre_nouveaux_kits_vendu'
      );

      const newCaRechargeChartData = {
        caRechargeArrayData: dstDataVentes
          .map((item) => weekNumber(item.week, item.year))
          .reverse(),
        dataSetCa: dstDataVentes.map((item) => item.value).reverse(),
        //dataSetObj: dmcDataObj.map((item) => item.value).reverse(),
        labelNameCa: dstDataVentes.name,
        //labelNameObj: dmcDataObj.name,
      };
      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  // Mapping data
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: 'Ventes',
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#4cc4c4',
        borderColor: '#4cc4c4',
        barPercentage: 0.5, // Ajustez cette valeur pour la largeur des barres
        categoryPercentage: 0.5,
      } /* 
      {
        label: 'Objectif',
        data: caRechargeChartData.dataSetObj,
        fill: false,
        backgroundColor: '#fc8064',
        borderColor: '#fc8064',
        barPercentage: 0.5, // Ajustez cette valeur pour la largeur des barres
        categoryPercentage: 0.5,
      }, */,
    ],
  };

  if (caRechargeChartData.dataSetCa.length === 0) {
    return (
      <DataUnavailable
        message={titles.title.label.dataunavailable}
        marginTop={8}
        paddingY={8}
        SizeIcon={40}
      />
    );
  }

  return selectedWeek ? (
    <Bar data={data_} options={options_verticalBar} />
  ) : (
    <div>Loading...</div>
  );
};

export const VerticalBarChartVentesVsResiliations = ({ selectedWeek }) => {
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
      getLinesChartsDataCaRecharge(week_, year_);
    }
  }, [selectedWeek]);

  const getLinesChartsDataCaRecharge = (week_, year_) => {
    getElement(
      'v1/direction-data/4300/dmc/weeks' + '/' + week_ + '/' + year_
    ).then((response) => {
      const prcVentes = response.data.filter(
        (element) => element.name === 'VENTES FTTH'
      );

      const prcResiliations = response.data.filter(
        (element) => element.name === 'RESILIATIONS FTTH'
      );

      const newCaRechargeChartData = {
        caRechargeArrayData: prcResiliations
          .map((item) => weekNumber(item.week, item.year))
          .reverse(),
        dataSetCa: prcResiliations.map((item) => item.value).reverse(),
        dataSetObj: prcVentes.map((item) => item.value).reverse(),
        labelNameCa: prcResiliations.name,
        labelNameObj: prcVentes.name,
      };
      setCaRechargeChartData(newCaRechargeChartData);
    });
  };

  // Mapping data
  const data_ = {
    labels: caRechargeChartData.caRechargeArrayData,
    datasets: [
      {
        label: 'Ventes',
        data: caRechargeChartData.dataSetCa,
        fill: false,
        backgroundColor: '#4cc4c4',
        borderColor: '#4cc4c4',
        barPercentage: 0.5, // Ajustez cette valeur pour la largeur des barres
        categoryPercentage: 0.5,
      },
      {
        label: 'Résiliations',
        data: caRechargeChartData.dataSetObj,
        fill: false,
        backgroundColor: '#fc8064',
        borderColor: '#fc8064',
        barPercentage: 0.5, // Ajustez cette valeur pour la largeur des barres
        categoryPercentage: 0.5,
      },
    ],
  };

  if (caRechargeChartData.dataSetCa.length === 0) {
    return (
      <DataUnavailable
        message={titles.title.label.dataunavailable}
        marginTop={8}
        paddingY={8}
        SizeIcon={40}
      />
    );
  }

  return selectedWeek ? (
    <Bar data={data_} options={options_verticalBar} />
  ) : (
    <div>Loading...</div>
  );
};
