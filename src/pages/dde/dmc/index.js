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
  SimpleGrid,
  Spacer,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  useDisclosure,
  useToast,
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
  VerticalBarChartVentesVsResiliations,
} from '@components/common/charts/barcharts';
import { scroll_customize } from '@components/common/styleprops';
import {
  LineCharts,
  LineChartsCAFixe,
  LineChartsParcMobile,
  LineChartsPrc,
} from '@components/common/charts/linecharts';
import { ListSemaineItem } from '@components/common/dropdown_item';
import { ShowPanel, TabsPanelItem } from '@components/common/tabs';
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
import { AiFillSave } from 'react-icons/ai';
import { kpiCard } from '@components/common/kpi_card';
import { FaCopy, FaFileExcel } from 'react-icons/fa';
import { DMenuButton } from '@components/common/menu_button';
import { CSVReaderModal } from '@components/common/modal/csvreader';
import { CopyHighlightModal } from '@components/common/modal/highlight/copy/index.';
import { VerticalBarChart } from '@components/common/charts/barcharts';
import { GlobalLineChartsDsi } from '@components/common/charts/linecharts';
import { TabsPanelItemVertical } from '@components/common/tabs';
import DdePrcPage from '../prc';
import { DataUnavailable } from '@components/common/data_unavailable';

