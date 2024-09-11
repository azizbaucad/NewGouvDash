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
  LineChartsParcMobile,
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
} from '@utils/formater';
import { AiFillSave } from 'react-icons/ai';
import { kpiCard } from '@components/common/kpi_card';
import { FaCopy, FaFileExcel } from 'react-icons/fa';
import { DMenuButton } from '@components/common/menu_button';
import { CSVReaderModal } from '@components/common/modal/csvreader';
import { CopyHighlightModal } from '@components/common/modal/highlight/copy/index.';
import DdeDmcPage from './dmc';
import DdePrcPage from './prc';

export default function DdePage(props) {
  const gstyle = gird.style;
  const { dde, ddedmc, ddeprc } = direction;
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
    department: '',
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
  const [selectedWeek, setSelectedWeek] = useState(lastWeek);
  const [values, setValues] = useState();

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
    <DashboardLayout activeMenu={'account-dde'}>
      <HighlightModal
        onOpen={onOpenFm}
        onClose={onCloseFm}
        isOpen={isOpenFm}
        weekListOption={currentWeekList}
        highlightStatus={highlightStatus}
        getHightlight={getHightlight}
        direction={dde}
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
        direction={dde}
        getHightlight={getHightlight}
      />

      <CSVReaderModal
        onOpen={onOpenCSVR}
        onClose={onCloseCSVR}
        isOpen={isOpenCSVR}
        saveData={saveDdeData}
        obj={ddeModel}
        direction={dde}
        week={selectedWeek}
        addRef={true}
      />
      <Flex mt={3} px={2} w={'100%'} mb={0}>
        <Box ml={2}>
          <PageTitle
            titleSize={17}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={14}
            icon={dde.icon}
            title={dde.label}
            subtitle={' / ' + dde.description}
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
                icon: <FaFileExcel />,
                value: 'data',
                label: 'Importer les données',
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
        <Box mr={1}>
          <ListSemaineItem
            onWeekSelect={setSelectedWeek}
            selectedWeek={selectedWeek}
          />
        </Box>
      </Flex>

      <Stack w={'100%'}>
        {' '}
        {/* Ajout de la largeur complète ici */}
        <ShowPanel
          title1={ddedmc.description}
          tab1={<DdeDmcPage selectedWeek={selectedWeek} />}
          title2={ddeprc.description}
          tab2={<DdePrcPage selectedWeek={selectedWeek} />}
        />
      </Stack>
    </DashboardLayout>
  );
}
