import { ArcElement, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data_drj = {
  labels: ['Envoyé', 'En cours', 'Soldé'],
  datasets: [
    {
      data: [24, 6, 9],
      backgroundColor: ['#5fcc81', '#fc8064', '#34a4ec'],
    },
  ],
};

const data_drj_seond = {
  labels: ['Envoyé', 'En cours', 'Soldé', 'En validation'],
  datasets: [
    {
      data: [24, 6, 9, 10],
      backgroundColor: ['#5fcc81', '#fc8064', '#34a4ec', '#fccc54'],
    },
  ],
};

const data = {
  labels: [
    'Ibou',
    'Chatbot',
    'E-annuaire',
    'Evitement Self.',
    'Orange Money',
    'Portail',
  ],
  datasets: [
    {
      data: [24, 6, 9, 12, 16, 6],
      backgroundColor: [
        '#fc8064',
        '#4cc4c4',
        '#cdcdce',
        '#fccc54',
        '#34a4ec',
        '#9c64fc',
      ],
    },
  ],
};

const options_dst = {
  layout: {
    padding: {
      right: 0,
      left: 10,
      top: 0,
      bottom: 0,
    },
  },

  Legend: {
    display: true,
  },
  responsive: true,

  plugins: {
    legend: {
      display: true,
      position: 'left',
      align: 'center',
      labels: {
        color: '#666',
        usePointStyle: true,
        pointStyle: function (context) {
          return 'rectRounded';
        },
        boxHeight: 8,
        boxWidth: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#666',
        useBorderRadius: true,
        borderRadius: 2,
      },
    },
    title: {
      display: true,
      text: 'Répartition du nombre de kits vendus par offre',
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
    },
  },
};

const options = {
  layout: {
    padding: {
      right: 0,
      left: 0,
      top: 10,
      bottom: 40,
    },
  },

  Legend: {
    display: true,
  },
  responsive: true,

  plugins: {
    title: {
      display: true,
      text: 'Pourcentage budgétaire',
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
    legend: {
      display: true,
      position: 'right',
      align: 'center',
      labels: {
        color: '#666',
        usePointStyle: true,
        pointStyle: function (context) {
          return 'rectRounded';
        },
        boxHeight: 8,
        boxWidth: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#666',
        useBorderRadius: true,
        borderRadius: 2,
      },
    },
    datalabels: {
      display: false,
    },
  },
};

const options2 = {
  layout: {
    padding: {
      right: 0,
      left: 0,
      top: 10,
      bottom: 40,
    },
  },

  Legend: {
    display: true,
  },
  responsive: true,

  plugins: {
    title: {
      display: true,
      text: 'Pourcentage Indice SN',
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
    legend: {
      display: true,
      position: 'right',
      align: 'center',
      labels: {
        color: '#666',
        usePointStyle: true,
        pointStyle: function (context) {
          return 'rectRounded';
        },
        boxHeight: 8,
        boxWidth: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#666',
        useBorderRadius: true,
        borderRadius: 2,
      },
    },
    datalabels: {
      display: false,
    },
  },
};

const options_drj = {
  layout: {
    padding: {
      right: 0,
      left: 0,
      top: 0,
      bottom: 30,
    },
  },

  Legend: {
    display: true,
  },
  responsive: true,

  plugins: {
    title: {
      display: false,
      text: 'Mix par Canal digital',
      padding: {
        bottom: 0,
        top: 10,
        left: 0,
        right: 10,
      },
      color: '#666666',
      font: {
        size: 14,
        style: 'normal',
        weight: '400',
      },
      align: 'start',
    },
    legend: {
      display: true,
      position: 'right',
      align: 'center',
      labels: {
        color: '#666',
        usePointStyle: true,
        pointStyle: function (context) {
          return 'rectRounded';
        },
        boxHeight: 10,
        boxWidth: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: '#666',
        useBorderRadius: true,
        borderRadius: 2,
      },
    },
    datalabels: {
      display: true,
      color: '#000000',
      font: {
        size: 16,
        style: 'normal',
        weight: '400',
      },
    },
  },
};

const options_drj_second = {
  layout: {
    padding: {
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
    },
  },

  Legend: {
    display: true,
  },
  responsive: true,

  plugins: {
    title: {
      display: false,
      text: 'Mix par Canal digital',
      padding: {
        bottom: 0,
        top: 10,
        left: 0,
        right: 10,
      },
      color: '#666666',
      font: {
        size: 16,
        style: 'bold',
        weight: '700',
      },
      align: 'start',
    },
    legend: {
      display: true,
      position: 'right',
      align: 'center',
      labels: {
        color: '#666',
        usePointStyle: true,
        pointStyle: function (context) {
          return 'rectRounded';
        },
        boxHeight: 10,
        boxWidth: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: '#666',
        useBorderRadius: true,
        borderRadius: 2,
      },
    },
    datalabels: {
      display: true,
      color: '#000000',
      font: {
        size: 16,
        style: 'normal',
        weight: '400',
      },
    },
  },
};

export const PieCharts = ({ chartData }) => {
  return <Pie data={chartData} options={options} />;
};

export const PieCharts2 = ({ chartData }) => {
  return <Pie data={chartData} options={options2} />;
};

export const PieChartsDst = ({ chartData }) => {
  return <Pie data={chartData} options={options_dst} />;
};

export const PieCharts_drj = () => (
  <Pie data={data_drj} options={options_drj} />
);

export const PieCharts_drj_second = () => (
  <Pie data={data_drj_seond} options={options_drj_second} />
);
