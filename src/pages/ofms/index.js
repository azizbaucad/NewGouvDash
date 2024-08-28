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
import { scroll_customize } from '@components/common/styleprops';
import {
  RefactoringStackedBarChart,
  StackedBarChart,
} from '@components/common/charts/stackedbarcharts';
import { LineCharts } from '@components/common/charts/linecharts';
import { ListSemaineItem } from '@components/common/dropdown_item';
import { TabsPanelItem } from '@components/common/tabs';
import { useEffect, useState } from 'react';
import { getElement } from 'pages/api/global';
import {
  abreviateNumberWithXof,
  abreviateNumberWithXofWithBadge,
  abreviateNumberWithoutXof,
  formaterNumber,
  formaterNumberWithBadge,
  numberWithBadge,
  numberWithBadgeMarge,
  valueGetZero,
} from '@utils/formater';
import {
  DefaultHighlightstatus,
  highlightStatusStyle,
} from '@utils/schemas/src/highlight';
import {
  getHightlightData,
  getHightlightStatus,
} from '@utils/services/hightlight/data';
import { HighlightModal } from '@components/common/modal/highlight';
import moment from 'moment';
import { getCurrentWeek, getLastWeek } from '@utils/services/date';
import {
  LineChartRefactoring,
  LineChartsExample,
} from '@components/common/charts/linechart_refactoring';
import { ValidationModal } from '@components/common/modal/week_validator';
import { DMenuButton } from '@components/common/menu_button';
import { useRouter } from 'next/router';
import { FaCheck, FaCopy } from 'react-icons/fa';
import { CopyHighlightModal } from '@components/common/modal/highlight/copy/index.';
import { DataUnavailable } from '@components/common/data_unavailable';

