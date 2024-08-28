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
//import { fetchData } from 'next-auth/client/_utils';
import { fetchData } from '../linechart_refactoring';
import title from 'theme/title';
import { getElement } from 'pages/api/global';
import { formatNumber, numberMonthToName, weekNumber } from '@utils/formater';

ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title
);

export const options = {
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 20,
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
      display: true,
      text: 'Mix CA',
      padding: {
        bottom: 10,
      },
      font: {
        size: 14,
        style: 'normal',
        weight: 'normal',
      },
      align: 'start',
      position: 'top',
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    x: {
      stacked: true,
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
    y: {
      stacked: true,
      ticks: {
        display: true,
        callback: formatNumber,
      },
      border: {
        display: false,
      },
      grid: {
        color: 'rgb(0, 0, 0, 0.03)',
      },
    },
  },
};

export const fetchDataOfms = async (
  endpoint,
  dataIndex0,
  dataIndex1,
  dataIndex2,
  dataIndex3,
  dataIndex4
) => {
  try {
    const response = await getElement(endpoint);
    let caRechargeArrayData,
      dataSetCa,
      dataSetObj,
      dataSet2,
      dataSet3,
      dataSet4;
    (caRechargeArrayData = response.data
      .map((item) => weekNumber(item.week, item.year))
      .reverse()),
      (dataSetCa = response.data
        .map((item) => item.data[dataIndex0].value)
        .reverse()),
      (dataSetObj = response.data
        .map((item) => item.data[dataIndex1].value)
        .reverse()),
      (dataSet2 = response.data
        .map((item) => item.data[dataIndex2].value)
        .reverse()),
      (dataSet3 = response.data
        .map((item) => item.data[dataIndex3].value)
        .reverse()),
      (dataSet4 = response.data
        .map((item) => item.data[dataIndex4].value)
        .reverse());

    return {
      caRechargeArrayData,
      dataSetCa,
      dataSetObj,
      dataSet2,
      dataSet3,
      dataSet4,
      lenghtArray: response.data.length,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      caRechargeArrayData: [],
      dataSetCa: [],
      dataSetObj: [],
      dataSet2: [],
      dataSet3: [],
      dataSet4: [],
      lenghtArray: 0,
    };
  }
};

export const RefactoringStackedBarChart = ({ selectedWeek }) => {
  const [week_, year_] = selectedWeek.split('-');

  const barThickness = 25;
  const barPercentage = 0.5;

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        fill: false,
      },
      {
        label: '',
        data: [],
        fill: false,
      },
      {
        label: '',
        data: [],
        fill: false,
      },
      {
        label: '',
        data: [],
        fill: false,
      },
      {
        label: '',
        data: [],
        fill: false,
      },
    ],
  });
  useEffect(() => {
    fetchDataOfms(
      'v1/direction-data/data-MixCa-OFMS?week=' + week_ + '&year=' + year_,
      0,
      1,
      2,
      3,
      4
    ).then((data) => {
      setChartData({
        ...chartData,
        labels: data.caRechargeArrayData,
        datasets: [
          {
            ...chartData.datasets[0],
            data: data.dataSetCa,
            label: 'Transfert',
            backgroundColor: '#4cc4c4',
            barThickness,
            barPercentage,
          },
          {
            ...chartData.datasets[1],
            data: data.dataSetObj,
            label: 'Telco',
            backgroundColor: '#fc8064',
            barThickness,
            barPercentage,
          },
          {
            ...chartData.datasets[2],
            data: data.dataSet2,
            label: 'Services Financiers',
            backgroundColor: '#fccc54',
            barThickness,
            barPercentage,
          },
          {
            ...chartData.datasets[3],
            data: data.dataSet3,
            label: 'B2B',
            backgroundColor: '#34a4ec',
            barThickness,
            barPercentage,
          },
          {
            ...chartData.datasets[4],
            data: data.dataSet4,
            label: 'International',
            backgroundColor: '#9c64fc',
            barThickness,
            barPercentage,
          },
        ],
      });
    });
  }, [week_, year_]);

  return <Bar options={options} data={chartData} />;
};
