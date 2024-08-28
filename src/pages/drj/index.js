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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { TagTitle } from '@components/common/title';
import { DashboardLayout } from '@components/layout/dashboard';
import { direction, gird, hightlightStatus } from '@theme';
import { getToken } from 'next-auth/jwt';
import { BsDownload, BsPlusLg } from 'react-icons/bs';
import { PageTitle } from '@components/common/title/page';
import { IconedButton } from '@components/common/button';
import {
  PieCharts,
  PieCharts_drj,
  PieCharts_drj_second,
} from '@components/common/charts/piecharts';
import { scroll_customize } from '@components/common/styleprops';
import { ListSemaineItem } from '@components/common/dropdown_item';

import {
  DefaultHighlightstatus,
  highlightStatusStyle,
} from '@utils/schemas/src/highlight';
import { use, useEffect, useState } from 'react';
import {
  getHightlightData,
  getHightlightStatus,
} from '@utils/services/hightlight/data';
import { HighlightModal } from '@components/common/modal/highlight';
import moment from 'moment';
import { getCurrentWeek, getLastWeek } from '@utils/services/date';
import { CSVReaderModal } from '@components/common/modal/csvreader';
import { createElement, getElement } from 'pages/api/global';
import { ExportToExcel } from '@utils/services/exportexcel';
import { DMenuButton } from '@components/common/menu_button';
import { FaCopy, FaFileExcel } from 'react-icons/fa';
import { CopyHighlightModal } from '@components/common/modal/highlight/copy/index.';
import { DataUnavailable } from '@components/common/data_unavailable';
import { titles } from '@theme';

