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
  VStack,
} from '@chakra-ui/react';
import { ValuesData } from '@components/common/data/values';
import { TagTitle } from '@components/common/title';
import { DashboardLayout } from '@components/layout/dashboard';
import { gird, hightlightStatus, titles, colors, direction } from '@theme';
import { getToken } from 'next-auth/jwt';
import { BsPlusLg } from 'react-icons/bs';
import { PageTitle } from '@components/common/title/page';
import { IconedButton } from '@components/common/button';
import {
  HorizontalBarChart,
  VerticalBarChartDmc,
  VerticalBarChartDst,
} from '@components/common/charts/barcharts';
import { scroll_customize } from '@components/common/styleprops';
import {
  LineCharts,
  LineChartsCAFixe,
  LineChartsParcMobile,
  TreeMapChartDst,
} from '@components/common/charts/linecharts';
import { ListSemaineItem } from '@components/common/dropdown_item';
import { TabsPanelItem, TabsPanelItemVertical } from '@components/common/tabs';
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
import { TreeMapChartDstV2 } from '@components/common/charts/treemapperdst';
import { PieCharts, PieChartsDst } from '@components/common/charts/piecharts';
//import { TreeMapChart } from '@components/common/charts/treemapperdst';

export default function DmgpPage(props) {
  const initialValue = 20;
  const gstyle = gird.style;
  const { dst } = direction;
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

  const [dataMarket, setDataMarket] = useState(null);
  const [dataDst, setDataDst] = useState(null);
  const [dataOffer, setDataOffer] = useState(null);

  const getHightlight = () => {
    getHightlightData(
      selectedWeek?.split('-')[0],
      selectedWeek?.split('-')[1],
      dst.id,
      setHighlights,
      setError
    );
  };

  //Build The Get function
  const getDataMarket = () => {
    const params =
      '/' + selectedWeek?.split('-')[0] + '/' + selectedWeek?.split('-')[1];
    const url = 'v1/direction-data/filter/' + dst.id + params;
    const requestData = {
      tag: 'kpi_commerciaux_global',
    };

    createElement(url, requestData)
      .then((res) => {
        setDataMarket(res?.data);
      })
      .catch((error) => {});
  };
  //End to get the function
  const getDataDst = () => {
    const params =
      '/' + selectedWeek?.split('-')[0] + '/' + selectedWeek?.split('-')[1];
    const url = 'v1/direction-data/filter/' + dst.id + params;
    const requestData = {
      tag: 'kpi_techniques_global',
    };

    createElement(url, requestData)
      .then((res) => {
        setDataDst(res?.data);
      })
      .catch((error) => {});
  };
  //End to get the function
  const getDataPieChart = () => {
    const params =
      '/' + selectedWeek?.split('-')[0] + '/' + selectedWeek?.split('-')[1];
    const url = 'v1/direction-data/filter/' + dst.id + params;
    const requestData = {
      tag: 'commerciaux_nom_offre',
      name: 'nombre_nouveaux_kits_vendu',
      historicLength: 1,
    };

    createElement(url, requestData)
      .then((res) => {
        setDataOffer(res?.data);
        console.log('Data DST Response Good ------------ ', res?.data);
      })
      .catch((error) => {
        console.error('Error::::', error);
      });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRole(sessionStorage.getItem('role'));
    }
    getHightlight();
    getDataDst();
    getDataMarket();
    getDataPieChart();
  }, [selectedWeek]);

  const openHightlightModal = () => {
    getHightlightStatus(null, setHighlightStatus, setError);
    setCurrentWeekList([getCurrentWeek(), getLastWeek()]);
    onOpenFm();
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

  //Add Repartion des ventes hebdo/offre
  const DataOffer = [
    {
      id: 1,
      part: 'Kit TV 24 (500X)',
      percent: dataOffer?.find(
        ({ name }) => name == 'nombre_nouveaux_kits_vendu_KIT TV 24  (500X)'
      )?.value,
    },
    {
      id: 2,
      part: 'Kit TV 32 (500X)',
      percent: dataOffer?.find(
        ({ name }) => name == 'nombre_nouveaux_kits_vendu_KIT TV 32 (500X)'
      )?.value,
    },
    {
      id: 3,
      part: 'LEERAL',
      percent: dataOffer?.find(
        ({ name }) => name == 'nombre_nouveaux_kits_vendu_LEERAL'
      )?.value,
    },
  ];

  const chartData = {
    labels: DataOffer?.map((item) => item.part),
    datasets: [
      {
        data: DataOffer?.map((item) => item.percent),
        backgroundColor: ['#fc8064', '#4cc4c4', '#34a4ec'],
      },
    ],
  };

  //console.log('Data Offer Data Ofeer;;;;', dataOffer.length)

  return (
    <DashboardLayout activeMenu={'account-dst'}>
      <HighlightModal
        onOpen={onOpenFm}
        onClose={onCloseFm}
        isOpen={isOpenFm}
        weekListOption={currentWeekList}
        highlightStatus={highlightStatus}
        getHightlight={getHightlight}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        direction={dst}
        selectedHighlight={selectedHighlight}
      />

      <CopyHighlightModal
        onOpen={onCopyOpen}
        onClose={onCopyClose}
        isOpen={isCopyOpen}
        weekListOption={currentWeekList}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        direction={dst}
        getHightlight={getHightlight}
      />

      <ValidationModal
        onOpen={onOpenVal}
        onClose={onCloseVal}
        isOpen={isOpenVal}
        direction={dst}
        week={selectedWeek}
      />

      <Flex mt={3} px={2} w={'100%'} mb={3}>
        <Box>
          <PageTitle
            titleSize={17}
            titleColor={'black'}
            subtitleColor={'gray'}
            subtitleSize={14}
            icon={dst.icon}
            title={dst.label}
            subtitle={' / ' + dst.description}
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

      <Stack p={2} w={'100%'} mb={3}>
        <Grid
          templateRows="repeat(5, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={2}
          h={gstyle.h * 5 + 'px'}
        >
          <GridItem
            colSpan={2}
            rowSpan={1}
            bg={gstyle.bg}
            borderRadius={gstyle.radius}
            p={gstyle.p}
          >
            <Box>
              <TagTitle title={'Production Commercial'} size={16} />
            </Box>
            <Divider mt={3} mb={0} />
            {valueGetZero(
              dataMarket?.find(({ name }) => name == 'ca_ytd')?.value
            ) ? (
              <>
                <VStack
                  p={1}
                  mb={2}
                  alignItems={'space-between'}
                  justifyContent={'space-between'}
                  spacing={0}
                  bg={'gray.100'}
                  borderRadius={'5px'}
                >
                  <HStack
                    justifyContent={'space-between'}
                    alignContent={'center'}
                    alignItems={'center'}
                  >
                    <ValuesData
                      tagName={'CA Global'}
                      full_value={formaterNumber(
                        dataMarket?.find(({ name }) => name == 'ca_ytd')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={abreviateNumberWithXof(
                        dataMarket?.find(({ name }) => name == 'ca_ytd')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        dataMarket?.find(({ name }) => name == 'ca_ytd')
                          ?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                    <Box h={'15vh'}>
                      <Divider
                        orientation="vertical"
                        ml={1}
                        mr={1}
                        borderWidth={'1px'}
                        borderColor={'#fff'}
                      />
                    </Box>
                    <ValuesData
                      tagName={'ARPU'}
                      full_value={formaterNumber(
                        dataMarket?.find(({ name }) => name == 'arpu_cumul')
                          ?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        dataMarket?.find(({ name }) => name == 'arpu_cumul')
                          ?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        dataMarket?.find(({ name }) => name == 'arpu_cumul')
                          ?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </HStack>
                </VStack>
                <HStack
                  justifyContent={'space-between'}
                  alignItems="flex-start"
                >
                  <Box>
                    <ValuesData
                      tagName="CA Hebdo"
                      full_value={formaterNumber(
                        dataMarket?.find(({ name }) => name == 'ca_hebdo')
                          ?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={abreviateNumberWithXof(
                        dataMarket?.find(({ name }) => name == 'ca_hebdo')
                          ?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        dataMarket?.find(({ name }) => name == 'ca_hebdo')
                          ?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </Box>

                  <Box h={'15vh'}>
                    <Divider
                      orientation="vertical"
                      ml={1}
                      mr={1}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <Box>
                    <ValuesData
                      tagName="Taux d'utilisation"
                      full_value={formaterNumber(
                        dataMarket?.find(
                          ({ name }) => name == 'taux_utilisation'
                        )?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={numberWithBadge(
                        dataMarket?.find(
                          ({ name }) => name == 'taux_utilisation'
                        )?.value,
                        22
                      )}
                      iconType={
                        dataMarket?.find(
                          ({ name }) => name == 'taux_utilisation'
                        )?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </Box>
                  <Box h={'15vh'}>
                    <Divider
                      orientation="vertical"
                      ml={1}
                      mr={1}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <Box>
                    <ValuesData
                      tagName="Ventes"
                      full_value={formaterNumber(
                        dataMarket?.find(
                          ({ name }) => name == 'nombre_nouveaux_kits_vendu'
                        )?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        dataMarket?.find(
                          ({ name }) => name == 'nombre_nouveaux_kits_vendu'
                        )?.value,
                        22
                      )}
                      iconType={
                        dataMarket?.find(
                          ({ name }) => name == 'nombre_nouveaux_kits_vendu'
                        )?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </Box>
                </HStack>
                <Divider mt={0} mb={2} borderColor="gray.200" />
                <HStack
                  justifyContent={'space-between'}
                  alignItems="flex-start"
                >
                  <Box>
                    <ValuesData
                      tagName="Parc Installé"
                      full_value={formaterNumber(
                        dataMarket?.find(
                          ({ name }) => name == 'parc_installe_cumul'
                        )?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        dataMarket?.find(
                          ({ name }) => name == 'parc_installe_cumul'
                        )?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        dataMarket?.find(
                          ({ name }) => name == 'parc_installe_cumul'
                        )?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </Box>

                  <Box h={'15vh'}>
                    <Divider
                      orientation="vertical"
                      ml={1}
                      mr={1}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <Box>
                    <ValuesData
                      tagName="Parc actif"
                      full_value={formaterNumber(
                        dataMarket?.find(
                          ({ name }) => name == 'parc_actif_cumul'
                        )?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        dataMarket?.find(
                          ({ name }) => name == 'parc_actif_cumul'
                        )?.value,
                        22
                      )}
                      iconType={
                        dataMarket?.find(
                          ({ name }) => name == 'parc_actif_cumul'
                        )?.value >= 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </Box>
                  <Box h={'15vh'}>
                    <Divider
                      orientation="vertical"
                      ml={1}
                      mr={1}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <Box>
                    <ValuesData
                      tagName="Taux de Clients en défaut"
                      full_value={formaterNumber(
                        dataMarket?.find(({ name }) => name == 'taux_defaut')
                          ?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={numberWithBadge(
                        dataMarket?.find(({ name }) => name == 'taux_defaut')
                          ?.value,
                        22
                      )}
                      iconType={
                        dataMarket?.find(({ name }) => name == 'taux_defaut')
                          ?.value >= 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </Box>
                </HStack>
              </>
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                paddingY={10}
                marginTop={2}
                SizeIcon={40}
              />
            )}
          </GridItem>

          <GridItem
            colSpan={2}
            rowSpan={1}
            bg={gstyle.bg}
            borderRadius={gstyle.radius}
            p={gstyle.p}
          >
            <Box>
              <TagTitle title={'Production Technique'} size={16} />
            </Box>
            <Divider mt={3} mb={0} />
            {valueGetZero(
              dataDst?.find(({ name }) => name == 'productivite_globale')?.value
            ) ? (
              <>
                <VStack
                  p={1}
                  mb={2}
                  alignItems={'space-between'}
                  justifyContent={'space-between'}
                  spacing={0}
                  bg={'gray.100'}
                  borderRadius={'5px'}
                >
                  <HStack
                    justifyContent={'space-between'}
                    alignContent={'center'}
                    alignItems={'center'}
                  >
                    <ValuesData
                      tagName={'Productivité Global'}
                      full_value={formaterNumber(
                        dataDst?.find(
                          ({ name }) => name == 'productivite_globale'
                        )?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={numberWithBadge(
                        dataDst?.find(
                          ({ name }) => name == 'productivite_globale'
                        )?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        dataDst?.find(
                          ({ name }) => name == 'productivite_globale'
                        )?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </HStack>
                </VStack>
                <HStack
                  justifyContent={'space-between'}
                  alignItems="flex-start"
                >
                  <Box>
                    <ValuesData
                      tagName="Installations"
                      full_value={formaterNumber(
                        dataDst?.find(
                          ({ name }) => name == 'nombre_installations'
                        )?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        dataDst?.find(
                          ({ name }) => name == 'nombre_installations'
                        )?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        dataDst?.find(
                          ({ name }) => name == 'nombre_installations'
                        )?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </Box>

                  <Box h={'15vh'}>
                    <Divider
                      orientation="vertical"
                      ml={1}
                      mr={1}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <Box>
                    <ValuesData
                      tagName="Installations SAV"
                      full_value={formaterNumber(
                        dataDst?.find(({ name }) => name == 'nombre_sav')
                          ?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        dataDst?.find(({ name }) => name == 'nombre_sav')
                          ?.value,
                        22
                      )}
                      iconType={
                        dataDst?.find(({ name }) => name == 'nombre_sav')
                          ?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </Box>
                  <Box h={'15vh'}>
                    <Divider
                      orientation="vertical"
                      ml={1}
                      mr={1}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <Box>
                    <ValuesData
                      tagName="Installations repossessions"
                      full_value={formaterNumber(
                        dataDst?.find(
                          ({ name }) => name == 'nombre_repossessions'
                        )?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        dataDst?.find(
                          ({ name }) => name == 'nombre_repossessions'
                        )?.value,
                        22
                      )}
                      iconType={
                        dataDst?.find(
                          ({ name }) => name == 'nombre_repossessions'
                        )?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </Box>
                </HStack>
                <Divider mt={0} mb={2} borderColor="gray.200" />
                <HStack
                  justifyContent={'space-between'}
                  alignItems="flex-start"
                >
                  <Box>
                    <ValuesData
                      tagName="Instances"
                      full_value={formaterNumber(
                        dataDst?.find(
                          ({ name }) => name == 'nombre_instances_installations'
                        )?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        dataDst?.find(
                          ({ name }) => name == 'nombre_instances_installations'
                        )?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        dataDst?.find(
                          ({ name }) => name == 'nombre_instances_installations'
                        )?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </Box>

                  <Box h={'15vh'}>
                    <Divider
                      orientation="vertical"
                      ml={1}
                      mr={1}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <Box>
                    <ValuesData
                      tagName="Instances SAV"
                      full_value={formaterNumber(
                        dataDst?.find(
                          ({ name }) => name == 'nombre_instances_sav'
                        )?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        dataDst?.find(
                          ({ name }) => name == 'nombre_instances_sav'
                        )?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        dataDst?.find(
                          ({ name }) => name == 'nombre_instances_sav'
                        )?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </Box>
                  <Box h={'15vh'}>
                    <Divider
                      orientation="vertical"
                      ml={1}
                      mr={1}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <Box>
                    <ValuesData
                      tagName="Instances repossessions"
                      full_value={formaterNumber(
                        dataDst?.find(
                          ({ name }) => name == 'nombre_instances_repossessions'
                        )?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        dataDst?.find(
                          ({ name }) => name == 'nombre_instances_repossessions'
                        )?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        dataDst?.find(
                          ({ name }) => name == 'nombre_instances_repossessions'
                        )?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </Box>
                </HStack>
              </>
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                marginTop={2}
                paddingY={10}
                SizeIcon={40}
              />
            )}
          </GridItem>
          <GridItem
            rowSpan={4}
            colSpan={2}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            {/* Content for CA Recharge/Obj(Gxof) */}
            <Box>
              <TagTitle
                title={'Evolution et répartition des ventes orange énergie'}
                size={16}
              />
            </Box>
            <Divider mb={3} mt={3} />

            <Box>
              <TabsPanelItem
                title1={'Ventes/région'}
                tab1={<TreeMapChartDstV2 selectedWeek={selectedWeek} />}
                title2={'Ventes'}
                tab2={<VerticalBarChartDst selectedWeek={selectedWeek} />}
                title3={'Ventes/offre'}
                tab3={
                  dataOffer && dataOffer.length > 0 ? (
                    <PieChartsDst chartData={chartData} />
                  ) : (
                    <DataUnavailable
                      message={titles.title.label.dataunavailable}
                      marginTop={8}
                      paddingY={8}
                      SizeIcon={40}
                    />
                  )
                }
              />
            </Box>
          </GridItem>
          <GridItem
            colSpan={2}
            rowSpan={4}
            p={gstyle.p}
            bg={gstyle.bg_h}
            borderRadius={gstyle.radius}
            overflowY="auto"
            css={scroll_customize}
          >
            <Stack mt={0}>
              <HightlightHeader status={DefaultHighlightstatus} />
            </Stack>
            <Divider mb={3} mt={2} />
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
                      Tous les status
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
              {(selectedStatus == 'all' || selectedStatus == 'realizes') &&
                highlights
                  ?.filter((h) => h.status?.name == 'realizes')
                  .map((highligh, i) => displayHighlight(highligh, i))}
              {(selectedStatus == 'all' || selectedStatus == 'difficults') &&
                highlights
                  ?.filter((h) => h.status?.name == 'difficults')
                  .map((highligh, i) => displayHighlight(highligh, i))}
              {(selectedStatus == 'all' || selectedStatus == 'challenges') &&
                highlights
                  ?.filter((h) => h.status?.name == 'challenges')
                  .map((highligh, i) => displayHighlight(highligh, i))}
              {(selectedStatus == 'all' ||
                selectedStatus == 'coordinationPoint') &&
                highlights
                  ?.filter((h) => h.status?.name == 'coordinationPoint')
                  .map((highligh, i) => displayHighlight(highligh, i))}
            </Stack>
          </GridItem>
        </Grid>
      </Stack>
    </DashboardLayout>
  );
}
