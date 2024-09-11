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
import { getElement } from 'pages/api/global';
import {
  abreviateNumberWithXof,
  abreviateNumberWithXofWithBadge,
  formaterNumber,
  formaterNumberWithBadge,
} from '@utils/formater';
import { AiFillSave } from 'react-icons/ai';
import { kpiCard } from '@components/common/kpi_card';

export default function DigitalPage(props) {
  const gstyle = gird.style;
  const { digital } = direction;

  const [highlightStatus, setHighlightStatus] = useState();
  const [currentWeekList, setCurrentWeekList] = useState();
  const [selectedHighlight, setSelectedHighlight] = useState();

  const lastWeek = getLastWeek().week + '-' + getLastWeek().year;
  const [selectedWeek, setSelectedWeek] = useState(lastWeek);
  const [values, setValues] = useState();

  const [error, setError] = useState();

  const getValuesData = () => {
    const params =
      'week=' +
      selectedWeek?.split('-')[0] +
      '&year=' +
      selectedWeek?.split('-')[1];
    getElement('v1/direction-data/data-digital?' + params)
      .then((res) => {
        setValues(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getValuesData();
  }, [selectedWeek]);

  return (
    <DashboardLayout activeMenu={'account-digital'}>
      <Flex mt={3} px={2} w={'100%'} mb={3}>
        <Box>
          <PageTitle
            titleSize={17}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={14}
            icon={digital.icon}
            title={digital.label}
            subtitle={' / ' + digital.description}
          />
        </Box>
        <Spacer />
        <ListSemaineItem
          onWeekSelect={setSelectedWeek}
          selectedWeek={selectedWeek}
        />
      </Flex>

      <Stack p={2} w={'100%'}>
        <Grid
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={2}
          h={'530px'}
        >
          {/* First row */}
          <GridItem
            colSpan={2}
            rowSpan={2}
            bg={gstyle.bg}
            borderRadius={gstyle.radius}
            p={gstyle.p}
          >
            {/* Content for Part de marché (en %) */}
            <Box>
              <TagTitle title={'CA recharges'} size={16} />
            </Box>
            <Divider mt={3} mb={2} borderColor="gray.100" />

            <Flex mt={3} backgroundColor="" display={'block'} spacing={1}>
              <SimpleGrid
                columns={{ base: 1, md: 1, lg: 1 }}
                spacing={0}
                mb={0}
              >
                <VStack
                  p={2}
                  mb={1}
                  spacing={1}
                  borderColor="gray.50"
                  alignItems={'space-between'}
                >
                  <Text
                    color="#000000"
                    fontWeight={620}
                    fontSize={14}
                    textTransform={'uppercase'}
                  >
                    digitaux
                  </Text>
                  <Divider borderColor="gray.100" mt={2} mb={2} />
                  <HStack
                    justifyContent={'space-between'}
                    alignItems="flex-start"
                  >
                    <Box>
                      <ValuesData
                        tagName="MAXIT"
                        value={formaterNumber(
                          values?.find(
                            ({ name }) =>
                              name == 'nombre_recharges_digitaux_maxit_telco'
                          )?.value,
                          22,
                          16,
                          '',
                          700,
                          600
                        )}
                        unit=""
                        iconType={
                          values?.find(
                            ({ name }) =>
                              name == 'nombre_recharges_digitaux_maxit_telco'
                          )?.variation > 0
                            ? 'up'
                            : 'down'
                        }
                        lastVal={
                          values?.find(
                            ({ name }) =>
                              name == 'nombre_recharges_digitaux_maxit_telco'
                          )?.variation > 0
                            ? {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) =>
                                      name ==
                                      'nombre_recharges_digitaux_maxit_telco'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.green.green_600,
                                  600,
                                  colors.colorBadge.green.green_600
                                ),
                                label: titles.title.label.s1,
                              }
                            : {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) =>
                                      name ==
                                      'nombre_recharges_digitaux_maxit_telco'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.red.red_600,
                                  600,
                                  colors.colorBadge.red.red_600
                                ),
                                label: titles.title.label.s1,
                              }
                        }
                      />
                    </Box>
                    <Box h={'15vh'}>
                      <Divider
                        orientation="vertical"
                        ml={6}
                        borderWidth={'1px'}
                        borderColor={'gray.100'}
                      />
                    </Box>
                    <Box>
                      <ValuesData
                        tagName="OM"
                        value={formaterNumber(
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_digitaux_om'
                          )?.value,
                          22
                        )}
                        iconType={
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_digitaux_om'
                          )?.variation > 0
                            ? 'up'
                            : 'down'
                        }
                        lastVal={
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_digitaux_om'
                          )?.variation > 0
                            ? {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) =>
                                      name == 'nombre_recharges_digitaux_om'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.green.green_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                            : {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) =>
                                      name == 'nombre_recharges_digitaux_om'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.red.red_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                        }
                      />
                    </Box>
                    <Box h={'15vh'}>
                      <Divider
                        orientation="vertical"
                        ml={6}
                        borderWidth={'1px'}
                        borderColor={'gray.100'}
                      />
                    </Box>
                    <Box>
                      <ValuesData
                        tagName="Crédit OM"
                        value={formaterNumber(
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_credit_om'
                          )?.value,
                          22
                        )}
                        iconType={
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_credit_om'
                          )?.variation > 0
                            ? 'up'
                            : 'down'
                        }
                        //delta={{ value: formaterNumber(data.deltaParcFibreFtthGPVsObj, 11, '#68D391', 600), label: titles.title.label.obj}}
                        lastVal={
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_credit_om'
                          )?.variation > 0
                            ? {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) =>
                                      name == 'nombre_recharges_credit_om'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.green.green_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                            : {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) =>
                                      name == 'nombre_recharges_credit_om'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.red.red_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                        }
                      />
                    </Box>
                  </HStack>

                  <Divider borderColor={'gray.100'} mt={1} mb={2} />
                  <HStack
                    justifyContent={'space-between'}
                    alignItems="flex-start"
                  >
                    <Box>
                      <ValuesData
                        tagName="Global"
                        value={formaterNumber(
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_digitaux'
                          )?.value,
                          22
                        )}
                        iconType={
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_digitaux'
                          )?.variation > 0
                            ? 'up'
                            : 'down'
                        }
                        lastVal={
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_digitaux'
                          )?.variation > 0
                            ? {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) =>
                                      name == 'nombre_recharges_digitaux'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.green.green_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                            : {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) =>
                                      name == 'nombre_recharges_digitaux'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.red.red_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                        }
                      />
                    </Box>
                    <Box h={'15vh'}>
                      <Divider
                        orientation="vertical"
                        ml={6}
                        borderWidth={'1px'}
                        borderColor={'gray.100'}
                      />
                    </Box>
                    <Box>
                      <ValuesData
                        tagName="Tous Canaux"
                        value={formaterNumber(
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_tous_canaux'
                          )?.value,
                          22,
                          16,
                          '',
                          700,
                          600
                        )}
                        iconType={
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_tous_canaux'
                          )?.variation > 0
                            ? 'up'
                            : 'down'
                        }
                        //delta={{ value: abreviateNumberWithXof(data.caDataMobile, 11, 11, "#68D391", 600), label: titles.title.label.obj, valueColor: 'red' }}
                        lastVal={
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_tous_canaux'
                          )?.variation > 0
                            ? {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) =>
                                      name == 'nombre_recharges_tous_canaux'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.green.green_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                            : {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) =>
                                      name == 'nombre_recharges_tous_canaux'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.red.red_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                        }
                      />
                    </Box>
                    <Box h={'15vh'}>
                      <Divider
                        orientation="vertical"
                        ml={6}
                        borderWidth={'1px'}
                        borderColor={'gray.100'}
                      />
                    </Box>
                    <Box>
                      <ValuesData
                        tagName="Total OM"
                        value={formaterNumber(
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_total_om'
                          )?.value,
                          22
                        )}
                        iconType={
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_total_om'
                          )?.variation > 0
                            ? 'up'
                            : 'down'
                        }
                        //delta={{ value: formaterNumber(data.deltaParcFibreFtthGPVsObj, 11, '#68D391', 600), label: titles.title.label.obj}}
                        lastVal={
                          values?.find(
                            ({ name }) => name == 'nombre_recharges_total_om'
                          )?.variation > 0
                            ? {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) =>
                                      name == 'nombre_recharges_total_om'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.green.green_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                            : {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) =>
                                      name == 'nombre_recharges_total_om'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.red.red_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                        }
                      />
                    </Box>
                  </HStack>
                </VStack>
              </SimpleGrid>
            </Flex>
          </GridItem>

          <GridItem
            colSpan={2}
            rowSpan={1}
            bg={gstyle.bg}
            borderRadius={gstyle.radius}
            p={gstyle.p}
          >
            {/* Content for Part de marché (en %) */}
            <Box>
              <TagTitle title={'Parc active users'} size={16} />
            </Box>
            <Divider mt={3} mb={2} borderColor="gray.100" />

            <Flex mt={3} backgroundColor="" display={'block'} spacing={1}>
              <SimpleGrid
                columns={{ base: 1, md: 1, lg: 1 }}
                spacing={0}
                mb={0}
              >
                <VStack p={2} mb={1} spacing={1} alignItems={'space-between'}>
                  <Text
                    color="#000000"
                    fontWeight={620}
                    fontSize={14}
                    textTransform={'uppercase'}
                  >
                    digitaux
                  </Text>
                  <Divider borderColor="gray.100" mt={2} mb={2} />

                  <HStack
                    justifyContent={'space-between'}
                    alignItems="flex-start"
                  >
                    <Box>
                      <ValuesData
                        tagName="MAXIT"
                        value={formaterNumber(
                          values?.find(
                            ({ name }) => name == 'maxit_active_users'
                          )?.value,
                          22,
                          16,
                          '',
                          700,
                          600
                        )}
                        unit=""
                        iconType={
                          values?.find(
                            ({ name }) => name == 'maxit_active_users'
                          )?.variation > 0
                            ? 'up'
                            : 'down'
                        }
                        lastVal={
                          values?.find(
                            ({ name }) => name == 'maxit_active_users'
                          )?.variation > 0
                            ? {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) => name == 'maxit_active_users'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.green.green_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                            : {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) => name == 'maxit_active_users'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.red.red_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                        }
                      />
                    </Box>

                    <Box h={'15vh'}>
                      <Divider
                        orientation="vertical"
                        ml={6}
                        borderWidth={'1px'}
                        borderColor={'gray.100'}
                      />
                    </Box>
                    <Box>
                      <ValuesData
                        tagName="OM"
                        value={formaterNumber(
                          values?.find(
                            ({ name }) => name == 'maxit_active_users'
                          )?.value,
                          22,
                          16,
                          '',
                          700,
                          600
                        )}
                        unit=""
                        iconType={
                          values?.find(
                            ({ name }) => name == 'maxit_active_users'
                          )?.variation > 0
                            ? 'up'
                            : 'down'
                        }
                        lastVal={
                          values?.find(
                            ({ name }) => name == 'maxit_active_users'
                          )?.variation > 0
                            ? {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) => name == 'maxit_active_users'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.green.green_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                            : {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) => name == 'maxit_active_users'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.red.red_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                        }
                      />
                    </Box>
                    <Box h={'15vh'}>
                      <Divider
                        orientation="vertical"
                        ml={6}
                        borderWidth={'1px'}
                        borderColor={'gray.100'}
                      />
                    </Box>
                    <Box>
                      <ValuesData
                        tagName="Global"
                        value={formaterNumber(
                          values?.find(
                            ({ name }) => name == 'digital_active_users'
                          )?.value,
                          22
                        )}
                        iconType={
                          values?.find(
                            ({ name }) => name == 'digital_active_users'
                          )?.variation > 0
                            ? 'up'
                            : 'down'
                        }
                        //delta={{ value: formaterNumber(data.deltaParcFibreFtthGPVsObj, 11, '#68D391', 600), label: titles.title.label.obj}}
                        lastVal={
                          values?.find(
                            ({ name }) => name == 'digital_active_users'
                          )?.variation > 0
                            ? {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) => name == 'digital_active_users'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.green.green_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                            : {
                                value: formaterNumberWithBadge(
                                  values?.find(
                                    ({ name }) => name == 'digital_active_users'
                                  )?.variation,
                                  12,
                                  colors.colorBadge.red.red_600,
                                  600,
                                  colors.colorBadge.red.red_transparent
                                ),
                                label: titles.title.label.s1,
                                valueColor: 'red',
                              }
                        }
                      />
                    </Box>
                  </HStack>
                </VStack>
              </SimpleGrid>
            </Flex>
          </GridItem>

          <GridItem
            colSpan={2}
            bg={gstyle.bg}
            p={gstyle.p}
            borderRadius={gstyle.radius}
          >
            <Box>
              <TagTitle title={'Parc active smartphones'} size={16} />
            </Box>

            <Divider mt={3} mb={1} borderColor="gray.100" />
            <Flex mt={3} backgroundColor="" display={'block'} spacing={1}>
              <VStack
                p={2}
                mb={1}
                spacing={1}
                borderRadius="md"
                backgroundColor="white"
                borderColor="gray.50"
                alignItems={'space-between'}
              >
                <HStack
                  justifyContent={'space-between'}
                  alignItems="flex-start"
                >
                  <Box>
                    <ValuesData
                      tagName="Smartphones"
                      value={formaterNumber(
                        values?.find(({ name }) => name == 'active_smartphone')
                          ?.value,
                        22,
                        16,
                        '',
                        700,
                        600
                      )}
                      iconType={
                        values?.find(({ name }) => name == 'active_smartphone')
                          ?.variation > 0
                          ? 'up'
                          : 'down'
                      }
                      //delta={{ value: abreviateNumberWithXof(data.caDataMobile, 11, 11, "#68D391", 600), label: titles.title.label.obj, valueColor: 'red' }}
                      lastVal={
                        values?.find(({ name }) => name == 'active_smartphone')
                          ?.variation > 0
                          ? {
                              value: formaterNumberWithBadge(
                                values?.find(
                                  ({ name }) => name == 'active_smartphone'
                                )?.variation,
                                12,
                                colors.colorBadge.green.green_600,
                                600,
                                colors.colorBadge.red.red_transparent
                              ),
                              label: titles.title.label.s1,
                              valueColor: 'red',
                            }
                          : {
                              value: formaterNumberWithBadge(
                                values?.find(
                                  ({ name }) => name == 'active_smartphone'
                                )?.variation,
                                12,
                                colors.colorBadge.red.red_600,
                                600,
                                colors.colorBadge.red.red_transparent
                              ),
                              label: titles.title.label.s1,
                              valueColor: 'red',
                            }
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
                      tagName="Smartphones 1mo"
                      value={formaterNumber(
                        values?.find(
                          ({ name }) => name == 'active_smartphone_1Mo'
                        )?.value,
                        22
                      )}
                      iconType={
                        values?.find(
                          ({ name }) => name == 'active_smartphone_1Mo'
                        )?.variation > 0
                          ? 'up'
                          : 'down'
                      }
                      //delta={{ value: formaterNumber(data.deltaParcFibreFtthGPVsObj, 11, '#68D391', 600), label: titles.title.label.obj}}
                      lastVal={
                        values?.find(
                          ({ name }) => name == 'active_smartphone_1Mo'
                        )?.variation > 0
                          ? {
                              value: formaterNumberWithBadge(
                                values?.find(
                                  ({ name }) => name == 'active_smartphone_1Mo'
                                )?.variation,
                                12,
                                colors.colorBadge.green.green_600,
                                600,
                                colors.colorBadge.red.red_transparent
                              ),
                              label: titles.title.label.s1,
                              valueColor: 'red',
                            }
                          : {
                              value: formaterNumberWithBadge(
                                values?.find(
                                  ({ name }) => name == 'active_smartphone_1Mo'
                                )?.variation,
                                12,
                                colors.colorBadge.red.red_600,
                                600,
                                colors.colorBadge.red.red_transparent
                              ),
                              label: titles.title.label.s1,
                              valueColor: 'red',
                            }
                      }
                    />
                  </Box>
                </HStack>
              </VStack>
            </Flex>

            {/* Content for Répartition (en %) */}
          </GridItem>

          {/* Second row */}
        </Grid>
      </Stack>
    </DashboardLayout>
  );
}