export default function DrjPage(props) {
  const gstyle = gird.style;
  const { drj } = direction;
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

  const [highlights, setHighlights] = useState();
  const [highlightStatus, setHighlightStatus] = useState();
  const [currentWeekList, setCurrentWeekList] = useState();
  const [selectedHighlight, setSelectedHighlight] = useState();
  const [error, setError] = useState();
  const [dapsData, setDapsData] = useState();
  const [gpData, setGpData] = useState();

  const { realizes, difficults, challenges, coordinationPoint } =
    hightlightStatus;
  const [selectedStatus, setSelectedStatus] = useState('all');
  const statusList = [realizes, difficults, challenges, coordinationPoint];

  const initDapsData = {
    onGoing: 0,
    pay: 0,
    sended: 0,
  };
  const inintGpData = {
    ...initDapsData,
    inValidation: 0,
  };

  const [data, setData] = useState(inintGpData);
  const [dataDaps, setDataDaps] = useState(initDapsData);

  const toast = useToast();
  const lastWeek = getLastWeek().week + '-' + getLastWeek().year;
  const [selectedWeek, setSelectedWeek] = useState(lastWeek);

  const [drjTagData, setDrjTagData] = useState('DAPS');

  const drjModel = {
    nature: '',
    domain: '',
    titled: '',
    customerManagement: '',
    carrier: '',
    status: '',
  };

  const formatDataToExport = (datas) => {
    return datas
      ?.filter((dat) => dat?.nature?.length > 0)
      .map((data) => {
        if (data.status && data.status.includes('cours')) {
          return {
            Nature: data.nature,
            Domaine: data.domaine,
            Intitulé: data.titled,
            Client: data.customerManagement,
            Porteur: data.carrier,
            Statut: data.status,
          };
        }
        return null;
      })
      .filter((filteredData) => filteredData !== null);
  };

  const getHightlight = () => {
    getHightlightData(
      selectedWeek?.split('-')[0],
      selectedWeek?.split('-')[1],
      drj.id,
      setHighlights,
      setError
    );
  };

  useEffect(() => {
    getValuesData('gp');
    getValuesData('daps');
    getHightlight();
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

  const saveDrjData = (datas) => {
    createElement('v1/judicial-direction/save-judicial-direction', datas)
      .then((res) => {
        toast({
          title: `Données importer avec succès`,
          status: 'success',
          position: 'top',
          isClosable: true,
        });
        getValuesData('gp');
        getValuesData('daps');
        getHightlight();
        onCloseCSVR();
      })
      .catch((err) => {
        toast({
          title: `Fichier incorrect`,
          status: 'error',
          position: 'top',
          isClosable: true,
        });
      });
  };

  const onDMenuChange = (value) => {
    if (value == 'hightlight') return newHightlight();
    if (value === 'copy-hightlight') onCopyOpen();
    else {
      if (value === 'drj-daps') setDrjTagData('DAPS');
      if (value === 'drj-gp') setDrjTagData('GP');
      onOpenCSVR();
    }
  };

  const getValuesData = (tag) => {
    const params = `week=${selectedWeek?.split('-')[0]}&year=${
      selectedWeek?.split('-')[1]
    }&tag=${tag}`;
    getElement('v1/judicial-direction/drj?' + params)
      .then((res) => {
        const statusData = res?.data.map((item) => item.status) ?? [];
        if (tag === 'daps') {
          setDataDaps({
            onGoing: statusData.filter((status) => status?.includes('cours'))
              .length,
            pay: statusData.filter((status) => status?.includes('old')).length,
            sended: statusData.filter((status) => status?.includes('nvoy'))
              .length,
            inValidation: statusData.filter((status) =>
              status?.includes('validation')
            ).length,
            atValidate: statusData.filter((status) =>
              status?.includes('valider')
            ).length,
            payOnTime: statusData.filter((status) => status?.includes('dans'))
              .length,
            cancel: statusData.filter((status) => status?.includes('Annul'))
              .length,
          });
          setDapsData(res?.data);
        }
        if (tag === 'gp') {
          setData({
            onGoing: statusData.filter((status) => status?.includes('cours'))
              .length,
            pay: statusData.filter((status) => status?.includes('old')).length,
            sended: statusData.filter((status) => status?.includes('nvoy'))
              .length,
            inValidation: statusData.filter((status) =>
              status?.includes('validation')
            ).length,
            atValidate: statusData.filter((status) =>
              status?.includes('valider')
            ).length,
            payOnTime: statusData.filter((status) => status?.includes('dans'))
              .length,
            cancel: statusData.filter((status) => status?.includes('Annul'))
              .length,
          });
          setGpData(res?.data);
        }
      })
      .catch((err) => {
        console.log('Erorr:::', err);
      });
  };

  const dataLabels = [
    {
      id: 1,
      part: 'En cours',
      /* percent: 10, */
      percent: data.onGoing,
    },
    {
      id: 2,
      part: 'Soldé',
      /* percent: 10, */
      percent: data.pay,
    },
    {
      id: 3,
      part: 'Envoyé',
      /* percent: 10, */
      percent: data.sended,
    },
    {
      id: 4,
      part: 'En validation',
      /* percent: 10, */
      percent: data.inValidation,
    },
    {
      id: 5,
      part: 'A valider',
      /* percent: 10, */
      percent: data.atValidate,
    },
    {
      id: 6,
      part: 'Soldé dans les délais',
      /* percent: 10, */
      percent: data.payOnTime,
    },
    {
      id: 7,
      part: 'Annulé',
      /* percent: 10, */
      percent: data.cancel,
    },
  ];

  const chartData = {
    labels: dataLabels?.map((item) => item.part),
    datasets: [
      {
        data: dataLabels?.map((item) => item.percent),
        backgroundColor: [
          '#fc8064',
          '#4cc4c4',
          '#cdcdce',
          '#fccc54',
          '#38bdf8',
          '#fb7185',
          '#a78bfa',
        ],
      },
    ],
  };

  const dataLabelsDaps = [
    {
      id: 1,
      part: 'En cours',
      /* percent: 10, */
      percent: dataDaps.onGoing,
    },
    {
      id: 2,
      part: 'Soldé',
      /* percent: 10, */
      percent: dataDaps.pay,
    },
    {
      id: 3,
      part: 'Envoyé',
      /* percent: 10, */
      percent: dataDaps.sended,
    },
    {
      id: 4,
      part: 'En validation',
      /* percent: 10, */
      percent: data.inValidation,
    },
    {
      id: 5,
      part: 'A valider',
      /* percent: 10, */
      percent: data.atValidate,
    },
    {
      id: 6,
      part: 'Soldé dans les délais',
      /* percent: 10, */
      percent: data.payOnTime,
    },
    {
      id: 7,
      part: 'Annulé',
      /* percent: 10, */
      percent: data.cancel,
    },
  ];

  const chartDataDaps = {
    labels: dataLabelsDaps?.map((item) => item.part),
    datasets: [
      {
        data: dataLabelsDaps?.map((item) => item.percent),
        backgroundColor: [
          '#fc8064',
          '#4cc4c4',
          '#cdcdce',
          '#fccc54',
          '#38bdf8',
          '#fb7185',
          '#a78bfa',
        ],
      },
    ],
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
    <DashboardLayout activeMenu={'account-drj'}>
      <HighlightModal
        onOpen={onOpenFm}
        onClose={onCloseFm}
        isOpen={isOpenFm}
        weekListOption={currentWeekList}
        highlightStatus={highlightStatus}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        getHightlight={getHightlight}
        direction={drj}
        selectedHighlight={selectedHighlight}
      />
      <CSVReaderModal
        onOpen={onOpenCSVR}
        onClose={onCloseCSVR}
        isOpen={isOpenCSVR}
        saveData={saveDrjData}
        obj={drjModel}
        tag={drjTagData}
        direction={drj}
        week={selectedWeek}
      />
      <CopyHighlightModal
        onOpen={onCopyOpen}
        onClose={onCopyClose}
        isOpen={isCopyOpen}
        weekListOption={currentWeekList}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        direction={drj}
        getHightlight={getHightlight}
      />
      <Flex mt={3} px={2} w={'100%'} mb={3}>
        <Box>
          <PageTitle
            titleSize={17}
            titleColor={'black'}
            subtitleColor={'gray'}
            subtitleSize={14}
            icon={drj.icon}
            title={drj.label}
            subtitle={' / ' + drj.description}
          />
        </Box>
        <Spacer />
        <Box mr={2}>
          <DMenuButton
            onChange={onDMenuChange}
            name={'Nouvelle taches'}
            rightIcon={<BsPlusLg />}
            menus={[
              { icon: <FaFileExcel />, value: 'drj-gp', label: 'Importer GP' },
              {
                icon: <FaFileExcel />,
                value: 'drj-daps',
                label: 'Importer DAPS',
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
        </Box>
        <ListSemaineItem
          onWeekSelect={setSelectedWeek}
          selectedWeek={selectedWeek}
        />
      </Flex>

      <Stack p={2} w={'100%'} mb={3}>
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={2}
          h={gstyle.h * 2 + 'px'}
        >
          <GridItem
            rowSpan={1}
            colSpan={2}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            <Box>
              <TagTitle
                title={'Suivi évolution des contrats (GP) en %'}
                size={16}
              />
            </Box>
            <Divider mt={2} />
            <Flex
              h={'100%'}
              mb={6}
              justifyContent={'center'}
              alignItems={'end'}
            >
              <Box
                h={'100%'}
                w={'55%'}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {!gpData ? (
                  <DataUnavailable
                    message={titles.title.label.dataunavailable}
                    marginTop={0}
                    paddingY={10}
                    SizeIcon={40}
                  />
                ) : (
                  <PieCharts chartData={chartData} />
                )}
              </Box>

              <Box mb={6} p={3}>
                {gpData && (
                  <ExportToExcel
                    buttonDownloadLabel="Télécharger"
                    fileName="drj_GP_excel"
                    apiData={formatDataToExport(gpData) ?? []}
                  />
                )}
              </Box>
            </Flex>
          </GridItem>
          <GridItem
            rowSpan={2}
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
          <GridItem
            rowSpan={1}
            colSpan={2}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            <Box>
              <TagTitle
                title={'Suivi évolution des contrats (DAPS) en %'}
                size={16}
              />
            </Box>
            <Divider mt={2} />
            <Flex
              h={'100%'}
              mb={6}
              justifyContent={'center'}
              alignItems={'end'}
            >
              <Box h={'100%'} w={'55%'}>
                {!dapsData ? (
                  <DataUnavailable
                    message={titles.title.label.dataunavailable}
                    marginTop={4}
                    paddingY={10}
                    SizeIcon={40}
                  />
                ) : (
                  <PieCharts chartData={chartDataDaps} />
                )}
              </Box>

              <Box mb={6} p={3}>
                {dapsData && (
                  <ExportToExcel
                    buttonDownloadLabel="Télécharger"
                    apiData={formatDataToExport(dapsData)}
                    fileName="drj_DAPS_excel"
                  />
                )}
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Stack>
    </DashboardLayout>
  );
}
