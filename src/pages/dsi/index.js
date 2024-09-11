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
  VerticalBarChart,
} from '@components/common/charts/barcharts';
import { scroll_customize } from '@components/common/styleprops';
import {
  LineCharts,
  LineChartsCAFixe,
  LineChartsFibreDsi,
  LineChartsFibreDv,
  GlobalLineChartsDsi,
  LineChartsMobileDsi,
  LineChartsMobileDv,
  LineChartsOMDv,
  LineChartsParcMobile,
} from '@components/common/charts/linecharts';
import { ListSemaineItem } from '@components/common/dropdown_item';
import { TabsPanelItem, TabsPanelItemVertical, TabsPanelItemVerticalOptimized } from '@components/common/tabs';
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
import { RefactoringStackedBarChart } from '@components/common/charts/stackedbarcharts';

export default function DsiPage(props) {
  const gstyle = gird.style;
  const { dsi } = direction;
  const {
    onOpen: onOpenFm,
    isOpen: isOpenFm,
    onClose: onCloseFm,
  } = useDisclosure();
  const {
    onOpen: onCopyOpen,
    isOpen: isCopyOpen,
    onClose: onCopyClose,
  } = useDisclosure();

  const toast = useToast();

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
  const [selectedWeek, setSelectedWeek] = useState(lastWeek);
  const [values, setValues] = useState();

  const initData = {
    id_: 0,
    Kibur: null,
    Simur: null,
    Omur: null,
    Nesur: null,
    Ovtour: null,
    Omdistrur: null,
    Botmessengerur: null,
    Maxitur: null,
    Kaabuur: null,
    Botwhatsappur: null,
  };

  const [data, setData] = useState(initData);

  const getValuesData = () => {
    const params =
      '/' + selectedWeek?.split('-')[0] + '/' + selectedWeek?.split('-')[1];
    getElement('v1/direction-data/' + dsi.id + params)
      .then((res) => {
        if (res?.data) {
          setValues(res?.data);
          setData({
            Omur: res.data.find((item) => item.name === 'OMUR').value,
            Kibur: res.data.find((item) => item.name === 'KIBUR').value,
            Simur: res.data.find((item) => item.name === 'SIMUR').value,
            Nesur: res.data.find((item) => item.name === 'NESUR').value,
            Ovtour: res.data.find((item) => item.name === 'OVTO_UR').value,
            Omdistrur: res.data.find((item) => item.name === 'OMDISTR_UR')
              .value,
            Botmessengerur: res.data.find(
              (item) => item.name === 'BOT_MESSENGER_UR'
            ).value,
            Kaabuur: res.data.find((item) => item.name === 'KAABU_UR').value,
            Botwhatsappur: res.data.find(
              (item) => item.name === 'BOT_WHATSAPP_UR'
            ).value,
            Maxitur: res.data.find((item) => item.name === 'MAXIT_UR').value,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GaurData = [
    {
      id: 1,
      part: 'Omur',
      percent: parseInt(data.Omur),
    },
    {
      id: 2,
      part: 'Kibur',
      percent: parseInt(data.Kibur),
    },
    {
      id: 3,
      part: 'Simur',
      percent: parseInt(data.Simur),
    },
    {
      id: 4,
      part: 'Nesur',
      percent: parseInt(data.Nesur),
    },
    {
      id: 5,
      part: 'Ovto',
      percent: parseInt(data.Ovtour),
    },
    {
      id: 6,
      part: 'Omdistr',
      percent: parseInt(data.Omdistrur),
    },
    {
      id: 7,
      part: 'Messenger',
      percent: parseInt(data.Botmessengerur),
    },
    {
      id: 8,
      part: 'Kaabu',
      percent: parseInt(data.Kaabuur),
    },
    {
      id: 9,
      part: 'Whatsapp',
      percent: parseInt(data.Botwhatsappur),
    },
    {
      id: 10,
      part: 'Maxit',
      percent: parseInt(data.Maxitur),
    },
  ];

  const getHightlight = () => {
    getHightlightData(
      selectedWeek?.split('-')[0],
      selectedWeek?.split('-')[1],
      dsi.id,
      setHighlights,
      setError
    );
  };

  useEffect(() => {
    getHightlight();
    getValuesData();
    GaurData;
  }, [selectedWeek]);

  const data_ = {
    labels: GaurData?.map((item) => item.part),
    datasets: [
      {
        barThickness: GaurData?.map((item) => (isNaN(item.percent) ? 0 : 18)),
        barPercentage: 0,
        label: 'Part de l\'application',
        data: GaurData?.map((item) => (isNaN(item.percent) ? 0 : item.percent)),
        backgroundColor: ['#4cc4c4'],
      },
    ],
  };

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

  const tabData = [
    { title: 'Gaur', content: <VerticalBarChart chartData={data_} />, w: '100%', h: '350px' },
    { title: 'Kibur', content: <GlobalLineChartsDsi selectedWeek={selectedWeek} name_="Kibur" key_="KIBUR" />, w: '100%', h: '350px' },
    { title: 'Simur', content: <GlobalLineChartsDsi selectedWeek={selectedWeek} name_="Simur" key_="SIMUR" />, w: '100%', h: '350px' },
    { title: 'Omur', content: <GlobalLineChartsDsi selectedWeek={selectedWeek} name_="Omur" key_="OMUR" />, w: '100%', h: '350px' },
    { title: 'Nesur', content: <GlobalLineChartsDsi selectedWeek={selectedWeek} name_="Nesur" key_="NESUR" />, w: '100%', h: '350px' },
    { title: 'Ovtour', content: <GlobalLineChartsDsi selectedWeek={selectedWeek} name_="Ovtour" key_="OVTO_UR" />, w: '100%', h: '350px' },
    { title: 'Maxitur', content: <GlobalLineChartsDsi selectedWeek={selectedWeek} name_="Maxitur" key_="MAXIT_UR" />, w: '100%', h: '350px' },
    { title: 'Kaabuur', content: <GlobalLineChartsDsi selectedWeek={selectedWeek} name_="Kaabuur" key_="KAABU_UR" />, w: '100%', h: '350px' },
    { title: 'Omdistrur', content: <GlobalLineChartsDsi selectedWeek={selectedWeek} name_="Omdistrur" key_="OMDISTR_UR" />, w: '100%', h: '350px' },
    { title: 'Botmessengerur', content: <GlobalLineChartsDsi selectedWeek={selectedWeek} name_="Bot messengerur" key_="BOT_MESSENGER_UR" />, w: '100%', h: '350px' },
    { title: 'Botwhatsappur', content: <GlobalLineChartsDsi selectedWeek={selectedWeek} name_="Bot whatsappur" key_="BOT_WHATSAPP_UR" />, w: '100%', h: '350px' },
  ];
  


  

  return (
    <DashboardLayout activeMenu={'account-dsi'}>
      <HighlightModal
        onOpen={onOpenFm}
        onClose={onCloseFm}
        isOpen={isOpenFm}
        weekListOption={currentWeekList}
        highlightStatus={highlightStatus}
        getHightlight={getHightlight}
        direction={dsi}
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        selectedHighlight={selectedHighlight}
      />

      <CopyHighlightModal
        onOpen={onCopyOpen}
        onClose={onCopyClose}
        isOpen={isCopyOpen}
        weekListOption={currentWeekList}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        direction={dsi}
        getHightlight={getHightlight}
      />

      <Flex mt={3} px={2} w={'100%'} mb={0}>
        <Box>
          <PageTitle
            titleSize={17}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={14}
            icon={dsi.icon}
            title={dsi.label}
            subtitle={' / ' + dsi.description}
          />
        </Box>
        <Spacer />
        <Box mr={2}>
          <DMenuButton
            onChange={onDMenuChange}
            name={'Nouvelle taches'}
            rightIcon={<BsPlusLg />}
            menus={[
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
        </Box>
        <ListSemaineItem
          onWeekSelect={setSelectedWeek}
          selectedWeek={selectedWeek}
        />
      </Flex>

      <Stack p={3} w={'100%'}>
        <Grid
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={2}
          h={'700px'}
        >
          {/* First row */}
          <GridItem
            colSpan={2}
            rowSpan={1}
            bg={gstyle.bg}
            borderRadius={gstyle.radius}
            p={2}
          >
            <Flex backgroundColor="" display={'block'} spacing={0} p={1}>
              <VStack 
                p={1}
                mb={1}
                mt={0}
                alignItems={'space-between'}
                justifyContent={'space-between'}
              >
                <HStack
                  justifyContent={'space-between'}
                  alignContent={'space-between'}
                >
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'start'}
                    justifyContent={'space-between'}
                    spacing={0}
                  >
                    <Text
                      color="#000000"
                      fontWeight={620}
                      fontSize={14}
                      textTransform={'uppercase'}
                    >
                      gaur
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
                        values?.find(({ name }) => name == 'GAUR')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        values?.find(({ name }) => name == 'GAUR')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'GAUR')?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </VStack>
                  <Box h={'6vh'}>
                    <Divider
                      orientation="vertical"
                      mt={4}
                      ml={0}
                      mr={0}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'end'}
                    justifyContent={'space-between'}
                    spacing={0}
                  >
                    <Text
                      color="#000000"
                      fontWeight={620}
                      fontSize={14}
                      textTransform={'uppercase'}
                    >
                      kibur
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
                        values?.find(({ name }) => name == 'KIBUR')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        values?.find(({ name }) => name == 'KIBUR')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'KIBUR')?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </VStack>
                </HStack>
              </VStack>

              <Divider mt={3} mb={3} />

              <VStack
                p={1}
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
                    alignItems={'start'}
                    justifyContent={'space-between'}
                    spacing={0}
                  >
                    <Text
                      color="#000000"
                      fontWeight={620}
                      fontSize={14}
                      textTransform={'uppercase'}
                      mt={1}
                    >
                      simur
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
                        values?.find(({ name }) => name == 'SIMUR')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        values?.find(({ name }) => name == 'SIMUR')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'SIMUR')?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </VStack>
                  <Box h={'5vh'}>
                    <Divider
                      orientation="vertical"
                      mt={5}
                      ml={0}
                      mr={0}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack p={1} mb={1} alignItems={'center'} spacing={0}>
                    <Text
                      color="#000000"
                      fontWeight={620}
                      fontSize={14}
                      textTransform={'uppercase'}
                      mr={7}
                    >
                      omur
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
                        values?.find(({ name }) => name == 'OMUR')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        values?.find(({ name }) => name == 'OMUR')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'OMUR')?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </VStack>
                  <Box h={'5vh'}>
                    <Divider
                      orientation="vertical"
                      mt={5}
                      ml={0}
                      mr={0}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'end'}
                    justifyContent={'space-between'}
                    spacing={0}
                  >
                    <Text
                      color="#000000"
                      fontWeight={620}
                      fontSize={14}
                      textTransform={'uppercase'}
                    >
                      nesur
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
                        values?.find(({ name }) => name == 'NESUR')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        values?.find(({ name }) => name == 'NESUR')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'NESUR')?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </VStack>
                </HStack>
              </VStack>
              {/* Insert The New Simplegrid here*/}
            </Flex>
          </GridItem>

          <GridItem
            rowSpan={1}
            colSpan={2}
            bg={gstyle.bg}
            p={1}
            borderRadius={gstyle.radius}
          >
            <Flex backgroundColor="" display={'block'} spacing={0} p={1}>
              <VStack
                p={1}
                mb={1}
                mt={1}
                alignItems={'space-between'}
                justifyContent={'space-between'}
                spacing={0}
              >
                <HStack
                  justifyContent={'space-between'}
                  alignContent={'space-between'}
                >
                  <VStack p={1} mb={1} alignItems={'start'} spacing={0}>
                    <Text
                      color="#000000"
                      fontWeight={620}
                      fontSize={14}
                      textTransform={'uppercase'}
                    >
                      ovtour
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
                        values?.find(({ name }) => name == 'OVTO_UR')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        values?.find(({ name }) => name == 'OVTO_UR')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'OVTO_UR')?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </VStack>
                  <Box h={'5vh'}>
                    <Divider
                      orientation="vertical"
                      mt={5}
                      ml={0}
                      mr={0}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack p={1} mb={1} alignItems={'center'} spacing={0}>
                    <Text
                      color="#000000"
                      fontWeight={620}
                      fontSize={14}
                      textTransform={'uppercase'}
                      mr={7}
                    >
                      omdistrur
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
                        values?.find(({ name }) => name == 'OMDISTR_UR')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        values?.find(({ name }) => name == 'OMDISTR_UR')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'OMDISTR_UR')
                          ?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </VStack>
                  <Box h={'5vh'}>
                    <Divider
                      orientation="vertical"
                      mt={5}
                      ml={0}
                      mr={0}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'end'}
                    justifyContent={'space-between'}
                    spacing={0}
                  >
                    <Text
                      color="#000000"
                      fontWeight={620}
                      fontSize={14}
                      textTransform={'uppercase'}
                      
                    >
                      bot messenger ur
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
                        values?.find(({ name }) => name == 'BOT_MESSENGER_UR')
                          ?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        values?.find(({ name }) => name == 'BOT_MESSENGER_UR')
                          ?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'BOT_MESSENGER_UR')
                          ?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </VStack>
                </HStack>
              </VStack>

              <Divider mt={3} mb={3} />

              <VStack
                p={1}
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
                    alignItems={'start'}
                    justifyContent={'space-between'}
                    spacing={0}
                  >
                    <Text
                      color="#000000"
                      fontWeight={620}
                      fontSize={14}
                      textTransform={'uppercase'}
                      mt={1}
                    >
                      maxitur
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
                        values?.find(({ name }) => name == 'MAXIT_UR')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        values?.find(({ name }) => name == 'MAXIT_UR')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'MAXIT_UR')?.value >
                        0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </VStack>
                  <Box h={'5vh'}>
                    <Divider
                      orientation="vertical"
                      mt={5}
                      ml={0}
                      mr={0}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack p={1} mb={1} alignItems={'center'} spacing={0}>
                    <Text
                      color="#000000"
                      fontWeight={620}
                      fontSize={14}
                      textTransform={'uppercase'}
                      mr={7}
                    >
                      kaabuur
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
                        values?.find(({ name }) => name == 'KAABU_UR')?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        values?.find(({ name }) => name == 'KAABU_UR')?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'KAABU_UR')?.value >
                        0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </VStack>
                  <Box h={'5vh'}>
                    <Divider
                      orientation="vertical"
                      mt={5}
                      ml={0}
                      mr={0}
                      borderWidth={'1px'}
                      borderColor={'#ebedf2'}
                    />
                  </Box>
                  <VStack
                    p={1}
                    mb={1}
                    alignItems={'end'}
                    justifyContent={'space-between'}
                    spacing={0}
                  >
                    <Text
                      color="#000000"
                      fontWeight={620}
                      fontSize={14}
                      textTransform={'uppercase'}
                    >
                      bot whatsapp ur
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
                        values?.find(({ name }) => name == 'BOT_WHATSAPP_UR')
                          ?.value,
                        18,
                        '#ffffff',
                        600
                      )}
                      value={formaterNumber(
                        values?.find(({ name }) => name == 'BOT_WHATSAPP_UR')
                          ?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'BOT_WHATSAPP_UR')
                          ?.value > 0
                          ? 'up'
                          : 'down'
                      }
                    />
                  </VStack>
                </HStack>
              </VStack>
              {/* Insert The New Simplegrid here*/}
            </Flex>
          </GridItem>

          {/*Replace By Graphic*/}
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
              <TagTitle title={'Evolution du SUR de chaque application'} size={16} />
            </Box>
            <Divider mb={2} mt={3} />
            <Box>
            <TabsPanelItemVerticalOptimized tabs={tabData} w={'100vh'} fSize={'12px'} />
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
    </DashboardLayout>
  );
}
