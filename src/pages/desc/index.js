import {
  HightlightContent,
  HightlightHeader,
} from '@components/common/data/hightlight';
import {
  Box,
  Divider,
  Flex,
  HStack,
  Spacer,
  Stack,
  Grid,
  GridItem,
  Heading,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ValuesData } from '@components/common/data/values';
import { TagTitle } from '@components/common/title';
import { DashboardLayout } from '@components/layout/dashboard';
import { gird, hightlightStatus, titles, colors, direction } from '@theme';
import { getToken } from 'next-auth/jwt';
import { PageTitle } from '@components/common/title/page';
import {
  HorizontalBarChart,
  HorizontalBarChart2,
} from '@components/common/charts/barcharts';
import {
  getHightlightData,
  getHightlightStatus,
} from '@utils/services/hightlight/data';
import { useEffect, useState } from 'react';

import { scroll_customize } from '@components/common/styleprops';
import { AiFillHome } from 'react-icons/ai';
import { GiCash } from 'react-icons/gi';
import moment from 'moment';
import {
  DefaultHighlightstatus,
  highlightStatusStyle,
} from '@utils/schemas/src/highlight';
import {
  getCurrentWeek,
  getLastWeek,
  getLastWeekList,
} from '@utils/services/date';
import {
  abreviateNumberWithXof,
  abreviateNumberWithXofWithBadge,
  abreviateNumberWithoutXof,
  abreviateNumberWithoutXofWithBadge,
  formaterNumber,
  formaterNumberItalic,
  formaterNumberWithBadge,
  numberWithBadge,
  numberWithBadgeItalic,
  numberWithBadgeMarge,
  valueGetZero,
} from '@utils/formater';
import { getElement } from 'pages/api/global';
import {
  DirectionFilter,
  HightLightFilter,
  ListSemaineItem,
} from '@components/common/dropdown_item';
import { DataUnavailable } from '@components/common/data_unavailable';
import { TabsPanelItem } from '@components/common/tabs';
import {
  LineCharts,
  LineChartsParcOM,
} from '@components/common/charts/linecharts';
import { PieCharts, PieCharts2 } from '@components/common/charts/piecharts';
import { DMenuButton } from '@components/common/menu_button';
import { useRouter } from 'next/router';
import { BsPlusLg } from 'react-icons/bs';
import { FaFileExcel, FaCheck, FaCopy } from 'react-icons/fa';

