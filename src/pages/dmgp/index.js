import {
  HightlightContent,
  HightlightHeader,
} from '@components/common/data/hightlight';
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Select,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ValuesData } from '@components/common/data/values';
import { TagTitle } from '@components/common/title';
import { DashboardLayout } from '@components/layout/dashboard';
import { gird, hightlightStatus, titles, colors, direction } from '@theme';
import { getToken } from 'next-auth/jwt';
import { BsPlusLg } from 'react-icons/bs';
import { PageTitle } from '@components/common/title/page';
import { IconedButton } from '@components/common/button';
import { HorizontalBarChart, HorizontalBarChart2 } from '@components/common/charts/barcharts';
import { scroll_customize } from '@components/common/styleprops';
import {
  LineCharts,
  LineChartsCAFixe,
  LineChartsParcMobile,
  LineChartsParcOM,
} from '@components/common/charts/linecharts';
import { ListSemaineItem } from '@components/common/dropdown_item';
import { TabsPanelItem } from '@components/common/tabs';
import {
  DefaultHighlightstatus,
  highlightStatusStyle,
} from '@utils/schemas/src/highlight';
import { useEffect, useState } from 'react';
import {
  getHightlightData,
  getHightlightStatus,
} from '@utils/services/hightlight/data';
import { HighlightModal } from '@components/common/modal/highlight';
import moment from 'moment';
import { getCurrentWeek, getLastWeek } from '@utils/services/date';
import { createElement, getElement } from 'pages/api/global';
import {
  abreviateNumberWithXof,
  abreviateNumberWithXofWithBadge,
  abreviateNumberWithoutXof,
  abreviateNumberWithoutXofWithBadge,
  formaterNumber,
  formaterNumberWithBadge,
  numberWithBadge,
  valueGetZero,
} from '@utils/formater';

import { Tooltip } from 'react-tooltip';
import { DMenuButton } from '@components/common/menu_button';
import { FaCheck, FaCopy } from 'react-icons/fa';
import { ValidationModal } from '@components/common/modal/week_validator';
import { CopyHighlightModal } from '@components/common/modal/highlight/copy/index.';
import { DataUnavailable } from '@components/common/data_unavailable';
import { PieCharts, PieCharts2 } from '@components/common/charts/piecharts';

