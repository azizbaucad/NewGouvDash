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
} from '@chakra-ui/react';
import { ValuesData } from '@components/common/data/values';
import { TagTitle } from '@components/common/title';
import { DashboardLayout } from '@components/layout/dashboard';
import { gird, hightlightStatus, titles, colors, direction } from '@theme';
import { getToken } from 'next-auth/jwt';
import { BsPlusLg } from 'react-icons/bs';
import { PageTitle } from '@components/common/title/page';
import { IconedButton } from '@components/common/button';
import { PieCharts } from '@components/common/charts/piecharts';
import { scroll_customize } from '@components/common/styleprops';
import { ListSemaineItem } from '@components/common/dropdown_item';
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
import {
  DefaultHighlightstatus,
  highlightStatusStyle,
} from '@utils/schemas/src/highlight';
import {
  getHightlightData,
  getHightlightStatus,
} from '@utils/services/hightlight/data';
import { HighlightModal } from '@components/common/modal/highlight';
import { useEffect, useState } from 'react';
import { getCurrentWeek, getLastWeek } from '@utils/services/date';
import moment from 'moment';
import { getElement } from 'pages/api/global';
import { FaFileExcel, FaCheck, FaCopy } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { DMenuButton } from '@components/common/menu_button';
import { ValidationModal } from '@components/common/modal/week_validator';
import { CopyHighlightModal } from '@components/common/modal/highlight/copy/index.';
import { DataUnavailable } from '@components/common/data_unavailable';

