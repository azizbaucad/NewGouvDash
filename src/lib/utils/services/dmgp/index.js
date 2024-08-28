/* import { HorizontalBarChart } from "@components/common/charts/barcharts";
import { getElement } from "pages/api/global";
import { useEffect, useState } from "react"
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

ChartJS.register(
    ChartDataLabels,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Title
);

export const getDmgpdata = (token, week, year, bg, data_) => {

    const options = {
        layout: {
            padding: {
                left: 0,
                right: 60,
                top: 10,
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
                display: true,
                text: 'Répartition CA (en %)',
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

    const [data, setData] = useState({
        OM: null,
        seddo: null,
        wave: null,
        another: null,
    })

    useEffect(() => {
        getChartDmgpData();
    }, []); //Doit inclure week [week, year]

    const getChartDmgpData = () => {

        getElement(`v1/direction-data/dataDmgp?week=${week}&year=${year}`)
            .then((res) => {
                console.log("res data form dmgp", res);
                setData({
                    OM: res.data.caMobileDto.pourcentageCaOrangeMoney,
                    seddo: res.data.caMobileDto.pourcentageCaSeddo,
                    wave: res.data.caMobileDto.pourcentageCaWave,
                    another: res.data.caMobileDto.pourcentageCaAutre,
                });
                const res_data_om = res.data.caMobileDto;
                console.log('Res data OM ...', res_data_om);
            })
            .catch((error) => {
                console.log('_______ERROR________', error);
            })
            return data
    }

    return data

} */