export default function OfmsPage(props) {
  const gstyle = gird.style;
  const { ofms } = direction;
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

  const router = useRouter();

  const { realizes, difficults, challenges, coordinationPoint } =
    hightlightStatus;

  const [highlights, setHighlights] = useState();
  const [highlightStatus, setHighlightStatus] = useState();
  const [currentWeekList, setCurrentWeekList] = useState();
  const [selectedHighlight, setSelectedHighlight] = useState();
  const [error, setError] = useState();
  const [role, setRole] = useState();

  const [selectedStatus, setSelectedStatus] = useState('all');
  const statusList = [realizes, difficults, challenges, coordinationPoint];

  const lastWeek = getLastWeek().week + '-' + getLastWeek().year;
  const [selectedWeek, setSelectedWeek] = useState(lastWeek);

  const getHightlight = () => {
    getHightlightData(
      selectedWeek?.split('-')[0],
      selectedWeek?.split('-')[1],
      ofms.id,
      setHighlights,
      setError
    );
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRole(sessionStorage.getItem('role'));
    }
    getHightlight();
    getValuesDataOfms();
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

  const initData = {
    //CaOfms Dto
    caOfmsWeek: null,
    caOfmsWeekVsObjectiveCaOfmsWeek: null,
    variationCaOfmsWeek: null,
    caOfmsMonthToDate: null,
    variationCaOfmsMonthToDate: null,
    caOfmsYear: null,
    variationCaOfmsYear: null,
    //Parc ofms
    parcActive: null,
    parcActiveVsObj: null,
    variationParcActiveWeek: null,
    variationParcActiveFourWeek: null,
    parcRegistered: null,
    parcRegisteredVsObj: null,
    variationRegisteredWeek: null,
    variationParcRegisteredFourWeek: null,
    //Transactions
    volumeWeek: null,
    variationVolumeWeek: null,
    variationVolumeFourWeek: null,
    valueWeek: null,
    variationValueWeek: null,
    variationValueFourWeek: null,
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
  };

  //Initialise Data
  const [data, setData] = useState(initData);

  //Handle Click function for View More
  const handleViewMoreClick = () => {
    router.push('/ofms/transaction/');
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
          setData({
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
            //Transactions
            volumeWeek: res.data?.transactionOFMsDto.volumeWeek,
            variationVolumeWeek:
              res.data?.transactionOFMsDto.variationVolumeWeek,
            variationVolumeFourWeek:
              res.data?.transactionOFMsDto.variationVolumeFourWeek,
            valueWeek: res.data?.transactionOFMsDto.valueWeek,
            variationValueWeek: res.data?.transactionOFMsDto.variationValueWeek,
            variationValueFourWeek:
              res.data?.transactionOFMsDto.variationValueFourWeek,
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
          });
        } else {
          setData(initData);
        }
      })
      .catch((error) => {
        setData(initData);
        console.log('Error :::: ', error);
      });
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
    <DashboardLayout activeMenu={'account-ofms'}>
      <HighlightModal
        onOpen={onOpenFm}
        onClose={onCloseFm}
        isOpen={isOpenFm}
        weekListOption={currentWeekList}
        highlightStatus={highlightStatus}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        getHightlight={getHightlight}
        direction={ofms}
        selectedHighlight={selectedHighlight}
      />
      <ValidationModal
        onOpen={onOpenVal}
        onClose={onCloseVal}
        isOpen={isOpenVal}
        direction={ofms}
        week={selectedWeek}
      />

      <CopyHighlightModal
        onOpen={onCopyOpen}
        onClose={onCopyClose}
        isOpen={isCopyOpen}
        weekListOption={currentWeekList}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        direction={ofms}
        getHightlight={getHightlight}
      />
      <Flex mt={3} px={2} w={'100%'} mb={0}>
        <Box>
          <PageTitle
            titleSize={17}
            titleColor={'black'}
            subtitleColor={'gray'}
            subtitleSize={14}
            icon={ofms.icon}
            title={ofms.label}
            subtitle={' / ' + ofms.description}
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

      <Stack w={'100%'} p={3}>
        <Grid
          templateRows="repeat(5, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={2}
          h={gstyle.h * 6 + 'px'}
          mb={6}
        >
          {/* First row */}
          <GridItem
            rowSpan={2}
            colSpan={2}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            {/* Content for CA Mobile (MTD) */}
            <Box>
              <TagTitle title={"Chiffres d'affaires"} size={16} />
            </Box>
            <Divider mt={2} mb={2} />
            {valueGetZero(data.caOfmsWeek) ? (
              <HStack justifyContent={'space-between'} alignItems="center">
                <Box>
                  <ValuesData
                    tagName={'Hebdo'}
                    full_value={formaterNumber(
                      data.caOfmsWeek,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={abreviateNumberWithXof(
                      data.caOfmsWeek,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={data.variationCaOfmsWeek > 0 ? 'up' : 'down'}
                    delta={
                      data.caOfmsWeekVsObjectiveCaOfmsWeek > 0
                        ? {
                            value: abreviateNumberWithXof(
                              data.caOfmsWeekVsObjectiveCaOfmsWeek,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.obj,
                            valueColor: colors.colorBadge.green.green_600,
                          }
                        : {
                            value: abreviateNumberWithXof(
                              data.caOfmsWeekVsObjectiveCaOfmsWeek,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.obj,
                            valueColor: colors.colorBadge.red.red_600,
                          }
                    }
                    lastVal={
                      data.variationCaOfmsWeek > 0
                        ? {
                            value: numberWithBadge(
                              data.variationCaOfmsWeek,
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
                              data.variationCaOfmsWeek,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
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
                    tagName={'Mensuel'}
                    full_value={formaterNumber(
                      data.caOfmsMonthToDate,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={abreviateNumberWithXof(
                      data.caOfmsMonthToDate,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={
                      data.variationCaOfmsMonthToDate > 0 ? 'up' : 'down'
                    }
                    lastVal={
                      data.variationCaOfmsMonthToDate > 0
                        ? {
                            value: numberWithBadge(
                              data.variationCaOfmsMonthToDate,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.m1,
                            valueColor: colors.colorBadge.green.green_600,
                          }
                        : {
                            value: numberWithBadge(
                              data.variationCaOfmsMonthToDate,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.m1,
                            valueColor: colors.colorBadge.red.red_600,
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
                    tagName={'Annuel'}
                    full_value={formaterNumber(
                      data.caOfmsYear,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={abreviateNumberWithXof(
                      data.caOfmsYear,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={data.variationCaOfmsYear > 0 ? 'up' : 'down'}
                    lastVal={
                      data.variationCaOfmsYear > 0
                        ? {
                            value: numberWithBadge(
                              data.variationCaOfmsYear,
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
                              data.variationCaOfmsYear,
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
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                paddingY={0}
                marginTop={1}
                SizeIcon={40}
              />
            )}
            <Divider mt={2} />
            <Box h={'60%'}>
              <RefactoringStackedBarChart selectedWeek={selectedWeek} />
            </Box>
          </GridItem>

          <GridItem
            rowSpan={1}
            colSpan={1}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            {/* Content for Répartition (en %) */}
            <Box>
              <TagTitle title={'Parc Actfis'} size={16} />
            </Box>
            <Divider mt={2} />
            {valueGetZero(data.parcRegistered) &&
            valueGetZero(data.parcActive) ? (
              <>
                <Box>
                  <ValuesData
                    tagName="Parc actifs"
                    full_value={formaterNumber(
                      data.parcActive,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={formaterNumber(data.parcActive, 22)}
                    iconType={data.variationParcActiveWeek > 0 ? 'up' : 'down'}
                    delta={
                      data.parcActiveVsObj > 0
                        ? {
                            value: formaterNumber(
                              data.parcActiveVsObj,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.obj,
                            valueColor: colors.colorBadge.green.green_600,
                          }
                        : {
                            value: formaterNumber(
                              data.parcActiveVsObj,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600
                            ),
                            label: titles.title.label.obj,
                            valueColor: colors.colorBadge.red.red_600,
                          }
                    }
                    lastVal={
                      data.variationParcActiveWeek > 0
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
                              data.variationParcActiveWeek,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              700
                            ),
                            label: titles.title.label.s1,
                          }
                    }
                    lastVal2={
                      data.variationParcActiveFourWeek > 0
                        ? {
                            value: numberWithBadge(
                              data.variationParcActiveFourWeek,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              700
                            ),
                            label: '/ ' + 'S-4',
                          }
                        : {
                            value: numberWithBadge(
                              data.variationParcActiveFourWeek,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              700
                            ),
                            label: '/ ' + 'S-4',
                          }
                    }
                  />
                </Box>
                <Divider mt={2} />
                <Box>
                  <ValuesData
                    tagName="Parc inscrits"
                    full_value={formaterNumber(
                      data.parcRegistered,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={formaterNumber(data.parcRegistered, 22)}
                    iconType={data.variationRegisteredWeek > 0 ? 'up' : 'down'}
                    delta={
                      data.parcRegisteredVsObj > 0
                        ? {
                            value: formaterNumber(
                              data.parcRegisteredVsObj,
                              12,
                              colors.colorBadge.green.green_600,
                              600
                            ),
                            label: titles.title.label.obj,
                          }
                        : {
                            value: formaterNumber(
                              data.parcRegisteredVsObj,
                              12,
                              colors.colorBadge.red.red_600,
                              600
                            ),
                            label: titles.title.label.obj,
                          }
                    }
                    lastVal={
                      data.variationRegisteredWeek > 0
                        ? {
                            value: numberWithBadge(
                              data.variationRegisteredWeek,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              700,
                              colors.colorBadge.red.red_transparent
                            ),
                            label: titles.title.label.s1,
                          }
                        : {
                            value: numberWithBadge(
                              data.variationRegisteredWeek,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              700
                            ),
                            label: titles.title.label.s1,
                          }
                    }
                    lastVal2={
                      data.variationParcRegisteredFourWeek > 0
                        ? {
                            value: numberWithBadge(
                              data.variationParcRegisteredFourWeek,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              700
                            ),
                            label: '/ ' + 'S-4',
                          }
                        : {
                            value: numberWithBadge(
                              data.variationParcRegisteredFourWeek,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              700
                            ),
                            label: '/ ' + 'S-4',
                          }
                    }
                  />
                </Box>
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
            rowSpan={1}
            colSpan={1}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            <HStack justifyContent={'space-between'}>
              <TagTitle title={'Transactions'} size={16} />

              <Text
                textColor={'teal.500'}
                fontWeight={'normal'}
                onClick={handleViewMoreClick}
                cursor="pointer"
              >
                Voir Plus
              </Text>
            </HStack>
            <Divider mt={2} />
            {valueGetZero(data.valueWeek) && valueGetZero(data.volumeWeek) ? (
              <>
                <Box>
                  <ValuesData
                    tagName="Volume"
                    full_value={formaterNumber(
                      data.volumeWeek,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={abreviateNumberWithoutXof(
                      data.volumeWeek,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={data.variationVolumeWeek > 0 ? 'up' : 'down'}
                    lastVal={
                      data.variationVolumeWeek > 0
                        ? {
                            value: numberWithBadge(
                              data.variationVolumeWeek,
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
                              data.variationVolumeWeek,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              700
                            ),
                            label: titles.title.label.s1,
                          }
                    }
                    lastVal2={
                      data.variationVolumeFourWeek > 0
                        ? {
                            value: numberWithBadge(
                              data.variationVolumeFourWeek,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              700
                            ),
                            label: '/ ' + 'S-4',
                          }
                        : {
                            value: numberWithBadge(
                              data.variationVolumeFourWeek,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              700
                            ),
                            label: '/ ' + 'S-4',
                          }
                    }
                  />
                </Box>
                <Divider mt={2} />
                <Box>
                  <ValuesData
                    tagName="Valeur"
                    full_value={formaterNumber(
                      data.valueWeek,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={abreviateNumberWithXof(
                      data.valueWeek,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={data.variationValueWeek > 0 ? 'up' : 'down'}
                    lastVal={
                      data.variationValueWeek > 0
                        ? {
                            value: numberWithBadge(
                              data.variationValueWeek,
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
                              data.variationValueWeek,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              700
                            ),
                            label: titles.title.label.s1,
                          }
                    }
                    lastVal2={
                      data.variationValueFourWeek > 0
                        ? {
                            value: numberWithBadge(
                              data.variationValueFourWeek,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              700
                            ),
                            label: '/ ' + 'S-4',
                          }
                        : {
                            value: numberWithBadge(
                              data.variationValueFourWeek,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              700
                            ),
                            label: '/ ' + 'S-4',
                          }
                    }
                  />
                </Box>{' '}
              </>
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                marginTop={1}
                paddingY={10}
                SizeIcon={40}
              />
            )}
          </GridItem>

          <GridItem
            rowSpan={1}
            colSpan={2}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            <Box>
              <TagTitle title={'Commissions'} size={14} />
            </Box>
            <Divider mt={2} mb={2} />
            {valueGetZero(data.commissionWeek) ? (
              <HStack justifyContent={'space-between'} alignItems="center">
                <Box>
                  <ValuesData
                    tagName="Hebdo"
                    full_value={formaterNumber(
                      data.commissionWeek,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={abreviateNumberWithXof(
                      data.commissionWeek,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={data.variationCommissionWeek > 0 ? 'up' : 'down'}
                    lastVal={
                      data.variationCommissionWeek > 0
                        ? {
                            value: numberWithBadge(
                              data.variationCommissionWeek,
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
                              data.variationCommissionWeek,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              700
                            ),
                            label: titles.title.label.s1,
                          }
                    }
                    lastVal2={
                      data.variationCommissionWeekFour > 0
                        ? {
                            value: numberWithBadge(
                              data.variationCommissionWeekFour,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              700
                            ),
                            label: '/ ' + 'S-4',
                          }
                        : {
                            value: numberWithBadge(
                              data.variationCommissionWeekFour,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              700
                            ),
                            label: '/ ' + 'S-4',
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
                    tagName="Mensuel"
                    full_value={formaterNumber(
                      data.commissionMonthToDate,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={abreviateNumberWithXof(
                      data.commissionMonthToDate,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={
                      data.variationCommissionMonthToDate > 0 ? 'up' : 'down'
                    }
                    lastVal={
                      data.variationCommissionMonthToDate > 0
                        ? {
                            value: numberWithBadge(
                              data.variationCommissionMonthToDate,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              700
                            ),
                            label: titles.title.label.m1,
                          }
                        : {
                            value: numberWithBadge(
                              data.variationCommissionMonthToDate,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              700
                            ),
                            label: titles.title.label.m1,
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
                    tagName="Annuel"
                    full_value={formaterNumber(
                      data.commissionYear,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={abreviateNumberWithXof(
                      data.commissionYear,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={data.commissionYear > 0 ? 'up' : 'down'}
                    lastVal={
                      data.commissionYear > 0
                        ? {
                            value: numberWithBadge(
                              data.variationCommissionYear,
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
                              data.variationCommissionYear,
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
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                marginTop={1}
                paddingY={10}
                SizeIcon={40}
              />
            )}
          </GridItem>

          <GridItem
            rowSpan={1}
            colSpan={2}
            bg={gstyle.bg}
            borderRadius={gstyle.radius}
            p={gstyle.p}
          >
            <Box>
              <TagTitle title={'Marges'} size={14} />
            </Box>
            <Divider mt={2} mb={2} />
            {valueGetZero(data.margeWeek) ? (
              <HStack justifyContent={'space-between'} alignItems="center">
                <Box>
                  <ValuesData
                    tagName="Hebdo"
                    full_value={formaterNumber(
                      data.margeWeek,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={numberWithBadge(
                      data.margeWeek,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={data.variationMargeWeek > 0 ? 'up' : 'down'}
                    lastVal={
                      data.variationMargeWeek > 0
                        ? {
                            value: numberWithBadgeMarge(
                              data.variationMargeWeek,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                          }
                        : {
                            value: numberWithBadgeMarge(
                              data.variationMargeWeek,
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
                      data.variationMargeWeekFour > 0
                        ? {
                            value: numberWithBadgeMarge(
                              data.variationMargeWeekFour,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: '/ ' + 'S-4',
                          }
                        : {
                            value: numberWithBadgeMarge(
                              data.variationMargeWeekFour,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: '/ ' + 'S-4',
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
                    tagName="Mensuel"
                    full_value={formaterNumber(
                      data.margeMonth,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={numberWithBadge(
                      data.margeMonth,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={data.variationMargeMonth > 0 ? 'up' : 'down'}
                    lastVal={
                      data.variationMargeMonth > 0
                        ? {
                            value: numberWithBadgeMarge(
                              data.variationMargeMonth,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.m1,
                          }
                        : {
                            value: numberWithBadgeMarge(
                              data.variationMargeMonth,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.m1,
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
                    tagName="Annuel"
                    full_value={formaterNumber(
                      data.margeYear,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={numberWithBadge(
                      data.margeYear,
                      22,
                      16,
                      '',
                      700,
                      600
                    )}
                    iconType={data.variationMargeYear > 0 ? 'up' : 'down'}
                    lastVal={
                      data.variationMargeYear > 0
                        ? {
                            value: numberWithBadgeMarge(
                              data.variationMargeYear,
                              12,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.y1,
                          }
                        : {
                            value: numberWithBadgeMarge(
                              data.variationMargeYear,
                              12,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.y1,
                          }
                    }
                  />
                </Box>
              </HStack>
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                marginTop={1}
                paddingY={10}
                SizeIcon={40}
              />
            )}
          </GridItem>

          <GridItem
            h={'100%'}
            rowSpan={3}
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
            colSpan={2}
            h={'100%'}
            rowSpan={2}
            p={gstyle.p}
            bg={gstyle.bg}
            borderRadius={gstyle.radius}
          >
            <Box>
              <TagTitle title={"Evolution du Chiffre d'affaires"} size={16} />
            </Box>
            <Divider mb={2} mt={3} />
            <Box>
              <TabsPanelItem
                title1={'Commissions vs Marges vs OM'}
                fSize={'12px'}
                w1={'100%'}
                h1={'350px'}
                tab1={
                  <LineChartRefactoring
                    selectedWeek={selectedWeek}
                    title="Commission"
                    title_="Marge"
                    title3="OM"
                    bgColorDs1="#38c172"
                    bdColorDs1="#38c172"
                    bgColorDs2="#dc3030"
                    bdColorDs2="#dc3030"
                    bgColorDs3="#ff7900"
                    bdColorDs3="#ff7900"
                  />
                }
              />
            </Box>
          </GridItem>
        </Grid>
      </Stack>
    </DashboardLayout>
  );
}