export default function DescPage(props) {
  const gstyle = gird.style;
  const { desc } = direction;
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

  const [highlights, setHighlights] = useState();
  const [highlightStatus, setHighlightStatus] = useState();
  const [currentWeekList, setCurrentWeekList] = useState();
  const [selectedHighlight, setSelectedHighlight] = useState();
  const [role, setRole] = useState();
  const [error, setError] = useState();
  const {
    onOpen: onCopyOpen,
    isOpen: isCopyOpen,
    onClose: onCopyClose,
  } = useDisclosure();

  const { realizes, difficults, challenges, coordinationPoint } =
    hightlightStatus;
  const [selectedStatus, setSelectedStatus] = useState('all');
  const statusList = [realizes, difficults, challenges, coordinationPoint];

  const initData = {
    dirValue: null,
    variationDirValue: null,
    fcrValue: null,
    variationFcrValue: null,
    csatValue: null,
    variationCsatValue: null,
    dsatValue: null,
    variationDsatValue: null,
    serviceLevelValue: null,
    variationServiceLevelValue: null,
    timeCycleValue: null,
    variationTimeCycleValue: null,
    rateAbandonValue: null,
    variationRateAbandonValue: null,
    //Piecharts data
    ibouValue: null,
    orangeMoneyValue: null,
    portalValue: null,
    chatbotValue: null,
    eannuaireValue: null,
    evitementSelfcareValue: null,
  };

  const [data, setData] = useState(initData);

  const lastWeek = getLastWeek().week + '-' + getLastWeek().year;
  const [selectedWeek, setSelectedWeek] = useState(lastWeek);

  const getHightlight = () => {
    getHightlightData(
      selectedWeek?.split('-')[0],
      selectedWeek?.split('-')[1],
      desc.id,
      setHighlights,
      setError
    );
  };

  const onDMenuChange = (value) => {
    if (value === 'validate') return onOpenVal();
    if (value == 'hightlight') newHightlight();
    if (value == 'data') router.push('desc/form/' + selectedWeek);
    if (value == 'copy-hightlight') onCopyOpen();
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

  const getValuesData = () => {
    const params =
      'week=' +
      selectedWeek?.split('-')[0] +
      '&year=' +
      selectedWeek?.split('-')[1];

    getElement('v1/descdata/week-data?' + params)
      .then((res) => {
        res?.data
          ? setData({
              dirValue: res.data?.dirValue,
              variationDirValue: res.data?.variationDirValue,
              fcrValue: res.data?.fcrValue,
              variationFcrValue: res.data?.variationFcrValue,
              csatValue: res.data?.csatValue,
              variationCsatValue: res.data?.variationCsatValue,
              dsatValue: res.data?.dsatValue,
              variationDsatValue: res.data?.variationDsatValue,
              serviceLevelValue: res.data?.serviceLevelValue,
              variationServiceLevelValue: res.data?.variationServiceLevelValue,
              timeCycleValue: res.data?.timeCycleValue,
              variationTimeCycleValue: res.data?.variationTimeCycleValue,
              rateAbandonValue: res.data?.rateAbandonValue,
              variationRateAbandonValue: res.data?.variationRateAbandonValue,
              ibouValue: res.data?.ibouValue,
              orangeMoneyValue: res.data?.orangeMoneyValue,
              portalValue: res.data?.portalValue,
              chatbotValue: res.data?.chatbotValue,
              eannuaireValue: res.data?.eannuaireValue,
              evitementSelfcareValue: res.data?.evitementSelfcareValue,
            })
          : setData(initData);
      })
      .catch((error) => {
        setData(initData);
        console.log('Error ::: ', error);
      });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRole(sessionStorage.getItem('role'));
    }
    getHightlight();
    getValuesData();
  }, [selectedWeek]);

  //Initialise chart data
  const DataLabels = [
    {
      id: 1,
      part: 'Ibou',
      percent: data.ibouValue,
    },
    {
      id: 2,
      part: 'OM',
      percent: data.orangeMoneyValue,
    },
    {
      id: 3,
      part: 'portail',
      percent: data.portalValue,
    },
    {
      id: 4,
      part: 'ChatBot',
      percent: data.chatbotValue,
    },
    {
      id: 5,
      part: 'E-annuaire',
      percent: data.eannuaireValue,
    },
    {
      id: 6,
      part: 'Evitement Selfcare',
      percent: data.evitementSelfcareValue,
    },
  ];
  //Initialise Piecharts data
  const chartData = {
    labels: DataLabels?.map((item) => item.part),
    datasets: [
      {
        data: DataLabels?.map((item) => item.percent),
        backgroundColor: [
          '#fc8064',
          '#4cc4c4',
          '#cdcdce',
          '#fccc54',
          '#34a4ec',
          '#9c64fc',
        ],
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

  return (
    <DashboardLayout activeMenu={'account-desc'}>
      <HighlightModal
        onOpen={onOpenFm}
        onClose={onCloseFm}
        isOpen={isOpenFm}
        weekListOption={currentWeekList}
        highlightStatus={highlightStatus}
        getHightlight={getHightlight}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        direction={desc}
        selectedHighlight={selectedHighlight}
      />

      <CopyHighlightModal
        onOpen={onCopyOpen}
        onClose={onCopyClose}
        isOpen={isCopyOpen}
        weekListOption={currentWeekList}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        direction={desc}
        getHightlight={getHightlight}
      />
      <ValidationModal
        onOpen={onOpenVal}
        onClose={onCloseVal}
        isOpen={isOpenVal}
        direction={desc}
        week={selectedWeek}
      />
      <Flex mt={3} px={2} w={'100%'} mb={3}>
        <Box>
          <PageTitle
            titleSize={17}
            titleColor={'black'}
            subtitleColor={'gray'}
            subtitleSize={14}
            icon={desc.icon}
            title={desc.label}
            subtitle={' / ' + desc.description}
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
                  icon: <BsPlusLg />,
                  value: 'data',
                  label: 'Remplir les données',
                },
                {
                  icon: <BsPlusLg />,
                  value: 'hightlight',
                  label: 'Nouveau fait marquant',
                },
                { icon: <FaCheck />, value: 'validate', label: 'Valider' },
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

      <Stack w={'100%'} p={2} mb={3}>
        <Grid
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={2}
          h={gstyle.h * 3.3 + 'px'}
        >
          <GridItem
            rowSpan={2}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            <Box>
              <TagTitle title={'Taux de digitalisation'} size={16} />
            </Box>
            <Divider mt={2} />
            {valueGetZero(data.dirValue) ? (
              <>
                <Box>
                  <ValuesData
                    tagName="DIR"
                    full_value={formaterNumber(
                      data.dirValue,
                      18,
                      '#ffffff',
                      600
                    )}
                    value={numberWithBadge(data.dirValue, 22, 16, '', 700, 600)}
                    iconType={data.variationDirValue > 0 ? 'up' : 'down'}
                    lastVal={
                      data.variationDirValue > 0
                        ? {
                            value: numberWithBadge(
                              data.variationDirValue,
                              12,
                              colors.colorBadge.green.green_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                            valueColor: colors.colorBadge.green.green_600,
                          }
                        : {
                            value: numberWithBadge(
                              data.variationDirValue,
                              12,
                              colors.colorBadge.red.red_600,
                              600,
                              600
                            ),
                            label: titles.title.label.s1,
                            valueColor: colors.colorBadge.red.red_600,
                          }
                    }
                  />
                </Box>
                <Divider mt={2} />
                <Box h={'60%'}>
                  <PieCharts chartData={chartData} />
                </Box>
              </>
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                marginTop={16}
                paddingY={16}
                SizeIcon={40}
              />
            )}
          </GridItem>

          <GridItem bg={gstyle.bg} p={gstyle.p} borderRadius={gstyle.radius}>
            <Box>
              <TagTitle title="FCR" size={16} />
            </Box>
            <Divider mt={2} />
            {valueGetZero(data.fcrValue) ? (
              <Box>
                <ValuesData
                  tagName="FCR"
                  full_value={formaterNumber(data.fcrValue, 18, '#ffffff', 600)}
                  value={numberWithBadge(data.fcrValue, 22, 16, '', 700, 600)}
                  iconType={data.variationFcrValue > 0 ? 'up' : 'down'}
                  lastVal={
                    data.variationFcrValue > 0
                      ? {
                          value: numberWithBadge(
                            data.variationFcrValue,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: numberWithBadge(
                            data.variationFcrValue,
                            12,
                            colors.colorBadge.red.red_600,
                            600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.red.red_600,
                        }
                  }
                />
              </Box>
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                marginTop={1}
                paddingY={10}
                SizeIcon={40}
              />
            )}
          </GridItem>

          <GridItem bg={gstyle.bg} p={gstyle.p} borderRadius={gstyle.radius}>
            <Box>
              <TagTitle title={'CSAT'} size={16} subtitle={'(Satisfaction)'} />
            </Box>
            <Divider mt={2} />
            {valueGetZero(data.csatValue) ? (
              <Box>
                <ValuesData
                  tagName="CSAT Global"
                  full_value={formaterNumber(
                    data.csatValue,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={numberWithBadge(data.csatValue, 22, 16, '', 700, 600)}
                  iconType={data.variationCsatValue > 0 ? 'up' : 'down'}
                  lastVal={
                    data.variationCsatValue > 0
                      ? {
                          value: numberWithBadge(
                            data.variationCsatValue,
                            12,
                            colors.colorBadge.red.green_600,
                            600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: numberWithBadge(
                            data.variationCsatValue,
                            12,
                            colors.colorBadge.red.red_600,
                            600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.red.red_600,
                        }
                  }
                />
              </Box>
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                marginTop={1}
                paddingY={8}
                SizeIcon={40}
              />
            )}
          </GridItem>

          <GridItem bg={gstyle.bg} p={gstyle.p} borderRadius={gstyle.radius}>
            <Box>
              <TagTitle
                title={'DSAT'}
                size={16}
                subtitle={'(Insatisfaction)'}
              />
            </Box>
            <Divider mt={2} />
            {valueGetZero(data.dsatValue) ? (
              <Box>
                <ValuesData
                  tagName="DSAT Global"
                  full_value={formaterNumber(
                    data.dsatValue,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={numberWithBadge(data.dsatValue, 22, 16, '', 700, 600)}
                  iconType={data.variationDsatValue > 0 ? 'up' : 'down'}
                  lastVal={
                    data.variationDsatValue > 0
                      ? {
                          value: numberWithBadge(
                            data.variationDsatValue,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: numberWithBadge(
                            data.variationDsatValue,
                            12,
                            colors.colorBadge.red.red_600,
                            600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.red.red_600,
                        }
                  }
                />
              </Box>
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                marginTop={1}
                paddingY={8}
                SizeIcon={40}
              />
            )}
          </GridItem>

          <GridItem bg={gstyle.bg} p={gstyle.p} borderRadius={gstyle.radius}>
            <Box>
              <TagTitle title={'Service Level'} size={16} />
            </Box>
            <Divider mt={2} />
            {valueGetZero(data.serviceLevelValue) ? (
              <Box>
                <ValuesData
                  tagName="Global"
                  full_value={formaterNumber(
                    data.serviceLevelValue,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={numberWithBadge(
                    data.serviceLevelValue,
                    22,
                    16,
                    '',
                    700,
                    600
                  )}
                  iconType={data.variationServiceLevelValue > 0 ? 'up' : 'down'}
                  lastVal={
                    data.variationServiceLevelValue > 0
                      ? {
                          value: numberWithBadge(
                            data.variationServiceLevelValue,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: numberWithBadge(
                            data.variationServiceLevelValue,
                            12,
                            colors.colorBadge.red.red_600,
                            600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.red.red_600,
                        }
                  }
                />
              </Box>
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                marginTop={1}
                paddingY={8}
                SizeIcon={40}
              />
            )}
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
          <GridItem bg={gstyle.bg} p={gstyle.p} borderRadius={gstyle.radius}>
            <Box>
              <TagTitle title={'Temps de cycle'} size={16} />
            </Box>
            <Divider mt={2} />
            {valueGetZero(data.timeCycleValue) ? (
              <Box>
                <ValuesData
                  tagName="Global"
                  full_value={formaterNumber(
                    data.timeCycleValue,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={numberWithBadge(
                    data.timeCycleValue,
                    22,
                    16,
                    '',
                    700,
                    600
                  )}
                  iconType={data.variationTimeCycleValue > 0 ? 'up' : 'down'}
                  lastVal={
                    data.variationTimeCycleValue > 0
                      ? {
                          value: numberWithBadge(
                            data.variationTimeCycleValue,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: numberWithBadge(
                            data.variationTimeCycleValue,
                            12,
                            colors.colorBadge.red.red_600,
                            600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.red.red_600,
                        }
                  }
                />
              </Box>
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                marginTop={1}
                paddingY={10}
                SizeIcon={40}
              />
            )}
          </GridItem>
          <GridItem bg={gstyle.bg} p={gstyle.p} borderRadius={gstyle.radius}>
            <Box>
              <TagTitle title={"Taux d'abandon"} size={16} />
            </Box>
            <Divider mt={2} />
            {valueGetZero(data.rateAbandonValue) ? (
              <Box>
                <ValuesData
                  tagName="Global"
                  full_value={formaterNumber(
                    data.rateAbandonValue,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={numberWithBadge(
                    data.rateAbandonValue,
                    22,
                    16,
                    '',
                    700,
                    600
                  )}
                  iconType={data.variationRateAbandonValue > 0 ? 'up' : 'down'}
                  lastVal={
                    data.variationRateAbandonValue > 0
                      ? {
                          value: numberWithBadge(
                            data.variationTimeCycleValue,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: numberWithBadge(
                            data.variationRateAbandonValue,
                            12,
                            colors.colorBadge.red.red_600,
                            600,
                            600
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.red.red_600,
                        }
                  }
                />
              </Box>
            ) : (
              <DataUnavailable
                message={titles.title.label.dataunavailable}
                marginTop={1}
                paddingY={10}
                SizeIcon={40}
              />
            )}
          </GridItem>
        </Grid>
      </Stack>
    </DashboardLayout>
  );
}