export default function DmgpPage(props) {
  const gstyle = gird.style;
  const { dmgp } = direction;
  const {
    onOpen: onOpenFm,
    isOpen: isOpenFm,
    onClose: onCloseFm,
  } = useDisclosure();
  const {
    onOpen: onOpenVal,
    isOpen: isOpenVal,
    onClose: onCloseVal,
  } = useDisclosure();
  const {
    onOpen: onCopyOpen,
    isOpen: isCopyOpen,
    onClose: onCopyClose,
  } = useDisclosure();

  const [highlights, setHighlights] = useState();
  const [highlightStatus, setHighlightStatus] = useState();
  const [currentWeekList, setCurrentWeekList] = useState();
  const [selectedHighlight, setSelectedHighlight] = useState();
  const [error, setError] = useState();
  const [role, setRole] = useState();

  const { realizes, difficults, challenges, coordinationPoint } =
    hightlightStatus;
  const [selectedStatus, setSelectedStatus] = useState('all');
  const statusList = [realizes, difficults, challenges, coordinationPoint];

  const lastWeek = getLastWeek().week + '-' + getLastWeek().year;
  const [selectedWeek, setSelectedWeek] = useState(lastWeek);

  const initOfmsData = {
    //CaOfms Dto
    caOfmsWeek: null,
    caOfmsWeekVsObjectiveCaOfmsWeek: null,
    variationCaOfmsWeek: null,
    caOfmsMonthToDate: null,
    variationCaOfmsMonthToDate: null,
    caOfmsYear: null,
    variationCaOfmsYear: null,
    //Commissions
    commissionWeek: null,
    variationCommissionWeek: null,
    variationCommissionWeekFour: null,
    commissionMonthToDate: null,
    variationCommissionMonthToDate: null,
    commissionYear: null,
    variationCommissionYear: null,
    //Marges^
    margeWeek: null,
    variationMargeWeek: null,
    variationMargeWeekFour: null,
    margeMonth: null,
    variationMargeMonth: null,
    margeYear: null,
    variationMargeYear: null,
    //Les Parcs
    parcActive: null,
    parcActiveVsObj: null,
    variationParcActiveWeek: null,
    variationParcActiveFourWeek: null,
    parcRegistered: null,
    parcRegisteredVsObj: null,
    variationRegisteredWeek: null,
    variationParcRegisteredFourWeek: null,
  };

  const [dataofms, setDataOfms] = useState(initOfmsData);

  const initData = {
    OM: null,
    seddo: null,
    wave: null,
    another: null,
    //Add Another vars dor values data
    caMobile: null,
    deltaCaMobileVsObj: null,
    variationCaMobile: null,
    //Add Parc Mobile
    parcMobile: null,
    deltaParcVsObj: null,
    variationParcMobile: null,
    //Add Ca Fixe
    caFixe: null,
    deltaCaFixeVsObj: null,
    variationCaFixe: null,
    //Add CA Fibre
    caFibre: null,
    deltaCaFibreVsObj: null,
    variationCaFiber: null,
    //Add  Parc Fixe
    parcFixeCommercial: null,
    deltaParcFixeCommercialVsObj: null,
    variationParcCommercial: null,
    parcFixeFacture: null,
    variationParcFacture: null,
    parcFibreFtthGP: null,
    deltaParcFibreFtthGPVsObj: null,
    variationParcFibreFtthGP: null,
    parcFibreFtthGlobal: null,
    deltaParcFibreFtthGlobalGPVsObj: null,
    variationParcFibreFtthGlobal: null,
    //Add Data Mobile
    caDataMobile: null,
    variationCaDataMobile: null,
    parc4G: null,
    variationParc4G: null,
    percentageTraffic4G: null,
    variationTraffic4G: null,
  };

  const [data, setData] = useState(initData);

  const simulatedData = [
    {
      id: 1,
      title: 'Réunion avec les partenaires internationaux',
      description: 'Discussion sur les projets de coopération en cours.',
      direction: 'Direction Internationale', // Nouvelle propriété pour la direction
      status: { name: 'realizes', label: 'Réalisés' },
      date: '2024-08-01',
    },
    {
      id: 2,
      title: 'Problèmes logistiques',
      description:
        'Difficultés dans la distribution des ressources aux régions éloignées.',
      direction: 'Direction Logistique', // Nouvelle propriété pour la direction
      status: { name: 'difficults', label: 'Difficultés' },
      date: '2024-08-03',
    },
    {
      id: 3,
      title: 'Négociation avec les syndicats',
      description:
        'Enjeu de maintenir la paix sociale dans un contexte de revendications.',
      direction: 'Direction Sociale', // Nouvelle propriété pour la direction
      status: { name: 'challenges', label: 'Enjeux' },
      date: '2024-08-05',
    },
    {
      id: 4,
      title: 'Coordination entre les ministères',
      description:
        'Mise en place d’un plan de coordination pour améliorer l’efficacité gouvernementale.',
      direction: 'Direction Coordination', // Nouvelle propriété pour la direction
      status: { name: 'coordinationPoint', label: 'En cours' },
      date: '2024-08-07',
    },
    {
      id: 5,
      title: 'Réunion avec les partenaires internationaux',
      description: 'Discussion sur les projets de coopération en cours.',
      direction: 'Direction Internationale', // Nouvelle propriété pour la direction
      status: { name: 'realizes', label: 'Réalisés' },
      date: '2024-08-01',
    },
    {
      id: 6,
      title: 'Réunion avec les partenaires internationaux',
      description: 'Discussion sur les projets de coopération en cours.',
      direction: 'Direction Internationale', // Nouvelle propriété pour la direction
      status: { name: 'realizes', label: 'Réalisés' },
      date: '2024-08-01',
    },
    {
      id: 7,
      title: 'Réunion avec les partenaires internationaux',
      description: 'Discussion sur les projets de coopération en cours.',
      direction: 'Direction Internationale', // Nouvelle propriété pour la direction
      status: { name: 'realizes', label: 'Réalisés' },
      date: '2024-08-01',
    },
    {
      id: 8,
      title: 'Réunion avec les partenaires internationaux',
      description: 'Discussion sur les projets de coopération en cours.',
      direction: 'Direction Internationale', // Nouvelle propriété pour la direction
      status: { name: 'realizes', label: 'Réalisés' },
      date: '2024-08-01',
    },
  ];

  const getHightlight = () => {
    // Remplacer l'appel API par des données simulées
    setHighlights(simulatedData);
  };

  //Appel de getDmgpDta

  const getValuesData = () => {
    const params =
      'week=' +
      selectedWeek?.split('-')[0] +
      '&year=' +
      selectedWeek?.split('-')[1];
    getElement('v1/direction-data/dataDmgp?' + params)
      .then((res) => {
        //console.log("res data dmpg", res)
        if (res?.data) {
          setData({
            OM: res.data?.caMobileDto.percentageCaOrangeMoney,
            seddo: res.data?.caMobileDto.percentageCaSeddo,
            wave: res.data?.caMobileDto.percentageCaWave,
            another: res.data?.caMobileDto.percentageCaOther,
            expresso: res.data?.parcMobileDto.pdmExpresso,
            free: res.data?.parcMobileDto.pdmFree,
            orange: res.data?.parcMobileDto.pdmOrange,
            promobile: res.data?.parcMobileDto.pdmPromobile,
            fibre: res.data?.caFixeDto.percentageCaFiber,
            another_offre: res.data?.caFixeDto.percentageOtherOffer,
            caMobile: res.data?.caMobileDto.caMobile,
            deltaCaMobileVsObj: res.data?.caMobileDto.deltaCaMobileVsObj,
            variationCaMobile: res.data?.caMobileDto.variationCaMobile,
            parcMobile: res.data?.parcMobileDto.parcMobile,
            deltaParcVsObj: res.data?.parcMobileDto.deltaParcVsObj,
            variationParcMobile: res.data?.parcMobileDto.variationParcMobile,
            caFixe: res.data?.caFixeDto.caFixe,
            deltaCaFixeVsObj: res.data?.caFixeDto.deltaCaFixeVsObj,
            variationCaFixe: res.data?.caFixeDto.variationCaFixe,
            caFibre: res.data?.caFixeDto.caFibre,
            deltaCaFibreVsObj: res.data?.caFixeDto.deltaCaFibreVsObj,
            variationCaFiber: res.data?.caFixeDto.variationCaFiber,
            parcFixeCommercial: res.data?.parcFixeDto.parcFixeCommercial,
            deltaParcFixeCommercialVsObj:
              res.data?.parcFixeDto.deltaParcFixeCommercialVsObj,
            variationParcCommercial:
              res.data?.parcFixeDto.variationParcCommercial,
            parcFixeFacture: res.data?.parcFixeDto.parcFixeFacture,
            variationParcFacture: res.data?.parcFixeDto.variationParcFacture,
            parcFibreFtthGP: res.data?.parcFixeDto.parcFibreFtthGP,
            deltaParcFibreFtthGPVsObj:
              res.data?.parcFixeDto.deltaParcFibreFtthGPVsObj,
            variationParcFibreFtthGP:
              res.data?.parcFixeDto.variationParcFibreFtthGP,
            parcFibreFtthGlobal: res.data?.parcFixeDto.parcFibreFtthGlobal,
            deltaParcFibreFtthGlobalGPVsObj:
              res.data?.parcFixeDto.deltaParcFibreFtthGlobalGPVsObj,
            variationParcFibreFtthGlobal:
              res.data?.parcFixeDto.variationParcFibreFtthGlobal,
            caDataMobile: res.data?.dataMobileDto.caDataMobile,
            variationCaDataMobile:
              res.data?.dataMobileDto.variationCaDataMobile,
            parc4G: res.data?.dataMobileDto.parc4G,
            variationParc4G: res.data?.dataMobileDto.variationParc4G,
            percentageTraffic4G: res.data?.dataMobileDto.percentageTraffic4G,
            variationTraffic4G: res.data?.dataMobileDto.variationTraffic4G,
          });
        } else {
          setData(initData);
        }
        //console.log('Res data ...', res_data_om)
      })
      .catch((error) => {
        setData(initData);
        console.log(error);
      });
  };

  console.log('Delta Parc Fixe Commercial ...', data.deltaParcFibreFtthGPVsObj);
  //console.log('Data CA Mobile', data.caMobile)

  const DataCaMobile = [
    {
      id: 1,
      part: 'Indice1',
      percent: 10,
    },
    {
      id: 2,
      part: 'Indice2',
      percent: 20,
    },
    {
      id: 3,
      part: 'Indice3',
      percent: 20,
    },
    {
      id: 4,
      part: 'Autres',
      percent: 50,
    },
  ];

  const ParcDataMobile = [
    {
      id: 1,
      part: 'Indice1',
      percent: 30,
    },
    {
      id: 2,
      part: 'Indice2',
      percent: 20,
    },
    {
      id: 3,
      part: 'Indice3',
      percent: 40,
    },
    {
      id: 4,
      part: 'Indice4',
      percent: 10,
    },
  ];

  const CaFixe = [
    {
      id: 1,
      part: 'Fibre',
      percent: data.fibre,
    },
    {
      id: 2,
      part: 'Autres',
      percent: data.another_offre,
    },
  ];




  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRole(sessionStorage.getItem('role'));
    }
    getHightlight();
    getValuesData();
    DataCaMobile;
  }, [selectedWeek]);

  const openHightlightModal = () => {
    getHightlightStatus(null, setHighlightStatus, setError);
    setCurrentWeekList([getCurrentWeek(), getLastWeek()]);
    onOpenFm();
  };

  const backgroundColors = ['#ff903d', '#4bc0c0', '#36a2eb', '#cdd4e0'];
  const data_ = {
    labels: DataCaMobile?.map((item) => item.part),
    datasets: [
      {
        barThickness: DataCaMobile?.map((item) =>
          isNaN(item.percent) ? 0.1 : 18
        ),
        barPercentage: 0,
        label: 'Nbre de vistes',
        data: DataCaMobile?.map((item) =>
          isNaN(item.percent) ? 0.1 : item.percent
        ),
        backgroundColor: ['#4bc0c0', '#4bc0c0', '#4bc0c0', '#4bc0c0'],
      },
    ],
  };

  const data_ParcMobile = {
    labels: ParcDataMobile?.map((item) => item.part),
    datasets: [
      {
        barThickness: ParcDataMobile?.map((item) =>
          isNaN(item.percent) ? 0.1 : 18
        ),
        barPercentage: 0,
        label: 'Pourcentage',
        data: ParcDataMobile?.map((item) =>
          isNaN(item.percent) ? 0.1 : item.percent
        ),
        backgroundColor: ['#4bc0c0', '#329e9e', '#2f8f8f', '#3b8686'],
      },
    ],
  };

  const data_CaFixe = {
    labels: CaFixe?.map((item) => item.part),
    datasets: [
      {
        barThickness: CaFixe?.map((item) => (isNaN(item.percent) ? 0.1 : 18)),
        barPercentage: 0,
        label: 'Part de marché',
        data: CaFixe?.map((item) => (isNaN(item.percent) ? 0.1 : item.percent)),
        backgroundColor: ['#ff903d', '#cdd4e0'],
      },
    ],
  };

  const newHightlight = () => {
    setSelectedHighlight(null);
    openHightlightModal();
  };

  const openHightlight = (highligh) => {
    setSelectedHighlight(highligh);
    openHightlightModal();
  };

  const onDMenuChange = (value) => {
    if (value == 'hightlight') return newHightlight();
    if (value === 'validate') return onOpenVal();
    if (value === 'copy-hightlight') onCopyOpen();
  };

  const displayHighlight = (highligh, i) => (
    <HightlightContent
      key={i}
      title={highligh?.direction?.name + ' • ' + highligh?.title}
      body={highligh?.textHighlight}
      iconBgColor={
        highlightStatusStyle(highligh?.status?.name)?.style.iconColor
      }
      date={moment(highligh?.createdAt).format('DD-MM-YYYY')}
      bgColor={highlightStatusStyle(highligh?.status?.name)?.style.bgColor}
      icon={highlightStatusStyle(highligh?.status?.name)?.icon}
      openHightlight={() => openHightlight(highligh)}
    />
  );

  return (
    <DashboardLayout activeMenu={'account-dmgp'}>
      <HighlightModal
        onOpen={onOpenFm}
        onClose={onCloseFm}
        isOpen={isOpenFm}
        weekListOption={currentWeekList}
        highlightStatus={highlightStatus}
        getHightlight={getHightlight}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        direction={dmgp}
        selectedHighlight={selectedHighlight}
      />

      <CopyHighlightModal
        onOpen={onCopyOpen}
        onClose={onCopyClose}
        isOpen={isCopyOpen}
        weekListOption={currentWeekList}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        direction={dmgp}
        getHightlight={getHightlight}
      />

      <ValidationModal
        onOpen={onOpenVal}
        onClose={onCloseVal}
        isOpen={isOpenVal}
        direction={dmgp}
        week={selectedWeek}
      />

      <Flex mt={10} px={2} w={'100%'} mb={3}>
        <Box>
          <PageTitle
            titleSize={17}
            titleColor={'black'}
            subtitleColor={'gray'}
            subtitleSize={14}
            icon={dmgp.icon}
            title={dmgp.label}
            subtitle={' / ' + dmgp.description}
          />
        </Box>
        <Spacer />
        <Box mr={2}>
          {role && !role.includes('codir') && (
            <DMenuButton
              onChange={onDMenuChange}
              name={'Nouvelle taches'}
              rightIcon={<BsPlusLg />}
              menus={[
                {
                  icon: <FaCheck />,
                  value: 'validate',
                  label: 'Valider',
                },
                {
                  icon: <BsPlusLg />,
                  value: 'hightlight',
                  label: 'Nouveau fait marquant',
                },
                {
                  icon: <FaCopy />,
                  value: 'copy-hightlight',
                  label: 'Copier une semaine',
                },
              ]}
            />
          )}
        </Box>
        <ListSemaineItem
          onWeekSelect={setSelectedWeek}
          selectedWeek={selectedWeek}
        />
      </Flex>
      <Stack p={3} mt={6} w={'100%'}>
        <Grid
          templateRows="repeat(5, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={2}
          h={'1340px'}
        >
          <GridItem
            rowSpan={1}
            colSpan={2}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            {/* Content for Chiffre d'affaires */}
            <Box>
              <TagTitle title={'Communication et Transparence'} size={16} />
            </Box>
            <Divider mt={3} mb={2} />
            <HStack justifyContent={'space-between'} alignItems="center">
              <Box>
                <ValuesData
                  tagName="TRC"
                  full_value={formaterNumber(
                    dataofms.parcActive,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={formaterNumber(dataofms.parcActive, 22)}
                  iconType={dataofms.variationParcActiveWeek > 0 ? 'up' : 'up'}
                  lastVal={
                    dataofms.variationParcActiveWeek > 0
                      ? {
                          value: numberWithBadge(
                            data.variationParcActiveWeek,
                            12,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            700
                          ),
                          label: titles.title.label.s1,
                        }
                      : {
                          value: numberWithBadge(
                            dataofms.variationParcActiveWeek,
                            12,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            700
                          ),
                          label: titles.title.label.s1,
                        }
                  }
                />
              </Box>

              <Box h={'15vh'}>
                <Divider
                  orientation="vertical"
                  ml={5}
                  mr={5}
                  borderWidth={'1px'}
                  borderColor={'#ebedf2'}
                />
              </Box>
              <Box>
                <ValuesData
                  tagName="Taux RPC"
                  full_value={formaterNumber(
                    dataofms.parcRegistered,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={formaterNumber(dataofms.parcRegistered, 22)}
                  iconType={dataofms.variationRegisteredWeek > 0 ? 'up' : 'up'}
                  lastVal={
                    dataofms.variationRegisteredWeek > 0
                      ? {
                          value: numberWithBadge(
                            dataofms.variationRegisteredWeek,
                            12,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            700
                          ),
                          label: titles.title.label.s1,
                        }
                      : {
                          value: numberWithBadge(
                            dataofms.variationRegisteredWeek,
                            12,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            700
                          ),
                          label: titles.title.label.s1,
                        }
                  }
                />
              </Box>
              <Box h={'15vh'}>
                <Divider
                  orientation="vertical"
                  ml={5}
                  mr={5}
                  borderWidth={'1px'}
                  borderColor={'#ebedf2'}
                />
              </Box>
              <Box>
                <ValuesData
                  tagName="SCSU"
                  full_value={formaterNumber(
                    data.parcFibreFtthGP,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={formaterNumber(data.parcFibreFtthGP, 22)}
                  iconType={data.variationParcFibreFtthGP > 0 ? 'up' : 'down'}
                  lastVal={
                    data.variationParcFibreFtthGP > 0
                      ? {
                          value: formaterNumberWithBadge(
                            data.variationParcFibreFtthGP,
                            12,
                            colors.colorBadge.green.green_600,
                            600
                          ),
                          label: titles.title.label.m1,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: formaterNumberWithBadge(
                            data.variationParcFibreFtthGP,
                            12,
                            colors.colorBadge.red.red_600,
                            600
                          ),
                          label: titles.title.label.m1,
                          valueColor: colors.colorBadge.red.red_600,
                        }
                  }
                />
              </Box>
            </HStack>
          </GridItem>

          <GridItem
            rowSpan={1}
            colSpan={2}
            bg={gstyle.bg}
            borderRadius={gstyle.radius}
            p={gstyle.p}
          >
            {/* Content for Part de marché (en %) */}
            <Box>
              <TagTitle title={'Gestion Ressources Humaines'} size={14} />
            </Box>
            <Divider mt={3} mb={1} />
            <HStack justifyContent={'space-between'} alignItems="center">
              <Box>
                <ValuesData
                  tagName={'Taux Emission CO2'}
                  full_value={formaterNumber(
                    dataofms.caOfmsWeek,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={abreviateNumberWithXof(
                    dataofms.caOfmsWeek,
                    22,
                    16,
                    '',
                    700,
                    600
                  )}
                  iconType={dataofms.variationCaOfmsWeek > 0 ? 'up' : 'up'}
                  lastVal={
                    dataofms.variationCaOfmsWeek > 0
                      ? {
                          value: numberWithBadge(
                            dataofms.variationCaOfmsWeek,
                            12,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            700
                          ),
                          label: titles.title.label.s1,
                        }
                      : {
                          value: numberWithBadge(
                            dataofms.variationCaOfmsWeek,
                            12,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            700
                          ),
                          label: titles.title.label.s1,
                        }
                  }
                />
              </Box>

              <Box h={'15vh'}>
                <Divider
                  orientation="vertical"
                  ml={5}
                  mr={5}
                  borderWidth={'1px'}
                  borderColor={'#ebedf2'}
                />
              </Box>
              <Box>
                <ValuesData
                  tagName={'Taux ER'}
                  full_value={formaterNumber(
                    dataofms.caOfmsMonthToDate,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={abreviateNumberWithXof(
                    dataofms.caOfmsMonthToDate,
                    22,
                    16,
                    '',
                    700,
                    600
                  )}
                  iconType={
                    dataofms.variationCaOfmsMonthToDate < 0 ? 'down' : 'up'
                  }
                  lastVal={
                    dataofms.variationCaOfmsYear < 0
                      ? {
                          value: numberWithBadge(
                            dataofms.variationCaOfmsYear,
                            12,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            700
                          ),
                          label: titles.title.label.y1,
                        }
                      : {
                          value: numberWithBadge(
                            dataofms.variationCaOfmsYear,
                            12,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            700
                          ),
                          label: titles.title.label.y1,
                        }
                  }
                />
              </Box>
              <Box h={'15vh'}>
                <Divider
                  orientation="vertical"
                  ml={5}
                  mr={5}
                  borderWidth={'1px'}
                  borderColor={'#ebedf2'}
                />
              </Box>
              <Box>
                <ValuesData
                  tagName={'Indice QAir'}
                  full_value={formaterNumber(
                    dataofms.caOfmsYear,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={abreviateNumberWithXof(
                    dataofms.caOfmsYear,
                    22,
                    16,
                    '',
                    700,
                    600
                  )}
                  iconType={dataofms.variationCaOfmsYear > 0 ? 'up' : 'down'}
                  lastVal={
                    dataofms.variationCaOfmsYear > 0
                      ? {
                          value: numberWithBadge(
                            dataofms.variationCaOfmsYear,
                            12,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            700
                          ),
                          label: titles.title.label.y1,
                        }
                      : {
                          value: numberWithBadge(
                            dataofms.variationCaOfmsYear,
                            12,
                            12,
                            colors.colorBadge.red.red_600,
                            600,
                            700
                          ),
                          label: titles.title.label.y1,
                        }
                  }
                />
              </Box>
            </HStack>
          </GridItem>
          <GridItem
            rowSpan={3}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            <Box>
              <TagTitle title={'Diplomatique'} size={16} />
            </Box>
            <Divider mt={2} />
            <>
              <Box>
                <ValuesData
                  tagName="Nombres de visites"
                  full_value={formaterNumber(6000, 18, '#ffffff', 600)}
                  value={formaterNumber(6000, 22, 16, '', 700, 600)}
                  iconType={data.variationCaMobile > 0 ? 'up' : 'down'}
                  lastVal={
                    data.variationCaMobile > 0
                      ? {
                          value: abreviateNumberWithXofWithBadge(
                            data.variationCaMobile,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            700
                          ),
                          label: titles.title.label.m1,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: abreviateNumberWithXofWithBadge(
                            data.variationCaMobile,
                            12,
                            colors.colorBadge.red.red_600,
                            600,
                            700
                          ),
                          label: titles.title.label.m1,
                          valueColor: colors.colorBadge.red.red_600,
                        }
                  }
                />
              </Box>
              <Divider mt={3} mb={2} />
              <Box h={'55%'} w={'98%'}>
                <HorizontalBarChart chartData={data_} />
              </Box>
            </>
          </GridItem>
          <GridItem
            rowSpan={3}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            <Box>
              <TagTitle title={'Socio-Economique'} size={16} />
            </Box>
            <Divider mt={2} />

            <>
              <Box>
                <ValuesData
                  tagName="Indice de BES"
                  full_value={formaterNumber(
                    data.parcMobile,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={formaterNumber(data.parcMobile, 22)}
                  iconType={data.variationParcMobile > 0 ? 'up' : 'down'}
                  lastVal={
                    data.variationParcMobile > 0
                      ? {
                          value: formaterNumberWithBadge(
                            data.variationParcMobile,
                            12,
                            colors.colorBadge.green.green_600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: formaterNumberWithBadge(
                            data.variationParcMobile,
                            12,
                            colors.colorBadge.red.red_600,
                            600
                          ),
                          label: titles.title.label.s1,
                        }
                  }
                />
              </Box>
              <Divider mt={3} />
              <Box h={'55%'} w={'98%'}>
                <HorizontalBarChart2 chartData={data_ParcMobile} />
              </Box>
            </>
          </GridItem>
          <GridItem
            rowSpan={3}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            <Box>
              <TagTitle title={'Gestion Administrative'} size={16} />
            </Box>
            <Divider mt={2} />

            <>
              <Box>
                <ValuesData
                  tagName="Taux d'execution budgétaire"
                  full_value={formaterNumber(
                    data.parcMobile,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={formaterNumber(data.parcMobile, 22)}
                  iconType={data.variationParcMobile > 0 ? 'up' : 'down'}
                  lastVal={
                    data.variationParcMobile > 0
                      ? {
                          value: formaterNumberWithBadge(
                            data.variationParcMobile,
                            12,
                            colors.colorBadge.green.green_600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: formaterNumberWithBadge(
                            data.variationParcMobile,
                            12,
                            colors.colorBadge.red.red_600,
                            600
                          ),
                          label: titles.title.label.s1,
                        }
                  }
                />
              </Box>
              <Divider mt={3} />
              <Box h={'70%'} w={'100%'}>
                <PieCharts chartData={data_ParcMobile} />
              </Box>
            </>
          </GridItem>
          <GridItem
            rowSpan={3}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            <Box>
              <TagTitle title={'Sécurité Nationale'} size={16} />
            </Box>
            <Divider mt={2} />

            <>
              <Box>
                <ValuesData
                  tagName="Indice de SN"
                  full_value={formaterNumber(
                    data.parcMobile,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={formaterNumber(data.parcMobile, 22)}
                  iconType={data.variationParcMobile > 0 ? 'up' : 'down'}
                  lastVal={
                    data.variationParcMobile > 0
                      ? {
                          value: formaterNumberWithBadge(
                            data.variationParcMobile,
                            12,
                            colors.colorBadge.green.green_600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: formaterNumberWithBadge(
                            data.variationParcMobile,
                            12,
                            colors.colorBadge.red.red_600,
                            600
                          ),
                          label: titles.title.label.s1,
                        }
                  }
                />
              </Box>
              <Divider mt={3} />
              <Box h={'70%'} w={'100%'}>
                <PieCharts2 chartData={data_ParcMobile} />
              </Box>
            </>
          </GridItem>

          
          <GridItem
            colSpan={2}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            {/* Content for CA Recharge/Obj(Gxof) */}
            <Box>
              <TagTitle title={'Evolution des Projets Réalisés par rapport aux objectfis'} size={16} />
            </Box>
            <Divider mb={3} mt={3} />

            <Box>
              <TabsPanelItem
                fSize={'12px'}
                w1={'100%'}
                h1={'100%'}
                title1={'Projets Réalisées Vs Obj.'}
                tab1={<LineChartsParcOM />}
                w2={'100%'}
                h2={'100%'}
                title2={'Projets Réalisées Vs Obj.'}
                tab2={<LineChartsParcOM />}
                w3={'100%'}
                h3={'100%'}
                title3={'Projets Réalisées Vs Obj.'}
                tab3={<LineChartsParcOM />}
              />
            </Box>
            <Box>
              <TabsPanelItem
                fSize={'12px'}
                w1={'100%'}
                h1={'100%'}
                title1={'Projets Réalisées Vs Obj.'}
                tab1={<LineChartsParcOM />}
                w2={'100%'}
                h2={'100%'}
                title2={'Projets Réalisées Vs Obj.'}
                tab2={<LineChartsParcOM />}
              />
            </Box>
          </GridItem>
          <GridItem
            colSpan={2}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
            overflowY="auto"
            css={scroll_customize}
          >
            <Stack mt={3}>
              <HightlightHeader status={DefaultHighlightstatus} />
            </Stack>

            <Divider mb={3} mt={3} />
            <HStack mb={3} justifyContent={'space-between'}>
              <Box>
                <Box mr={1} bg={'#fff'} borderRadius={6}>
                  <Select
                    width={'15rem'}
                    type="text"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option key="all" value="all">
                      Tous les objectifs mensuels
                    </option>
                    {statusList.map((option, index) => (
                      <option key={index} value={option.name}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Box>
            </HStack>
            <Stack mt={2}>
              {simulatedData.map((highlight, i) =>
                displayHighlight(highlight, i)
              )}
            </Stack>
          </GridItem>
          {/* Second row */}
        </Grid>
      </Stack>
    </DashboardLayout>
  );
}
