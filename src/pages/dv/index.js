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
import { gird, hightlightStatus, colors, titles, direction } from '@theme';
import { getToken } from 'next-auth/jwt';
import { BsPlusLg } from 'react-icons/bs';
import { PageTitle } from '@components/common/title/page';
import { IconedButton } from '@components/common/button';
import { scroll_customize } from '@components/common/styleprops';
import {
  LineCharts,
  LineChartsFibreDv,
  LineChartsMobileDv,
  LineChartsOMDv,
} from '@components/common/charts/linecharts';
import { ListSemaineItem } from '@components/common/dropdown_item';
import { TabsPanelItem } from '@components/common/tabs';
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
import { useEffect, useState } from 'react';
import {
  getHightlightData,
  getHightlightStatus,
} from '@utils/services/hightlight/data';
import { HighlightModal } from '@components/common/modal/highlight';
import moment from 'moment';
import { getCurrentWeek, getLastWeek } from '@utils/services/date';
import { ValidationModal } from '@components/common/modal/week_validator';
import { DvDataModal } from '@components/common/modal/dvdata';
import { DMenuButton } from '@components/common/menu_button';
import { FaCheck, FaCopy } from 'react-icons/fa';
import { getElement } from 'pages/api/global';
import { CopyHighlightModal } from '@components/common/modal/highlight/copy/index.';
import { DataUnavailable } from '@components/common/data_unavailable';

