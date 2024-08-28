import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';
import { layout } from '@chakra-ui/react';
import { color } from 'framer-motion';
import { createElement } from 'pages/api/global';
import { titles } from '@theme';
import { DataUnavailable } from '@components/common/data_unavailable';

ChartJS.register(Tooltip, Legend, TreemapController, TreemapElement);

export const TreeMapChartDstV2 = ({ selectedWeek }) => {
  const [data, setData] = useState({ datasets: [] });
  const [dataTree, setDataTree] = useState([]);

  const getData = (week_, year_) => {
    const params = '/' + week_ + '/' + year_;
    const url = 'v1/direction-data/filter/4200' + params;
    const requestData = {
      tag: 'commerciaux_region',
      name: 'nombre_nouveaux_kits_vendu',
      historicLength: 1,
    };

    createElement(url, requestData).then((res) => {
      // Transformer les données
      const transformedData = res.data.map((item) => {
        // Extraire le nom de la région
        const regionName = item.name.replace('nombre_nouveaux_kits_vendu_', '');

        return {
          category:
            regionName.charAt(0).toUpperCase() +
            regionName.slice(1).toLowerCase(),
          value: item.value,
        };
      });

      setDataTree(transformedData);
    });
  };

  useEffect(() => {
    if (selectedWeek) {
      const [week_, year_] = selectedWeek.split('-');
      getData(week_, year_);
    }
  }, [selectedWeek]);

  useEffect(() => {
    const newData = {
      datasets: [
        {
          label: 'Treemap Chart Sales',
          tree: dataTree,
          key: 'value',
          groups: ['category'],
          borderColor: 'white',
          borderWidth: 0.1,
          spacing: 0,
          backgroundColor: '#4cc4c4',
          borderRadius: 0,
          labels: {
            display: true,
            color: '#fff',
            font: {
              size: 12,
              style: 'normal',
              weight: 600,
              textTransform: 'lowercase',
            },
          },
        },
      ],
    };

    setData(newData);
  }, [dataTree]); // Dépendre de dataTree, pas de selectedWeek

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
    plugins: {
      legend: {
        display: false,
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
      title: {
        display: true,
        text: 'Répartition du nombre de kits vendus par région',
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
        labels: {
          display: true,
        },
      },
    },
  };

  // Afficher le composant DataUnavailable si les données ne sont pas disponibles

  if (dataTree.length === 0) {
    return (
      <DataUnavailable
        message={titles.title.label.dataunavailable}
        marginTop={8}
        paddingY={8}
        SizeIcon={40}
      />
    );
  }

  return <Chart type="treemap" data={data} options={options} />;
};