export default function DdeDmcPage(props) {
  //Faire passer selectedWeek en tant que props
  const { selectedWeek } = props;

  const gstyle = gird.style;
  const { ddedmc, dde } = direction;
  const {
    onOpen: onOpenFm,
    isOpen: isOpenFm,
    onClose: onCloseFm,
  } = useDisclosure();
  const {
    onOpen: onOpenCSVR,
    isOpen: isOpenCSVR,
    onClose: onCloseCSVR,
  } = useDisclosure();
  const {
    onOpen: onCopyOpen,
    isOpen: isCopyOpen,
    onClose: onCopyClose,
  } = useDisclosure();

  const toast = useToast();

  const ddeModel = {
    tag: '',
    name: '',
    value: '',
    unit: '',
  };

  const [highlights, setHighlights] = useState();
  const [highlightStatus, setHighlightStatus] = useState();
  const [currentWeekList, setCurrentWeekList] = useState();
  const [selectedHighlight, setSelectedHighlight] = useState();
  const [error, setError] = useState();

  const { realizes, difficults, challenges, coordinationPoint } =
    hightlightStatus;
  const [selectedStatus, setSelectedStatus] = useState('all');
  const statusList = [realizes, difficults, challenges, coordinationPoint];

  const lastWeek = getLastWeek().week + '-' + getLastWeek().year;
  const [selectWeek, setSelectWeek] = useState(lastWeek);
  const [values, setValues] = useState();

  const getValuesData = () => {
    const params =
      '/' + selectedWeek?.split('-')[0] + '/' + selectedWeek?.split('-')[1];
    getElement('v1/direction-data/' + dde.id + params)
      .then((res) => {
        setValues(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getHightlight = () => {
    getHightlightData(
      selectedWeek?.split('-')[0],
      selectedWeek?.split('-')[1],
      dde.id,
      setHighlights,
      setError
    );
  };

  useEffect(() => {
    getHightlight();
    getValuesData();
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
    if (value == 'copy-hightlight') return onCopyOpen();
    onOpenCSVR();
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

  const saveDdeData = (datas) => {
    createElement('v1/direction-data/save-direction-data-all', datas)
      .then((res) => {
        toast({
          title: `Données importer avec succès`,
          status: 'success',
          position: 'top',
          isClosable: true,
        });
        getHightlight();
        getValuesData();
        onCloseCSVR();
      })
      .catch((err) => {
        console.log('Error::: ', err);
        toast({
          title: `Fichier incorrect`,
          status: 'error',
          position: 'top',
          isClosable: true,
        });
      });
  };

  return (
    <>
      <HighlightModal
        onOpen={onOpenFm}
        onClose={onCloseFm}
        isOpen={isOpenFm}
        weekListOption={currentWeekList}
        highlightStatus={highlightStatus}
        getHightlight={getHightlight}
        direction={ddedmc}
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectWeek}
        selectedHighlight={selectedHighlight}
      />

      <CopyHighlightModal
        onOpen={onCopyOpen}
        onClose={onCopyClose}
        isOpen={isCopyOpen}
        weekListOption={currentWeekList}
        setSelectedWeek={setSelectWeek}
        selectedWeek={selectedWeek}
        direction={ddedmc}
        getHightlight={getHightlight}
      />

      <CSVReaderModal
        onOpen={onOpenCSVR}
        onClose={onCloseCSVR}
        isOpen={isOpenCSVR}
        saveData={saveDdeData}
        obj={ddeModel}
        direction={ddedmc}
        week={selectedWeek}
        addRef={true}
      />

      <Stack p={0} w={'100%'}>
        <Grid
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={2}
          h={'1000px'}
        >
          {/* First row */}
          <GridItem
            colSpan={2}
            rowSpan={0}
            bg={gstyle.bg}
            borderRadius={gstyle.radius}
            p={gstyle.p}
          >
            <Flex mt={1} backgroundColor="" display={'block'} spacing={1}>
              <TagTitle title={"Chiffres d'affaires"} size={16} />
              <Divider borderColor="gray.200" ml={0} mb={0} mt={2} />
              <VStack
                p={0}
                mt={0}
                alignItems={'space-between'}
                justifyContent={'space-between'}
                spacing={0}
              >
                <HStack
                  justifyContent={'space-between'}
                  alignContent={'space-between'}
                >
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'space-between'}
                    justifyContent={'space-between'}
                    spacing={0}
                  >
                    <HStack
                      justifyContent={'space-between'}
                      alignContent={'center'}
                      alignItems={'center'}
                      borderRadius={gstyle.radius}
                      mt={0}
                      px={'1'}
                      mb={0}
                    >
                      <Box mb={'2'}>
                        <ValuesData
                          tagName="Facturé"
                          full_value={formaterNumber(
                            values?.find(
                              ({ name }) => name === 'SOHO CA réalisé'
                            )?.value,
                            18,
                            '#ffffff',
                            600
                          )}
                          value={abreviateNumberWithXof(
                            values?.find(
                              ({ name }) => name === 'SOHO CA réalisé'
                            )?.value,
                            22,
                            16,
                            '',
                            700,
                            600
                          )}
                          iconType={
                            values?.find(
                              ({ name }) => name === 'SOHO évol S vs S-1'
                            )?.value > 0
                              ? 'up'
                              : 'down'
                          }
                          lastVal={
                            values?.find(
                              ({ name }) => name === 'SOHO évol S vs S-1'
                            )?.value > 0
                              ? {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) =>
                                        name === 'SOHO évol S vs S-1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.green.green_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.s1,
                                }
                              : {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) =>
                                        name === 'SOHO évol S vs S-1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.red.red_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.s1,
                                }
                          }
                        />
                      </Box>
                    </HStack>
                  </VStack>
                </HStack>
              </VStack>
              <Divider mt={0} mb={0} borderColor="gray.200" />
              <VStack
                p={0}
                mt={0}
                alignItems={'space-between'}
                justifyContent={'space-between'}
                spacing={0}
              >
                <HStack
                  justifyContent={'space-between'}
                  alignContent={'space-between'}
                >
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'space-between'}
                    justifyContent={'space-between'}
                    spacing={0}
                    w={'25vh'}
                  >
                    <HStack
                      justifyContent={'space-between'}
                      alignItems="center"
                      px={'1'}
                      mb={0}
                    >
                      <Box mb={'2'}>
                        <ValuesData
                          tagName="ICT"
                          full_value={formaterNumber(
                            values?.find(
                              ({ name }) => name === 'SOHO CA réalisé'
                            )?.value,
                            18,
                            '#ffffff',
                            600
                          )}
                          value={abreviateNumberWithXof(
                            values?.find(
                              ({ name }) => name === 'SOHO CA réalisé'
                            )?.value,
                            22,
                            16,
                            '',
                            700,
                            600
                          )}
                          iconType={
                            values?.find(
                              ({ name }) => name === 'SOHO évol S vs S-1'
                            )?.value > 0
                              ? 'up'
                              : 'down'
                          }
                          lastVal={
                            values?.find(
                              ({ name }) => name === 'SOHO évol S vs S-1'
                            )?.value > 0
                              ? {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) =>
                                        name === 'SOHO évol S vs S-1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.green.green_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.s1,
                                }
                              : {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) =>
                                        name === 'SOHO évol S vs S-1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.red.red_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.s1,
                                }
                          }
                        />
                      </Box>
                    </HStack>
                  </VStack>
                  <Box h={'10vh'} mt={'0'}>
                    <Divider
                      orientation="vertical"
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    spacing={0}
                    w={'25vh'}
                  >
                    <HStack
                      justifyContent={'space-between'}
                      alignItems="center"
                      px={'1'}
                      mb={0}
                    >
                      <Box mb={'2'}>
                        <ValuesData
                          tagName="Cloud"
                          full_value={formaterNumber(
                            values?.find(
                              ({ name }) => name === 'SOHO CA réalisé'
                            )?.value,
                            18,
                            '#ffffff',
                            600
                          )}
                          value={abreviateNumberWithXof(
                            values?.find(
                              ({ name }) => name === 'SOHO CA réalisé'
                            )?.value,
                            22,
                            16,
                            '',
                            700,
                            600
                          )}
                          iconType={
                            values?.find(
                              ({ name }) => name === 'SOHO évol S vs S-1'
                            )?.value > 0
                              ? 'up'
                              : 'down'
                          }
                          lastVal={
                            values?.find(
                              ({ name }) => name === 'SOHO évol S vs S-1'
                            )?.value > 0
                              ? {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) =>
                                        name === 'SOHO évol S vs S-1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.green.green_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.s1,
                                }
                              : {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) =>
                                        name === 'SOHO évol S vs S-1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.red.red_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.s1,
                                }
                          }
                        />
                      </Box>
                    </HStack>
                  </VStack>
                  <Box h={'10vh'} mt={'0'}>
                    <Divider
                      orientation="vertical"
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    spacing={0}
                    w={'25vh'}
                  >
                    <HStack
                      justifyContent={'space-between'}
                      alignItems="center"
                      px={'1'}
                      mb={0}
                    >
                      <Box mb={'2'}>
                        <ValuesData
                          tagName="BtoB"
                          full_value={formaterNumber(
                            values?.find(
                              ({ name }) => name === 'SOHO CA réalisé'
                            )?.value,
                            18,
                            '#ffffff',
                            600
                          )}
                          value={abreviateNumberWithXof(
                            values?.find(
                              ({ name }) => name === 'SOHO CA réalisé'
                            )?.value,
                            22,
                            16,
                            '',
                            700,
                            600
                          )}
                          iconType={
                            values?.find(
                              ({ name }) => name === 'SOHO évol S vs S-1'
                            )?.value > 0
                              ? 'up'
                              : 'down'
                          }
                          lastVal={
                            values?.find(
                              ({ name }) => name === 'SOHO évol S vs S-1'
                            )?.value > 0
                              ? {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) =>
                                        name === 'SOHO évol S vs S-1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.green.green_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.s1,
                                }
                              : {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) =>
                                        name === 'SOHO évol S vs S-1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.red.red_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.s1,
                                }
                          }
                        />
                      </Box>
                    </HStack>
                  </VStack>
                </HStack>
              </VStack>
              <Divider mt={0} mb={0} borderColor="gray.200" />
              <VStack
                p={0}
                mt={0}
                alignItems={'space-between'}
                justifyContent={'space-between'}
                spacing={0}
              >
                <HStack
                  justifyContent={'space-between'}
                  alignContent={'space-between'}
                >
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'space-between'}
                    justifyContent={'space-between'}
                    spacing={0}
                    w={'25vh'}
                  >
                    <HStack
                      justifyContent={'space-between'}
                      alignItems="center"
                      px={'1'}
                      mb={0}
                    >
                      <Box mb={'2'}>
                        <ValuesData
                          tagName="GC"
                          full_value={formaterNumber(
                            values?.find(({ name }) => name === 'GC CA réalisé')
                              ?.value,
                            18,
                            '#ffffff',
                            600
                          )}
                          value={abreviateNumberWithXof(
                            values?.find(({ name }) => name === 'GC CA réalisé')
                              ?.value,
                            22,
                            16,
                            '',
                            700,
                            600
                          )}
                          iconType={
                            values?.find(
                              ({ name }) => name === 'GC évol S vs S-1'
                            )?.value > 0
                              ? 'up'
                              : 'down'
                          }
                          lastVal={
                            values?.find(
                              ({ name }) => name === 'GC évol S vs S-1'
                            )?.value > 0
                              ? {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'GC évol S vs S-1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.green.green_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.s1,
                                }
                              : {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'GC évol S vs S-1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.red.red_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.s1,
                                }
                          }
                          lastVal2={
                            values?.find(({ name }) => name === 'GC TA S1')
                              ?.value > 0
                              ? {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'GC TA S1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.green.green_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.tas2,
                                }
                              : {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'GC TA S1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.red.red_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.tas2,
                                }
                          }
                          lastVal3={
                            values?.find(({ name }) => name === 'GC TA PERIODE')
                              ?.value > 0
                              ? {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'GC TA PERIODE'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.green.green_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.tap,
                                }
                              : {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'GC TA PERIODE'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.red.red_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.tap,
                                }
                          }
                        />
                      </Box>
                    </HStack>
                  </VStack>
                  <Box h={'10vh'} mt={'0'}>
                    <Divider
                      orientation="vertical"
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    spacing={0}
                    w={'25vh'}
                  >
                    <HStack
                      justifyContent={'space-between'}
                      alignItems="center"
                      px={'1'}
                      mb={0}
                    >
                      <Box mb={'2'}>
                        <ValuesData
                          tagName="PME/PMI"
                          full_value={formaterNumber(
                            values?.find(
                              ({ name }) => name === 'PME CA réalisé'
                            )?.value,
                            18,
                            '#ffffff',
                            600
                          )}
                          value={abreviateNumberWithXof(
                            values?.find(
                              ({ name }) => name === 'PME CA réalisé'
                            )?.value,
                            22,
                            16,
                            '',
                            700,
                            600
                          )}
                          iconType={
                            values?.find(
                              ({ name }) => name === 'PME évol S vs S-1'
                            )?.value > 0
                              ? 'up'
                              : 'down'
                          }
                          lastVal={
                            values?.find(
                              ({ name }) => name === 'PME évol S vs S-1'
                            )?.value > 0
                              ? {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'PME évol S vs S-1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.green.green_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.s1,
                                }
                              : {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'PME évol S vs S-1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.red.red_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.s1,
                                }
                          }
                          lastVal2={
                            values?.find(({ name }) => name === 'PME TA S1')
                              ?.value > 0
                              ? {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'PME TA S1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.green.green_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.tas2,
                                }
                              : {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'PME TA S1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.red.red_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.tas2,
                                }
                          }
                          lastVal3={
                            values?.find(
                              ({ name }) => name === 'PME TA PERIODE'
                            )?.value > 0
                              ? {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'PME TA PERIODE'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.green.green_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.tap,
                                }
                              : {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'PME TA PERIODE'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.red.red_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.tap,
                                }
                          }
                        />
                      </Box>
                    </HStack>
                  </VStack>
                  <Box h={'10vh'} mt={'0'}>
                    <Divider
                      orientation="vertical"
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    spacing={0}
                    w={'25vh'}
                  >
                    <HStack
                      justifyContent={'space-between'}
                      alignItems="center"
                      px={'1'}
                      mb={0}
                    >
                      <Box mb={'2'}>
                        <ValuesData
                          tagName="SOHO"
                          full_value={formaterNumber(
                            values?.find(
                              ({ name }) => name === 'SOHO CA réalisé'
                            )?.value,
                            18,
                            '#ffffff',
                            600
                          )}
                          value={abreviateNumberWithXof(
                            values?.find(
                              ({ name }) => name === 'SOHO CA réalisé'
                            )?.value,
                            22,
                            16,
                            '',
                            700,
                            600
                          )}
                          iconType={
                            values?.find(
                              ({ name }) => name === 'SOHO évol S vs S-1'
                            )?.value > 0
                              ? 'up'
                              : 'down'
                          }
                          lastVal={
                            values?.find(
                              ({ name }) => name === 'SOHO évol S vs S-1'
                            )?.value > 0
                              ? {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) =>
                                        name === 'SOHO évol S vs S-1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.green.green_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.s1,
                                }
                              : {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) =>
                                        name === 'SOHO évol S vs S-1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.red.red_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.s1,
                                }
                          }
                          lastVal2={
                            values?.find(({ name }) => name === 'SOHO TA S1')
                              ?.value > 0
                              ? {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'SOHO TA S1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.green.green_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.tas2,
                                }
                              : {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'SOHO TA S1'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.red.red_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.tas2,
                                }
                          }
                          lastVal3={
                            values?.find(
                              ({ name }) => name === 'SOHO TA PERIODE'
                            )?.value > 0
                              ? {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'SOHO TA PERIODE'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.green.green_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.tap,
                                }
                              : {
                                  value: numberWithBadge(
                                    values?.find(
                                      ({ name }) => name === 'SOHO TA PERIODE'
                                    )?.value,
                                    12,
                                    12,
                                    colors.colorBadge.red.red_600,
                                    600,
                                    600
                                  ),
                                  label: titles.title.label.tap,
                                }
                          }
                        />
                      </Box>
                    </HStack>
                  </VStack>
                </HStack>
              </VStack>
            </Flex>
          </GridItem>

          <GridItem
            colSpan={2}
            rowSpan={1}
            bg={gstyle.bg}
            borderRadius={gstyle.radius}
            p={gstyle.p}
          >
            {/* Content for Chiffre d'affaires */}
            <Flex mt={1} backgroundColor="" display={'block'} spacing={1}>
              <TagTitle title={"Parcs"} size={16} />
              <Divider borderColor="gray.200" ml={0} mb={0} mt={2} />
            
            {/* <Divider mt={2} mb={2} /> */}
            {/* <Box borderRadius={gstyle.radius} bgColor={'gray.100'} mt={3}> */}
            {valueGetZero(20) ? (
              <HStack
                borderRadius={gstyle.radius}
                
                justifyContent={'space-between'}
                mt={1}
                px={'1'}
                mb={0}
              >
                <Box mb={'2'}>
                  <ValuesData
                    tagName={'Mobile Hors M2M'}
                    full_value={formaterNumber(
                      values?.find(({ name }) => name == 'MOBILE HORS M2M ')
                        ?.value,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={formaterNumber(
                      values?.find(({ name }) => name == 'MOBILE HORS M2M ')
                        ?.value,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={
                      values?.find(
                        ({ name }) => name == 'MOBILE HORS M2M évol S vs S-1'
                      )?.value > 0
                        ? 'up'
                        : 'down'
                    }
                    lastVal={
                      values?.find(
                        ({ name }) => name == 'MOBILE HORS M2M évol S vs S-1'
                      )?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) =>
                                  name == 'MOBILE HORS M2M évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) =>
                                  name == 'MOBILE HORS M2M évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                    }
                    lastVal2={
                      values?.find(({ name }) => name == 'MOBILE HORS M2M TA')
                        ?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'MOBILE HORS M2M TA'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'MOBILE HORS M2M TA'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                    }
                  />
                </Box>

                <Box h={'10vh'}>
                  <Divider
                    orientation="vertical"
                    
                    borderWidth={'1px'}
                    borderColor={'gray.100'}
                  />
                </Box>
                <Box mb={'2'}>
                  <ValuesData
                    tagName={'Mobile M2M'}
                    full_value={formaterNumber(
                      values?.find(({ name }) => name == 'MOBILE M2M ')?.value,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={formaterNumber(
                      values?.find(({ name }) => name == 'MOBILE M2M ')?.value,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={
                      values?.find(
                        ({ name }) => name == 'MOBILE M2M évol S vs S-1'
                      )?.value > 0
                        ? 'up'
                        : 'down'
                    }
                    lastVal={
                      values?.find(
                        ({ name }) => name == 'MOBILE M2M évol S vs S-1'
                      )?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'MOBILE M2M évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'MOBILE M2M évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                    }
                    lastVal2={
                      values?.find(({ name }) => name == 'MOBILE M2M TA')
                        ?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'MOBILE M2M TA'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'MOBILE M2M TA'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                    }
                  />
                </Box>
                <Box h={'10vh'}>
                  <Divider
                    orientation="vertical"
                    borderWidth={'1px'}
                    borderColor={'gray.100'}
                  />
                </Box>
                <Box mb={'2'}>
                  <ValuesData
                    tagName={'Fibre FTTH'}
                    full_value={formaterNumber(
                      values?.find(({ name }) => name == 'FTTH ')?.value,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={formaterNumber(
                      values?.find(({ name }) => name == 'FTTH ')?.value,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={
                      values?.find(({ name }) => name == 'FTTH évol S vs S-1')
                        ?.value > 0
                        ? 'up'
                        : 'down'
                    }
                    lastVal={
                      values?.find(({ name }) => name == 'FTTH évol S vs S-1')
                        ?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'FTTH évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'FTTH évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                    }
                    lastVal2={
                      values?.find(({ name }) => name == 'FTTH TA')?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(({ name }) => name == 'FTTH TA')
                                ?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(({ name }) => name == 'FTTH TA')
                                ?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                    }
                  />
                </Box>
              </HStack>
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                paddingY={0}
                marginTop={10}
                SizeIcon={40}
              />
            )}
            <Divider mt={2} mb={2} borderWidth={'1px'}
                    borderColor={'gray.100'} />
            {valueGetZero(20) ? (
              <HStack
                justifyContent={'space-between'}
                alignItems="center"
                px={'1'}
                mb={0}
              >
                <Box mb={'2'}>
                  <ValuesData
                    tagName={'LS Internet'}
                    full_value={formaterNumber(
                      values?.find(({ name }) => name == 'LS INTERNET ')?.value,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={formaterNumber(
                      values?.find(({ name }) => name == 'LS INTERNET ')?.value,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={
                      values?.find(
                        ({ name }) => name == 'LS INTERNET évol S vs S-1'
                      )?.value > 0
                        ? 'up'
                        : 'down'
                    }
                    lastVal={
                      values?.find(
                        ({ name }) => name == 'LS INTERNET évol S vs S-1'
                      )?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) =>
                                  name == 'LS INTERNET évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) =>
                                  name == 'LS INTERNET évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                    }
                    lastVal2={
                      values?.find(({ name }) => name == 'LS INTERNET TA')
                        ?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'LS INTERNET TA'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'LS INTERNET TA'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                    }
                  />
                </Box>

                <Box h={'10vh'}>
                  <Divider
                    orientation="vertical"
                    
                    borderWidth={'1px'}
                    borderColor={'#ebedf2'}
                  />
                </Box>
                <Box mb={'2'}>
                  <ValuesData
                    tagName={'LS VPN'}
                    full_value={formaterNumber(
                      values?.find(({ name }) => name == 'LS VPN ')?.value,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={formaterNumber(
                      values?.find(({ name }) => name == 'LS VPN ')?.value,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={
                      values?.find(({ name }) => name == 'LS VPN évol S vs S-1')
                        ?.value > 0
                        ? 'up'
                        : 'down'
                    }
                    lastVal={
                      values?.find(({ name }) => name == 'LS VPN évol S vs S-1')
                        ?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'LS VPN évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'LS VPN évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                    }
                    lastVal2={
                      values?.find(({ name }) => name == 'LS VPN TA')?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(({ name }) => name == 'LS VPN TA')
                                ?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(({ name }) => name == 'LS VPN TA')
                                ?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                    }
                  />
                </Box>
                <Box h={'10vh'}>
                  <Divider
                    orientation="vertical"
                   
                    borderWidth={'1px'}
                    borderColor={'#ebedf2'}
                  />
                </Box>
                <Box mb={'2'}>
                  <ValuesData
                    tagName={'Jamono Pro'}
                    full_value={formaterNumber(
                      values?.find(({ name }) => name == 'JAMONO PRO ')?.value,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={formaterNumber(
                      values?.find(({ name }) => name == 'JAMONO PRO ')?.value,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={
                      values?.find(
                        ({ name }) => name == 'JAMONO PRO évol S vs S-1'
                      )?.value > 0
                        ? 'up'
                        : 'down'
                    }
                    lastVal={
                      values?.find(
                        ({ name }) => name == 'JAMONO PRO évol S vs S-1'
                      )?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'JAMONO PRO évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'JAMONO PRO évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                    }
                    lastVal2={
                      values?.find(({ name }) => name == 'JAMONO PRO TA')
                        ?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'JAMONO PRO TA'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'JAMONO PRO TA'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                    }
                  />
                </Box>
              </HStack>
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                paddingY={0}
                marginTop={10}
                SizeIcon={40}
              />
            )}
            {/*  </Box> */}
            <Divider mt={0} mb={0} />
            {valueGetZero(20) ? (
              <HStack
                justifyContent={'space-between'}
                alignItems="center"
                px={'1'}
                mb={0}
              >
                <Box mb={'2'}>
                  <ValuesData
                    tagName={'Data Mobile'}
                    full_value={formaterNumber(
                      values?.find(({ name }) => name == 'DATA MOBILE ')?.value,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={formaterNumber(
                      values?.find(({ name }) => name == 'DATA MOBILE ')?.value,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={
                      values?.find(
                        ({ name }) => name == 'DATA MOBILE évol S vs S-1'
                      )?.value > 0
                        ? 'up'
                        : 'down'
                    }
                    lastVal={
                      values?.find(
                        ({ name }) => name == 'DATA MOBILE évol S vs S-1'
                      )?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) =>
                                  name == 'DATA MOBILE évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) =>
                                  name == 'DATA MOBILE évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                    }
                    lastVal2={
                      values?.find(({ name }) => name == 'DATA MOBILE TA')
                        ?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'DATA MOBILE TA'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'DATA MOBILE TA'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                    }
                  />
                </Box>

                <Box h={'10vh'}>
                  <Divider
                    orientation="vertical"
                    
                    borderWidth={'1px'}
                    borderColor={'#ebedf2'}
                  />
                </Box>
                <Box mb={'2'}>
                  <ValuesData
                    tagName={'ADSL + Flybox'}
                    full_value={formaterNumber(
                      values?.find(({ name }) => name == 'ADSL & FLYBOX ')
                        ?.value,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={formaterNumber(
                      values?.find(({ name }) => name == 'ADSL & FLYBOX ')
                        ?.value,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={
                      values?.find(({ name }) => name == 'ADSL & FLYBOX ')
                        ?.value > 0
                        ? 'up'
                        : 'down'
                    }
                    lastVal={
                      values?.find(
                        ({ name }) => name == 'ADSL & FLYBOX évol S vs S-1'
                      )?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) =>
                                  name == 'ADSL & FLYBOX évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) =>
                                  name == 'ADSL & FLYBOX évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                    }
                    lastVal2={
                      values?.find(({ name }) => name == 'ADSL & FLYBOX TA')
                        ?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'ADSL & FLYBOX TA'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'ADSL & FLYBOX TA'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                    }
                  />
                </Box>
                <Box h={'10vh'}>
                  <Divider
                    orientation="vertical"
                    
                    borderWidth={'1px'}
                    borderColor={'#ebedf2'}
                  />
                </Box>
                <Box mb={'2'}>
                  <ValuesData
                    tagName={'4G'}
                    full_value={formaterNumber(
                      values?.find(({ name }) => name == 'CLIENTS ACTIFS 4G ')
                        ?.value,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={formaterNumber(
                      values?.find(({ name }) => name == 'CLIENTS ACTIFS 4G ')
                        ?.value,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={
                      values?.find(
                        ({ name }) => name == 'CLIENTS ACTIFS 4G évol S vs S-1'
                      )?.value > 0
                        ? 'up'
                        : 'down'
                    }
                    lastVal={
                      values?.find(
                        ({ name }) => name == 'CLIENTS ACTIFS 4G évol S vs S-1'
                      )?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) =>
                                  name == 'CLIENTS ACTIFS 4G évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) =>
                                  name == 'CLIENTS ACTIFS 4G évol S vs S-1'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                    }
                    lastVal2={
                      values?.find(({ name }) => name == 'CLIENTS ACTIFS 4G TA')
                        ?.value > 0
                        ? {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'CLIENTS ACTIFS 4G TA'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                        : {
                            value: numberWithBadge(
                              values?.find(
                                ({ name }) => name == 'CLIENTS ACTIFS 4G TA'
                              )?.value,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.tas2,
                          }
                    }
                  />
                </Box>
              </HStack>
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                paddingY={0}
                marginTop={10}
                SizeIcon={40}
              />
            )}
         </Flex>
          </GridItem>

          <GridItem
            rowSpan={3}
            colSpan={2}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
            overflowY="auto"
            css={scroll_customize}
          >
            <Box>
              <TagTitle
                title={
                  "Histogrammes sur l'évolution du parc, des ventes et réalisations"
                }
                size={16}
              />
            </Box>
            <Divider mb={2} mt={3} />
            <Box>
              <TabsPanelItem
                fSize={'12px'}
                w1={'100%'}
                h1={'350px'}
                title1={'Parc FTTH vs Objectif'}
                w2={'100%'}
                h2={'350px'}
                tab1={<VerticalBarChartDmc selectedWeek={selectedWeek} />}
                title2={'Ventes vs Résiliations'}
                tab2={
                  <VerticalBarChartVentesVsResiliations
                    selectedWeek={selectedWeek}
                  />
                }
              />
            </Box>
          </GridItem>

          {/* Second row */}

          <GridItem
            rowSpan={3}
            colSpan={2}
            p={1}
            bg={gstyle.bg_h}
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
    </>
  );
}