export default function DvPage(props) {
  const gstyle = gird.style;
  const { dv } = direction;
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
    onOpen: onOpenDvData,
    isOpen: isOpenDvData,
    onClose: onCloseDvData,
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

  const { realizes, difficults, challenges, coordinationPoint } =
    hightlightStatus;
  const [selectedStatus, setSelectedStatus] = useState('all');
  const statusList = [realizes, difficults, challenges, coordinationPoint];

  const lastWeek = getLastWeek().week + '-' + getLastWeek().year;
  const [selectedWeek, setSelectedWeek] = useState(lastWeek);
  const [role, setRole] = useState();

  const initData = {
    value_gross_add_om: null,
    valueVsObjective_gross_add_om: null,
    valueVariationWeek_gross_add_om: null,

    value_gross_add_mobile: null,
    valueVsObjective_gross_add_mobile: null,
    valueVariationWeek_gross_add_mobile: null,

    value_gross_add_fibre: null,
    valueVsObjective_gross_add_fibre: null,
    valueVariationWeek_gross_add_fibre: null,

    valueCsat: null,
    valueVariationWeekCsat: null,
    valueVsObjectiveCsat: null,
  };

  const [data, setData] = useState(initData);

  const getHightlight = () => {
    getHightlightData(
      selectedWeek?.split('-')[0],
      selectedWeek?.split('-')[1],
      dv.id,
      setHighlights,
      setError
    );
  };

  const getValuesData = () => {
    const params =
      'week=' +
      selectedWeek?.split('-')[0] +
      '&year=' +
      selectedWeek?.split('-')[1];

    getElement('v1/direction-data/data-dv?' + params)
      .then((res) => {
        if (res?.data) {
          setData({
            value_gross_add_om: res.data?.value_gross_add_om,
            valueVsObjective_gross_add_om:
              res.data?.valueVsObjective_gross_add_om,
            valueVariationWeek_gross_add_om:
              res.data?.valueVariationWeek_gross_add_om,

            value_gross_add_mobile: res.data?.value_gross_add_mobile,
            valueVsObjective_gross_add_mobile:
              res.data?.valueVsObjective_gross_add_mobile,
            valueVariationWeek_gross_add_mobile:
              res.data?.valueVariationWeek_gross_add_mobile,

            value_gross_add_fibre: res.data?.value_gross_add_fibre,
            valueVsObjective_gross_add_fibre:
              res.data?.valueVsObjective_gross_add_fibre,
            valueVariationWeek_gross_add_fibre:
              res.data?.valueVariationWeek_gross_add_fibre,

            valueCsat: res.data?.valueCsat,
            valueVariationWeekCsat: res.data?.valueVariationWeekCsat,
            valueVsObjectiveCsat: res.data?.valueVsObjectiveCsat,
          });
        } else {
          setData(initData);
        }
      })
      .catch((error) => {
        console.log('Error ::: ', error);
        setData(initData);
      });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRole(sessionStorage.getItem('role'));
    }
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
    if (value === 'validate') return onOpenVal();
    if (value === 'grossadd') return onOpenDvData();
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
    <DashboardLayout activeMenu={'account-dv'}>
      <HighlightModal
        onOpen={onOpenFm}
        onClose={onCloseFm}
        isOpen={isOpenFm}
        weekListOption={currentWeekList}
        highlightStatus={highlightStatus}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        getHightlight={getHightlight}
        direction={dv}
        selectedHighlight={selectedHighlight}
      />
      <ValidationModal
        onOpen={onOpenVal}
        onClose={onCloseVal}
        isOpen={isOpenVal}
        direction={dv}
        week={selectedWeek}
      />
      <DvDataModal
        onOpen={onOpenDvData}
        onClose={onCloseDvData}
        isOpen={isOpenDvData}
        direction={dv}
        week={selectedWeek}
        getValuesData={getValuesData}
      />

      <CopyHighlightModal
        onOpen={onCopyOpen}
        onClose={onCopyClose}
        isOpen={isCopyOpen}
        weekListOption={currentWeekList}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        direction={dv}
        getHightlight={getHightlight}
      />
      <Flex mt={3} px={2} w={'100%'} mb={3}>
        <Box>
          <PageTitle
            titleSize={17}
            titleColor={'black'}
            subtitleColor={'gray'}
            subtitleSize={14}
            icon={dv.icon}
            title={dv.label}
            subtitle={' / ' + dv.description}
          />
        </Box>
        <Spacer />
        <Box mr={2}>
          {role && !role.includes('no') && (
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
                  icon: <BsPlusLg />,
                  value: 'grossadd',
                  label: 'Ajouter gross add',
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
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={2}
          h={gstyle.h * 3 + 'px'}
        >
          <GridItem bg={gstyle.bg} p={gstyle.p} borderRadius={gstyle.radius}>
            <Box>
              <TagTitle title={'Gross Add OM'} size={16} />
            </Box>
            <Divider mt={2} />
            {valueGetZero(data.value_gross_add_om) ? (
              <Box>
                <ValuesData
                  tagName="Inscriptions utiles"
                  full_value={formaterNumber(
                    data.value_gross_add_om,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={formaterNumber(
                    data.value_gross_add_om,
                    22,
                    16,
                    '',
                    700,
                    600,
                    'i'
                  )}
                  iconType={
                    data.valueVariationWeek_gross_add_om >= 0 ? 'up' : 'down'
                  }
                  delta={
                    data.valueVsObjective_gross_add_om >= 0
                      ? {
                          value: formaterNumber(
                            data.valueVsObjective_gross_add_om,
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
                            data.valueVsObjective_gross_add_om,
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
                    data.valueVariationWeek_gross_add_om >= 0
                      ? {
                          value: formaterNumberItalic(
                            data.valueVariationWeek_gross_add_om,
                            12,
                            colors.colorBadge.green.green_600,
                            600,

                            colors.colorBadge.red.light
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: formaterNumberItalic(
                            data.valueVariationWeek_gross_add_om,
                            12,
                            colors.colorBadge.red.red_600,
                            600,
                            colors.colorBadge.red.red_600
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
              <TagTitle title={'Gross Add Mobile'} size={16} />
            </Box>
            <Divider mt={2} />
            {valueGetZero(data.value_gross_add_mobile) ? (
              <Box>
                <ValuesData
                  tagName="Activations SIM"
                  full_value={formaterNumber(
                    data.value_gross_add_mobile,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={formaterNumber(
                    data.value_gross_add_mobile,
                    22,
                    16,
                    '',
                    700,
                    600,
                    'i'
                  )}
                  iconType={
                    data.valueVariationWeek_gross_add_mobile >= 0
                      ? 'up'
                      : 'down'
                  }
                  delta={
                    data.valueVsObjective_gross_add_mobile >= 0
                      ? {
                          value: formaterNumber(
                            data.valueVsObjective_gross_add_mobile,
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
                            data.valueVsObjective_gross_add_mobile,
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
                    data.valueVariationWeek_gross_add_mobile >= 0
                      ? {
                          value: formaterNumberItalic(
                            data.valueVariationWeek_gross_add_mobile,
                            12,
                            colors.colorBadge.green.green_600,
                            600,

                            colors.colorBadge.red.light
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: formaterNumberItalic(
                            data.valueVariationWeek_gross_add_mobile,
                            12,
                            colors.colorBadge.red.red_600,
                            600,
                            colors.colorBadge.red.red_600
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
              <TagTitle title={'Gross Add Fibre'} size={16} />
            </Box>
            <Divider mt={2} />
            {valueGetZero(data.value_gross_add_fibre) ? (
              <Box>
                <ValuesData
                  tagName="Ventes validées"
                  full_value={formaterNumber(
                    data.value_gross_add_fibre,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={formaterNumberItalic(
                    data.value_gross_add_fibre,
                    22,
                    16,
                    '',
                    700,
                    600,
                    'i'
                  )}
                  iconType={
                    data.valueVariationWeek_gross_add_fibre >= 0 ? 'up' : 'down'
                  }
                  delta={
                    data.valueVsObjective_gross_add_fibre >= 0
                      ? {
                          value: formaterNumberItalic(
                            data.valueVsObjective_gross_add_fibre,
                            12,
                            colors.colorBadge.green.green_600,
                            600,
                            colors.colorBadge.green.green_600
                          ),
                          label: titles.title.label.obj,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: formaterNumberItalic(
                            data.valueVsObjective_gross_add_fibre,
                            12,
                            colors.colorBadge.red.red_600,
                            600,
                            colors.colorBadge.red.red_600
                          ),
                          label: titles.title.label.obj,
                          valueColor: colors.colorBadge.red.red_600,
                        }
                  }
                  lastVal={
                    data.valueVariationWeek_gross_add_fibre >= 0
                      ? {
                          value: formaterNumberItalic(
                            data.valueVariationWeek_gross_add_fibre,
                            12,
                            colors.colorBadge.green.green_600,
                            600,

                            colors.colorBadge.red.light
                          ),
                          label: titles.title.label.s1,
                          valueColor: colors.colorBadge.green.green_600,
                        }
                      : {
                          value: formaterNumberItalic(
                            data.valueVariationWeek_gross_add_fibre,
                            12,
                            colors.colorBadge.red.red_600,
                            600,
                            colors.colorBadge.red.red_600
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
              <TagTitle title={'CSAT'} size={16} />
            </Box>
            <Divider mt={2} />
            {valueGetZero(data.valueCsat) ? (
              <Box>
                <ValuesData
                  tagName="Sondages clients à chaud"
                  full_value={formaterNumber(
                    data.valueCsat,
                    18,
                    '#ffffff',
                    600
                  )}
                  value={numberWithBadge(data.valueCsat, 22, 16, '', 700, 600)}
                  iconType={data.valueVariationWeekCsat >= 0 ? 'up' : 'down'}
                  delta={
                    data.valueVsObjectiveCsat >= 0
                      ? {
                          value: numberWithBadge(
                            data.valueVsObjectiveCsat,
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
                            data.valueVsObjectiveCsat,
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
                    data.valueVariationWeekCsat >= 0
                      ? {
                          value: numberWithBadge(
                            data.valueVariationWeekCsat,
                            12,
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
                            data.valueVariationWeekCsat,
                            12,
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
            rowSpan={3}
            colSpan={2}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
            overflowY="auto"
            css={scroll_customize}
          >
            <Box>
              <TagTitle title={"Courbe d'évolution des Gross Add"} size={16} />
            </Box>
            <Divider mb={2} mt={3} />
            <Box>
              <TabsPanelItem
                fSize={'12px'}
                w1={'100%'}
                h1={'250px'}
                title1={'Mobile vs Obj'}
                tab1={<LineChartsMobileDv selectedWeek={selectedWeek} />}
                w2={'100%'}
                h2={'250px'}
                title2={'Fibre vs Obj'}
                tab2={<LineChartsFibreDv selectedWeek={selectedWeek} />}
                w3={'100%'}
                h3={'250px'}
                title3={'OM vs Obj'}
                tab3={<LineChartsOMDv selectedWeek={selectedWeek} />}
              />
            </Box>
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
