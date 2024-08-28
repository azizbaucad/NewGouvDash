import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
} from 'chart.js';
import { getElement } from 'pages/api/global';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  abreviateNumber,
  formatNumber,
  numberMonthToName,
  weekNumber,
} from '@utils/formater';

ChartJS.register(Legend, CategoryScale, LinearScale, PointElement, LineElement);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },

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
        padding: 10,
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

export const fetchData = async (
  endpoint,
  dataIndex0,
  dataIndex1,
  dataIndex2
) => {
  try {
    const response = await getElement(endpoint);

    const month = response.data.map((item) => item.month);

    let caRechargeArrayData, dataSetCa, dataSetObj, dataSet3;
    if (month == []) {
      caRechargeArrayData = response.data

        .map((item) => numberMonthToName(item.month, item.year))
        .reverse();
      dataSetCa = response.data
        .map((item) => item.data[dataIndex0].value)
        .reverse();
      dataSetObj = response.data
        .map((item) => item.data[dataIndex1].value)
        .reverse();
      dataSet3 = response.data
        .map((item) => item.data[dataIndex2].value)
        .reverse();
    } else {
      (caRechargeArrayData = response.data
        .map((item) => weekNumber(item.week, item.year))
        .reverse()),
        (dataSetCa = response.data
          .map((item) => item.data[dataIndex1].value)
          .reverse()),
        (dataSetObj = response.data
          .map((item) => item.data[dataIndex2].value)
          .reverse()),
        (dataSet3 = response.data
          .map((item) => item.data[dataIndex0].value)
          .reverse());
    }
    return {
      caRechargeArrayData,
      dataSetCa,
      dataSetObj,
      dataSet3,
      lenghtArray: response.data.length,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      caRechargeArrayData: [],
      dataSetCa: [],
      dataSetObj: [],
      dataSet3: [],
      lenghtArray: 0,
    };
  }
};

export const LineChartRefactoring = (props) => {
  const {
    selectedWeek,
    title,
    title_,
    title3,
    bgColorDs1,
    bdColorDs1,
    bgColorDs2,
    bdColorDs2,
    bgColorDs3,
    bdColorDs3,
  } = props;

  const [week_, year_] = selectedWeek.split('-');

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: title,
        data: [],
        fill: false,
        backgroundColor: bgColorDs1,
        borderColor: bdColorDs1,
      },
      {
        label: title_,
        data: [],
        fill: false,
        backgroundColor: bgColorDs2,
        borderColor: bdColorDs2,
      },
      {
        label: title3,
        data: [],
        fill: false,
        backgroundColor: bgColorDs3,
        borderColor: bdColorDs3,
      },
    ],
  });

  useEffect(() => {
    fetchData(
      'v1/direction-data/data-evolution-Ca-OFMS?week=' +
        week_ +
        '&year=' +
        year_,
      0,
      1,
      2
    ).then((data) => {
      setChartData({
        ...chartData,
        labels: data.caRechargeArrayData,
        datasets: [
          {
            ...chartData.datasets[0],
            data: data.dataSetCa,
            label: title,
          },
          {
            ...chartData.datasets[1],
            data: data.dataSetObj,
            label: title_,
          },
          {
            ...chartData.datasets[2],
            data: data.dataSet3,
            label: title3,
          },
        ],
      });
    });
  }, [week_, year_]);

  return <Line data={chartData} options={options} />;
};