export default function Dashboard(props) {
  const [highlights, setHighlights] = useState([]);
  const [error, setError] = useState();
  const lastWeek = getLastWeek().week + '-' + getLastWeek().year;
  const [selectedWeek, setSelectedWeek] = useState(lastWeek);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { realizes, difficults, challenges, coordinationPoint } =
    hightlightStatus;
  const statusList = [realizes, difficults, challenges, coordinationPoint];

  const gstyle = gird.style;

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
  const router = useRouter();

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
        'Mise en place d’un Projet de coordination pour améliorer l’efficacité gouvernementale.',
      direction: 'Direction Coordination', // Nouvelle propriété pour la direction
      status: { name: 'coordinationPoint', label: 'En cours' },
      date: '2024-08-07',
    },
    {
      id: 5,
      title: 'Réunion avec les partenaires internationaux',
      description: 'Discussion sur les projets de coopération en cours.',
      direction: 'Direction Internationale', // Nouvelle propriété pour la direction
      status: { name: 'difficults', label: 'Réalisés' },
      date: '2024-08-01',
    },
    {
      id: 6,
      title: 'Réunion avec les partenaires internationaux',
      description: 'Discussion sur les projets de coopération en cours.',
      direction: 'Direction Internationale', // Nouvelle propriété pour la direction
      status: { name: 'difficults', label: 'Réalisés' },
      date: '2024-08-01',
    },
    {
      id: 7,
      title: 'Réunion avec les partenaires internationaux',
      description: 'Discussion sur les projets de coopération en cours.',
      direction: 'Direction Internationale', // Nouvelle propriété pour la direction
      status: { name: 'difficults', label: 'Réalisés' },
      date: '2024-08-01',
    },
  ];

  const getHightlight = () => {
    // Remplacer l'appel API par des données simulées
    setHighlights(simulatedData);
  };

  //Initialise Data
  const initDmgpData = {
    OM: 10,
    seddo: null,
    wave: null,
    another: null,
    //Add Another vars dor values data
    caMobile: 10,
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

  const [data, setData] = useState(initDmgpData);

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

  //Add Data DV
  const initDvData = {
    value_gross_add_fibre: null,
    valueVsObjective_gross_add_fibre: null,
    valueVariationWeek_gross_add_fibre: null,
    valueCsat: null,
    valueVariationWeekCsat: null,
    valueVsObjectiveCsat: null,
  };
  const [datadv, setDataDv] = useState(initDvData);

  //Appel de getDmgpDta

  const getValuesData = () => {
    setData(initDmgpData);
  };

  const getValuesDataDv = () => {
    const params =
      'week=' +
      selectedWeek?.split('-')[0] +
      '&year=' +
      selectedWeek?.split('-')[1];
    getElement('v1/direction-data/data-dv?' + params)
      .then((res) => {
        if (res.data) {
          setDataDv({
            value_gross_add_fibre: res.data?.value_gross_add_fibre,
            valueVsObjective_gross_add_fibre:
              res.data?.valueVsObjective_gross_add_fibre,
            valueVariationWeek_gross_add_fibre:
              res.data?.valueVariationWeek_gross_add_fibre,

            valueCsat: res.data?.valueCsat,
            valueVariationWeekCsat: res.data?.valueVariationWeekCsat,
            valueVsObjectiveCsat: res.data?.valueVsObjectiveCsat,
          });
        } else setData(initDvData);
      })
      .catch((error) => {
        setData(initDvData);
        //console.log('Error ::: ', error);
      });
  };

  const getValuesDataOfms = () => {
    const params =
      'week=' +
      selectedWeek?.split('-')[0] +
      '&year=' +
      selectedWeek?.split('-')[1];
    getElement('v1/direction-data/data-ofms?' + params)
      .then((res) => {
        if (res?.data) {
          setDataOfms({
            //Ca Ofms
            caOfmsWeek: res.data?.caOFMSDto.caOfmsWeek,
            caOfmsWeekVsObjectiveCaOfmsWeek:
              res.data?.caOFMSDto.caOfmsWeekVsObjectiveCaOfmsWeek,
            variationCaOfmsWeek: res.data?.caOFMSDto.variationCaOfmsWeek,
            caOfmsMonthToDate: res.data?.caOFMSDto.caOfmsMonthToDate,
            variationCaOfmsMonthToDate:
              res.data?.caOFMSDto.variationCaOfmsMonthToDate,
            caOfmsYear: res.data?.caOFMSDto.caOfmsYear,
            variationCaOfmsYear: res.data?.caOFMSDto.variationCaOfmsYear,
            //Commissions
            commissionWeek: res.data?.commissionOFMSDto.commissionWeek,
            variationCommissionWeek:
              res.data?.commissionOFMSDto.variationCommissionWeek,
            variationCommissionWeekFour:
              res.data?.commissionOFMSDto.variationCommissionWeekFour,
            commissionMonthToDate:
              res.data?.commissionOFMSDto.commissionMonthToDate,
            variationCommissionMonthToDate:
              res.data?.commissionOFMSDto.variationCommissionMonthToDate,
            commissionYear: res.data?.commissionOFMSDto.commissionYear,
            variationCommissionYear:
              res.data?.commissionOFMSDto.variationCommissionYear,
            //Marges
            margeWeek: res.data?.margeOFMSDto.margeWeek,
            variationMargeWeek: res.data?.margeOFMSDto.variationMargeWeek,
            variationMargeWeekFour:
              res.data?.margeOFMSDto.variationMargeWeekFour,
            margeMonth: res.data?.margeOFMSDto.margeMonth,
            variationMargeMonth: res.data?.margeOFMSDto.variationMargeMonth,
            margeYear: res.data?.margeOFMSDto.margeYear,
            variationMargeYear: res.data?.margeOFMSDto.variationMargeYear,
            //parcs
            //Parc Ofms
            parcActive: res.data?.parcOFMSDto.parcActive,
            parcActiveVsObj: res.data?.parcOFMSDto.parcActiveVsObj,
            variationParcActiveWeek:
              res.data?.parcOFMSDto.variationParcActiveWeek,
            variationParcActiveFourWeek:
              res.data?.parcOFMSDto.variationParcActiveFourWeek,

            parcRegistered: res.data?.parcOFMSDto.parcRegistered,
            parcRegisteredVsObj: res.data?.parcOFMSDto.parcRegisteredVsObj,
            variationRegisteredWeek:
              res.data?.parcOFMSDto.variationRegisteredWeek,
            variationParcRegisteredFourWeek:
              res.data?.parcOFMSDto.variationParcRegisteredFourWeek,
          });
        } else setData(initOfmsData);
      })
      .catch((error) => {
        setData(initOfmsData);
        //console.log('Error :::', error);
      });
  };

  console.log('Parc Telco .....', dataofms.parcRegisteredVsObj);

  const backColor = ['#1bc28a', '#a3a3ff', '#34c997', '#adadff'];

  const DataCaMobile = [
    {
      id: 1,
      part: 'Projet 1',
      percent: 10,
    },
    {
      id: 2,
      part: 'Projet 2',
      percent: 20,
    },
    {
      id: 3,
      part: 'Projet 3',
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
      part: 'Projet 1',
      percent: 30,
    },
    {
      id: 2,
      part: 'Projet 2',
      percent: 20,
    },
    {
      id: 3,
      part: 'Projet 3',
      percent: 40,
    },
    {
      id: 4,
      part: 'Projet 4',
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
        backgroundColor: backColor,
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
        backgroundColor: backColor,
      },
    ],
  };

  useEffect(() => {
    getHightlight();
    getValuesData();
    getValuesDataDv();
    getValuesDataOfms();
  }, [selectedWeek]);

  const onDMenuChange = (value) => {
    if (value === 'validate') return onOpenVal();
    if (value == 'hightlight') newHightlight();
    if (value == 'data') router.push('dashboard/form/' + selectedWeek);
    if (value == 'copy-hightlight') onCopyOpen();
  };

  const displayHighlight = (highligh, i) => (
    <HightlightContent
      key={i}
      title={`${highligh.direction} • ${highligh.title}`}
      body={highligh.description}
      iconBgColor={highlightStatusStyle(highligh.status?.name)?.style.iconColor}
      date={moment(highligh.date).format('DD-MM-YYYY')}
      bgColor={highlightStatusStyle(highligh.status?.name)?.style.bgColor}
      icon={highlightStatusStyle(highligh.status?.name)?.icon}
    />
  );

  return (
    <DashboardLayout activeMenu={'account-desc'}>
      <Flex mt={10} px={2} w={'100%'} mb={0}>
        <Box>
          <PageTitle
            titleSize={17}
            titleColor={'black'}
            subtitleColor={'gray'}
            subtitleSize={14}
            icon={<AiFillHome fontSize={24} color="white" />}
            title={'Présidence'}
            subtitle={'/ Dashboard Section Autres'}
          />
        </Box>
        <Spacer />
        <Box mr={2}>
            <DMenuButton
              onChange={onDMenuChange}
              name={'Effectuer une action'}
              rightIcon={<BsPlusLg />}
              menus={[
                {
                  icon: <BsPlusLg />,
                  value: 'data',
                  label: 'Remplir un formulaire',
                },
              ]}
            />
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
              <TagTitle title={'ITIE'} size={16} />
            </Box>
            <Divider mt={3} mb={2} />
            <HStack justifyContent={'space-between'} alignItems="center">
              <HStack justifyContent={'space-between'}>
                <ValuesData
                  tagName="Plan 1"
                  iconType="up"
                  value={6000}
                  unit="Gxof"
                  delta={{
                    label: 'Last Year',
                    value: '+5%',
                    valueColor: '#02bc7d',
                  }}
                />
                <GiCash size={24} color='#9999ff' />
              </HStack>

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
              <HStack justifyContent={'space-between'}>
                <ValuesData
                  tagName="Plan 2"
                  iconType="up"
                  value={6000}
                  unit="Gxof"
                  delta={{
                    label: 'Last Year',
                    value: '+5%',
                    valueColor: '#02bc7d',
                  }}
                />
                <GiCash size={24} color='#9999ff' />
              </HStack>
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
              <HStack justifyContent={'space-between'}>
                <ValuesData
                  tagName="Plan 3"
                  iconType="up"
                  value={6000}
                  unit="Gxof"
                  delta={{
                    label: 'Last Year',
                    value: '+5%',
                    valueColor: '#02bc7d',
                  }}
                />
                <GiCash size={24} color='#9999ff' />
              </HStack>
              </Box>
            </HStack>
          </GridItem>

          <GridItem
            rowSpan={1}
            colSpan={2}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            {/* Content for Chiffre d'affaires */}
            <Box>
              <TagTitle title={'APIX'} size={16} />
            </Box>
            <Divider mt={3} mb={2} />
            <HStack justifyContent={'space-between'} alignItems="center">
              <HStack justifyContent={'space-between'}>
                <ValuesData
                  tagName="Projet 1"
                  iconType="up"
                  value={6000}
                  unit="Gxof"
                  delta={{
                    label: 'Last Year',
                    value: '+5%',
                    valueColor: '#02bc7d',
                  }}
                />
                <GiCash size={24} color='#9999ff' />
              </HStack>

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
              <HStack justifyContent={'space-between'}>
                <ValuesData
                  tagName="Projet 2"
                  iconType="up"
                  value={6000}
                  unit="Gxof"
                  delta={{
                    label: 'Last Year',
                    value: '+5%',
                    valueColor: '#02bc7d',
                  }}
                />
                <GiCash size={24} color='#9999ff' />
              </HStack>
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
              <HStack justifyContent={'space-between'}>
                <ValuesData
                  tagName="Projet 3"
                  iconType="up"
                  value={6000}
                  unit="Gxof"
                  delta={{
                    label: 'Last Year',
                    value: '+5%',
                    valueColor: '#02bc7d',
                  }}
                />
                <GiCash size={24} color='#9999ff' />
              </HStack>
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
                  tagName="Projet de BES"
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
                  tagName="Projet de SN"
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
              <TagTitle
                title={
                  'Evolution des Projets Réalisés par rapport aux objectfis'
                }
                size={16}
              />
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
            <Stack mt={0}>
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
