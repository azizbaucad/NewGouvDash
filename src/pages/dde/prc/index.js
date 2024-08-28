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
import { HorizontalBarChart } from '@components/common/charts/barcharts';
import { scroll_customize } from '@components/common/styleprops';
import {
  LineCharts,
  LineChartsCAFixe,
  LineChartsCAPrc,
  LineChartsPrc,
  LineChartsMobileDv,
  LineChartsNpsPrc,
  LineChartsParcMobile,
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
import DdeDmcPage from '../dmc';

export default function DdePrcPage(props) {
  //Faire passer selectedWeek en tant que props
  const { selectedWeek } = props;

  const gstyle = gird.style;
  const { ddeprc, dde } = direction;
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
      .catch((error) => {});
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
    console.log('datas  --- ', datas);
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
        direction={ddeprc}
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
        direction={ddeprc}
        getHightlight={getHightlight}
      />

      <CSVReaderModal
        onOpen={onOpenCSVR}
        onClose={onCloseCSVR}
        isOpen={isOpenCSVR}
        saveData={saveDdeData}
        obj={ddeModel}
        direction={ddeprc}
        week={selectedWeek}
        addRef={true}
      />

      <Stack p={0} w={'100%'}>
        <Grid
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={2}
          h={'740px'}
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
                    <Text color="#000000" fontWeight={620} fontSize={14}>
                      CSAT Global
                    </Text>
                    <Divider
                      borderColor="gray.200"
                      ml={0}
                      mb={0}
                      mt={2}
                      w={'15vh'}
                    />

                    <HStack
                      justifyContent={'space-between'}
                      alignContent={'center'}
                      alignItems={'center'}
                    >
                      <ValuesData
                        full_value={formaterNumber(
                          values?.find(({ name }) => name == 'CSAT')?.value,
                          18,
                          '#ffffff',
                          600
                        )}
                        value={numberWithBadge(
                          values?.find(({ name }) => name == 'CSAT')?.value,
                          22,
                          16,
                          '',
                          700,
                          600
                        )}
                        iconType={
                          values?.find(({ name }) => name == 'CSAT OBJ')
                            ?.value > 0
                            ? 'up'
                            : 'down'
                        }
                        delta={
                          values?.find(({ name }) => name == 'CSAT OBJ')
                            ?.value > 0
                            ? {
                                value: numberWithBadge(
                                  values?.find(({ name }) => name == 'CSAT OBJ')
                                    ?.value,
                                  12,
                                  12,
                                  colors.colorBadge.green.green_600,
                                  600,
                                  600
                                ),
                                label: titles.title.label.obj,
                              }
                            : {
                                value: numberWithBadge(
                                  values?.find(({ name }) => name == 'CSAT OBJ')
                                    ?.value,
                                  12,
                                  12,
                                  colors.colorBadge.red.red_600,
                                  600,
                                  600
                                ),
                                label: titles.title.label.obj,
                              }
                        }
                      />
                    </HStack>
                  </VStack>
                  <Box h={'8vh'} mt={'5'}>
                    <Divider
                      orientation="vertical"
                      ml={0}
                      mr={0}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'start'}
                    justifyContent={'space-between'}
                    spacing={0}
                  >
                    <Text color="#000000" fontWeight={620} fontSize={14}>
                      DSAT Global
                    </Text>
                    <Divider
                      borderColor="gray.200"
                      ml={0}
                      mb={0}
                      mt={2}
                      w={'15vh'}
                    />

                    <ValuesData
                      full_value={formaterNumber(
                        values?.find(({ name }) => name == 'DCSAT')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={numberWithBadge(
                        values?.find(({ name }) => name == 'DCSAT')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'DCSAT OBJ')?.value >
                        0
                          ? 'up'
                          : 'down'
                      }
                      delta={
                        values?.find(({ name }) => name == 'DCSAT OBJ')?.value >
                        0
                          ? {
                              value: numberWithBadge(
                                values?.find(({ name }) => name == 'DCSAT OBJ')
                                  ?.value,
                                12,
                                12,
                                colors.colorBadge.green.green_600,
                                600,
                                600
                              ),
                              label: titles.title.label.obj,
                            }
                          : {
                              value: numberWithBadge(
                                values?.find(({ name }) => name == 'DCSAT OBJ')
                                  ?.value,
                                12,
                                12,
                                colors.colorBadge.red.red_600,
                                600,
                                600
                              ),
                              label: titles.title.label.obj,
                            }
                      }
                    />
                  </VStack>
                  
                </HStack>
              </VStack>
              <Divider mt={3} mb={3} borderColor="gray.200" />

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
                    <Text color="#000000" fontWeight={620} fontSize={14}>
                      ON TIME
                    </Text>
                    <Divider
                      borderColor="gray.200"
                      ml={0}
                      mb={0}
                      mt={2}
                      w={'15vh'}
                    />

                    <HStack
                      justifyContent={'space-between'}
                      alignContent={'center'}
                      alignItems={'center'}
                    >
                      <ValuesData
                        full_value={formaterNumber(
                          values?.find(({ name }) => name == 'CSAT')?.value,
                          18,
                          '#ffffff',
                          600
                        )}
                        value={numberWithBadge(
                          values?.find(({ name }) => name == 'CSAT')?.value,
                          22,
                          16,
                          '',
                          700,
                          600
                        )}
                        iconType={
                          values?.find(({ name }) => name == 'CSAT OBJ')
                            ?.value > 0
                            ? 'up'
                            : 'down'
                        }
                        delta={
                          values?.find(({ name }) => name == 'CSAT OBJ')
                            ?.value > 0
                            ? {
                                value: numberWithBadge(
                                  values?.find(({ name }) => name == 'CSAT OBJ')
                                    ?.value,
                                  12,
                                  12,
                                  colors.colorBadge.green.green_600,
                                  600,
                                  600
                                ),
                                label: titles.title.label.obj,
                              }
                            : {
                                value: numberWithBadge(
                                  values?.find(({ name }) => name == 'CSAT OBJ')
                                    ?.value,
                                  12,
                                  12,
                                  colors.colorBadge.red.red_600,
                                  600,
                                  600
                                ),
                                label: titles.title.label.obj,
                              }
                        }
                      />
                    </HStack>
                  </VStack>
                  <Box h={'8vh'} mt={'5'}>
                    <Divider
                      orientation="vertical"
                      ml={0}
                      mr={0}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'start'}
                    justifyContent={'space-between'}
                    spacing={0}
                  >
                    <Text color="#000000" fontWeight={620} fontSize={14}>
                      Time To Bill
                    </Text>
                    <Divider
                      borderColor="gray.200"
                      ml={0}
                      mb={0}
                      mt={2}
                      w={'15vh'}
                    />

                    <ValuesData
                      full_value={formaterNumber(
                        values?.find(({ name }) => name == 'DCSAT')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={numberWithBadge(
                        values?.find(({ name }) => name == 'DCSAT')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'DCSAT OBJ')?.value >
                        0
                          ? 'up'
                          : 'down'
                      }
                      delta={
                        values?.find(({ name }) => name == 'DCSAT OBJ')?.value >
                        0
                          ? {
                              value: numberWithBadge(
                                values?.find(({ name }) => name == 'DCSAT OBJ')
                                  ?.value,
                                12,
                                12,
                                colors.colorBadge.green.green_600,
                                600,
                                600
                              ),
                              label: titles.title.label.obj,
                            }
                          : {
                              value: numberWithBadge(
                                values?.find(({ name }) => name == 'DCSAT OBJ')
                                  ?.value,
                                12,
                                12,
                                colors.colorBadge.red.red_600,
                                600,
                                600
                              ),
                              label: titles.title.label.obj,
                            }
                      }
                    />
                  </VStack>
                  <Box h={'8vh'} mt={'5'}>
                    <Divider
                      orientation="vertical"
                      ml={0}
                      mr={0}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'start'}
                    justifyContent={'space-between'}
                    spacing={0}
                  >
                    <Text color="#000000" fontWeight={620} fontSize={14}>
                      Taux de relève
                    </Text>
                    <Divider
                      borderColor="gray.200"
                      ml={0}
                      mb={0}
                      mt={2}
                      w={'15vh'}
                    />

                    <ValuesData
                      full_value={formaterNumber(
                        values?.find(({ name }) => name == 'DCSAT')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={numberWithBadge(
                        values?.find(({ name }) => name == 'DCSAT')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'DCSAT OBJ')?.value >
                        0
                          ? 'up'
                          : 'down'
                      }
                      delta={
                        values?.find(({ name }) => name == 'DCSAT OBJ')?.value >
                        0
                          ? {
                              value: numberWithBadge(
                                values?.find(({ name }) => name == 'DCSAT OBJ')
                                  ?.value,
                                12,
                                12,
                                colors.colorBadge.green.green_600,
                                600,
                                600
                              ),
                              label: titles.title.label.obj,
                            }
                          : {
                              value: numberWithBadge(
                                values?.find(({ name }) => name == 'DCSAT OBJ')
                                  ?.value,
                                12,
                                12,
                                colors.colorBadge.red.red_600,
                                600,
                                600
                              ),
                              label: titles.title.label.obj,
                            }
                      }
                    />
                  </VStack>
                </HStack>
              </VStack>
              <SimpleGrid
                columns={{ base: 1, md: 3, lg: 2 }}
                spacing={1}
                mb={1}
              ></SimpleGrid>
            </Flex>
          </GridItem>

          <GridItem
            rowSpan={0}
            colSpan={2}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            <Flex mt={1} backgroundColor="" display={'block'} spacing={1}>
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
                    <Text color="#000000" fontWeight={620} fontSize={14}>
                      TSAT Global
                    </Text>
                    <Divider
                      borderColor="gray.200"
                      ml={0}
                      mb={0}
                      mt={2}
                      w={'15vh'}
                    />

                    <HStack
                      justifyContent={'space-between'}
                      alignContent={'center'}
                      alignItems={'center'}
                    >
                      <ValuesData
                        full_value={formaterNumber(
                          values?.find(({ name }) => name == 'TSAT ')?.value,
                          18,
                          '#ffffff',
                          600
                        )}
                        value={numberWithBadge(
                          values?.find(({ name }) => name == 'TSAT ')?.value,
                          22,
                          16,
                          '',
                          700,
                          600
                        )}
                        iconType={
                          values?.find(({ name }) => name == 'TSAT OBJ')
                            ?.value > 0
                            ? 'up'
                            : 'down'
                        }
                        delta={
                          values?.find(({ name }) => name == 'TSAT OBJ')
                            ?.value > 0
                            ? {
                                value: numberWithBadge(
                                  values?.find(({ name }) => name == 'TSAT OBJ')
                                    ?.value,
                                  12,
                                  12,
                                  colors.colorBadge.green.green_600,
                                  600,
                                  600
                                ),
                                label: titles.title.label.obj,
                              }
                            : {
                                value: numberWithBadge(
                                  values?.find(({ name }) => name == 'TSAT OBJ')
                                    ?.value,
                                  12,
                                  12,
                                  colors.colorBadge.red.red_600,
                                  600,
                                  600
                                ),
                                label: titles.title.label.obj,
                              }
                        }
                      />
                    </HStack>
                  </VStack>
                  <Box h={'8vh'} mt={'5'}>
                    <Divider
                      orientation="vertical"
                      ml={0}
                      mr={0}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'start'}
                    justifyContent={'space-between'}
                    spacing={0}
                  >
                    <Text color="#000000" fontWeight={620} fontSize={14}>
                      CES Global
                    </Text>
                    <Divider
                      borderColor="gray.200"
                      ml={0}
                      mb={0}
                      mt={2}
                      w={'15vh'}
                    />

                    <ValuesData
                      full_value={formaterNumber(
                        values?.find(({ name }) => name == 'CES')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={numberWithBadge(
                        values?.find(({ name }) => name == 'CES')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'CES OBJ')?.value > 0
                          ? 'up'
                          : 'down'
                      }
                      delta={
                        values?.find(({ name }) => name == 'CES OBJ')?.value > 0
                          ? {
                              value: numberWithBadge(
                                values?.find(({ name }) => name == 'CES OBJ')
                                  ?.value,
                                12,
                                12,
                                colors.colorBadge.green.green_600,
                                600,
                                600
                              ),
                              label: titles.title.label.obj,
                            }
                          : {
                              value: numberWithBadge(
                                values?.find(({ name }) => name == 'CES OBJ')
                                  ?.value,
                                12,
                                12,
                                colors.colorBadge.red.red_600,
                                600,
                                600
                              ),
                              label: titles.title.label.obj,
                            }
                      }
                    />
                  </VStack>
                </HStack>
              </VStack>

              <Divider mt={3} mb={2} borderColor="gray.200" />

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
                    <Text color="#000000" fontWeight={620} fontSize={14}>
                      CA Recouvré
                    </Text>
                    <Divider
                      borderColor="gray.200"
                      ml={0}
                      mb={0}
                      mt={2}
                      w={'15vh'}
                    />

                    <HStack
                      justifyContent={'space-between'}
                      alignContent={'center'}
                      alignItems={'center'}
                    >
                      <ValuesData
                        full_value={formaterNumber(
                          values?.find(({ name }) => name == 'CA_RECOUVRE')
                            ?.value,
                          18,
                          '#ffffff',
                          600
                        )}
                        value={abreviateNumberWithXof(
                          values?.find(({ name }) => name == 'CA_RECOUVRE')
                            ?.value,
                          22,
                          16,
                          '',
                          700,
                          600
                        )}
                        iconType={
                          values?.find(
                            ({ name }) => name == 'CA_RECOUVRE évol S vs S-1'
                          )?.value > 0
                            ? 'up'
                            : 'down'
                        }
                        delta={
                          values?.find(({ name }) => name == 'CA_RECOUVRE OBJ')
                            ?.value > 0
                            ? {
                                value: numberWithBadge(
                                  values?.find(
                                    ({ name }) => name == 'CA_RECOUVRE OBJ'
                                  )?.value,
                                  12,
                                  12,
                                  colors.colorBadge.green.green_600,
                                  600,
                                  600
                                ),
                                label: titles.title.label.obj,
                              }
                            : {
                                value: numberWithBadge(
                                  values?.find(
                                    ({ name }) => name == 'CA_RECOUVRE OBJ'
                                  )?.value,
                                  12,
                                  12,
                                  colors.colorBadge.red.red_600,
                                  600,
                                  600
                                ),
                                label: titles.title.label.obj,
                              }
                        }
                        lastVal={
                          values?.find(
                            ({ name }) => name == 'CA_RECOUVRE évol S vs S-1'
                          )?.value > 0
                            ? {
                                value: numberWithBadge(
                                  values?.find(
                                    ({ name }) =>
                                      name == 'CA_RECOUVRE évol S vs S-1'
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
                                      name == 'CA_RECOUVRE évol S vs S-1'
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
                    </HStack>
                  </VStack>
                  <Box h={'8vh'} mt={'5'}>
                    <Divider
                      orientation="vertical"
                      ml={0}
                      mr={0}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'start'}
                    justifyContent={'space-between'}
                    spacing={0}
                  >
                    <Text color="#000000" fontWeight={620} fontSize={14}>
                      NPS
                    </Text>
                    <Divider
                      borderColor="gray.200"
                      ml={0}
                      mb={0}
                      mt={2}
                      w={'15vh'}
                    />

                    <ValuesData
                      full_value={formaterNumber(
                        values?.find(({ name }) => name == 'NPS')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={abreviateNumberWithXof(
                        values?.find(({ name }) => name == 'NPS')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'NPS évol S vs S-1')
                          ?.value > 0
                          ? 'up'
                          : 'down'
                      }
                      delta={
                        values?.find(({ name }) => name == 'NPS OBJ')?.value > 0
                          ? {
                              value: numberWithBadge(
                                values?.find(({ name }) => name == 'NPS OBJ')
                                  ?.value,
                                12,
                                12,
                                colors.colorBadge.green.green_600,
                                600,
                                600
                              ),
                              label: titles.title.label.obj,
                            }
                          : {
                              value: numberWithBadge(
                                values?.find(({ name }) => name == 'NPS OBJ')
                                  ?.value,
                                12,
                                12,
                                colors.colorBadge.red.red_600,
                                600,
                                600
                              ),
                              label: titles.title.label.obj,
                            }
                      }
                      lastVal={
                        values?.find(({ name }) => name == 'NPS évol S vs S-1')
                          ?.value > 0
                          ? {
                              value: numberWithBadge(
                                values?.find(
                                  ({ name }) => name == 'NPS évol S vs S-1'
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
                                  ({ name }) => name == 'NPS évol S vs S-1'
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
                  </VStack>
                </HStack>
              </VStack>

              {/*  <Divider mt={0} mb={0} borderColor="gray.200" /> */}
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
                title={'Evolution des instances, MSV, NPS et CA recouvré'}
                size={16}
              />
            </Box>
            <Divider mb={2} mt={3} />
            <Box>
              <TabsPanelItem
              fSize={'12px'}
              w1={'100%'}
              h1={'250px'}
                title1={'Instances vs MSV'}
                tab1={
                  <LineChartsPrc
                    selectedWeek={selectedWeek}
                    key1="INSTANCES"
                    key2="Mise en service"
                    name_1="Instances"
                    name_2="MSV"
                  />
                }
                w2={'100%'}
                h2={'250px'}
                title2={'NPS Recouvré vs Obj.'}
                tab2={
                  <LineChartsPrc
                    selectedWeek={selectedWeek}
                    key1="NPS"
                    key2="NPS OBJ EN VALEUR ABSOLUE"
                    name_1="NPS"
                    name_2="Obj."
                  />
                }
                w3={'100%'}
                h3={'250px'}
                title3={'CA Recouvré vs Obj.'}
                tab3={
                  <LineChartsPrc
                    selectedWeek={selectedWeek}
                    key1="CA_RECOUVRE"
                    key2="CA_RECOUVRE OBJ EN VALEUR ABSOLUE"
                    name_1="CA Recouvré"
                    name_2="Obj."
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
