import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Select,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { colors, direction, gird, hightlightStatus } from '@theme';
import { getToken } from 'next-auth/jwt';
import { PageTitle } from '@components/common/title/page';
import { ButtonBack } from '@components/common/button';
import { DescForm } from '@components/forms/desc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getElement } from 'pages/api/global';
import { getLastWeekList } from '@utils/services/date';
import { AiFillHome } from 'react-icons/ai';
import { TiCloudStorage, TiCloudStorageOutline } from 'react-icons/ti';
import { DMenuButton } from '@components/common/menu_button';
import { BsPlusLg } from 'react-icons/bs';
import { TagTitle } from '@components/common/title';
import { ValuesData } from '@components/common/data/values';
import { GiCash } from 'react-icons/gi';
import { HorizontalBarChart2 } from '@components/common/charts/barcharts';
import { scroll_customize } from '@components/common/styleprops';
import {
  HightlightContent,
  HightlightHeader,
} from '@components/common/data/hightlight';
import {
  DefaultHighlightstatus,
  highlightStatusStyle,
} from '@utils/schemas/src/highlight';
import moment from 'moment';
import { DataTableGenTest } from '@components/common/tables';
import { FcLineChart } from 'react-icons/fc';
import { LineChartsParcOM } from '@components/common/charts/linecharts';

export default function DescFormPage(props) {
  const router = useRouter();
  const [descData, setDescData] = useState();
  const week = router.query.week;
  const [selectedWeek, setSelectedWeek] = useState(week);

  //Define the status lis
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { realizes, difficults, coordinationPoint } = hightlightStatus;
  const statusList = [realizes, difficults, coordinationPoint];

  const simulatedData = [
    {
      id: 1,
      title: 'Réunion avec les partenaires internationaux',
      description: 'Discussion sur les projets de coopération en cours.',
      direction: 'Direction Internationale', // Nouvelle propriété pour la direction
      status: { name: 'realizes', label: 'Réalisés' },
      date: '2024-08-01',
    },
    {
      id: 2,
      title: 'Problèmes logistiques',
      description:
        'Difficultés dans la distribution des ressources aux régions éloignées.',
      direction: 'Direction Logistique', // Nouvelle propriété pour la direction
      status: { name: 'difficults', label: 'Difficultés' },
      date: '2024-08-03',
    },
    {
      id: 3,
      title: 'Problèmes logistiques',
      description:
        'Difficultés dans la distribution des ressources aux régions éloignées.',
      direction: 'Direction Logistique', // Nouvelle propriété pour la direction
      status: { name: 'difficults', label: 'Difficultés' },
      date: '2024-08-03',
    },
  ];

  const displayHighlight = (highligh, i) => (
    <HightlightContent
      key={i}
      title={`${highligh.direction} • ${highligh.title}`}
      body={highligh.description}
      iconBgColor={highlightStatusStyle(highligh.status?.name)?.style.iconColor}
      date={moment(highligh.date).format('DD-MM-YYYY')}
      bgColor={highlightStatusStyle(highligh.status?.name)?.style.bgColor}
      icon={highlightStatusStyle(highligh.status?.name)?.icon}
    />
  );

  const { desc } = direction;
  const gstyle = gird.style;

  const weekOption = getLastWeekList().map((date) => {
    return { value: date.week + '-' + date.year, name: date.week };
  });

  const getDescDataByWeek = () => {
    const week_num = selectedWeek?.split('-')[0];
    const week_year = selectedWeek?.split('-')[1];
    const params = '?week=' + week_num + '&year=' + week_year;
    getElement('v1/descdata/week-data' + params, null)
      .then((res) => {
        if (res.data) {
          setDescData(res.data);
        }
      })
      .catch((err) => {
        console.log('Error:::', err);
      });
  };

  useEffect(() => {
    getDescDataByWeek();
  }, [selectedWeek]);

  const onDMenuChange = (value) => {
    if (value == 'data') router.push('dashboard/form/' + selectedWeek);
  };

  const ParcDataMobile = [
    {
      id: 1,
      part: 'En cours',
      percent: 50,
    },
    {
      id: 2,
      part: 'En attente',
      percent: 30,
    },
    {
      id: 3,
      part: 'Réalisé',
      percent: 10,
    },
  ];

  const backColor = ['#083344', '#083344', '#083344', '#083344'];

  const data_ParcMobile = {
    labels: ParcDataMobile?.map((item) => item.part),
    datasets: [
      {
        barThickness: ParcDataMobile?.map((item) =>
          isNaN(item.percent) ? 0.1 : 25
        ),
        barPercentage: 0,
        label: 'Pourcentage',
        data: ParcDataMobile?.map((item) =>
          isNaN(item.percent) ? 0.1 : item.percent
        ),
        backgroundColor: backColor,
      },
    ],
  };

  return (
    <DashboardLayout activeMenu={'account-ofms'}>
      <Stack
        mt={1}
        w={'100%'}
        bg="#cbd5e1"
        borderColor="#bfbfbf"
        h={'calc(130vh - 5px)'}
        p={1}
        borderRadius={gstyle.radiusform}
      >
        <HStack p={1} mt={1} justifyContent={'space-between'}>
          {/* <ButtonBack color="gray"  /> */}
          <Box ml={1}>
            <PageTitle
              titleSize={16}
              titleColor={'black'}
              subtitleColor={'#404245'}
              subtitleSize={16}
              icon={<FcLineChart size={26} color="#9999ff" />}
              title={'Dashboard'}
              subtitle={'/ Présidence'}
            />
          </Box>
          <Box mr={3}>
          <Button
              w={'100%'}
              bgColor={'#9999ff'}
              color={'white'}
              h={'2.5rem'}
              type="submit"
              disabled
              fontWeight={500}
              fontFamily="'Roboto mono', sans-serif"
              _hover={{
                bgColor: '#9999ff', // Le hover reste la même couleur pour un effet "désactivé"
                cursor: 'not-allowed', // Changer le curseur pour indiquer que le bouton est désactivé
              }}
              _disabled={{
                bgColor: '#9999ff', // Conserver la couleur de fond pour le bouton désactivé
                color: 'white', // Garder la couleur du texte
                cursor: 'not-allowed', // Ajouter un curseur désactivé
                _hover: {
                  bgColor: '#9999ff', // Aucune modification de couleur au hover
                },
              }}
            >
              Appliquer les filtres
            </Button>
          </Box>
        </HStack>
        <Divider mt={1} mb={1} />

        <Stack p={3}>
          <Grid
            templateRows="repeat(4, 1fr)"
            templateColumns="repeat(4, 1fr)"
            h={'100vh'}
            gap={2}
          >
            <GridItem
              rowSpan={1}
              colSpan={1}
              bg="#f1f5f9"
              p={gstyle.p}
              borderRadius={gstyle.radius}
            >
              <Box>
                <TagTitle title={"Nombre d'actions"} size={16} />
                <Divider mt={2} />
                <ValuesData
                  iconType="up"
                  value={60}
                  delta={{
                    label: 'Last Year',
                    value: '+5%',
                    valueColor: '#02bc7d',
                  }}
                />
              </Box>
              {/* <Divider mt={3} mb={2} /> */}
            </GridItem>

            <GridItem
              rowSpan={1}
              colSpan={3}
              bg="#f1f5f9"
              p={gstyle.p}
              borderRadius={gstyle.radius}
            >
              <Box>
                <TagTitle title={'Action'} size={16} />
              </Box>
              <Divider mt={2} mb={2} />
              <HStack justifyContent={'space-between'} alignItems="center">
                <HStack justifyContent={'space-between'}>
                  <ValuesData
                    tagName={'Action en cours'}
                    iconType="up"
                    value={12}
                    delta={{
                      label: 'Last Year',
                      value: '+5%',
                      valueColor: '#02bc7d',
                    }}
                  />
                </HStack>
                <Box h={'8vh'}>
                  <Divider
                    orientation="vertical"
                    borderWidth={'1px'}
                    borderColor={'#ebedf2'}
                  />
                </Box>
                <HStack justifyContent={'space-between'}>
                  <ValuesData
                    tagName={'Action réalisé'}
                    iconType="up"
                    value={14}
                    delta={{
                      label: 'Last Year',
                      value: '+5%',
                      valueColor: '#02bc7d',
                    }}
                  />
                </HStack>
                <Box h={'8vh'}>
                  <Divider
                    orientation="vertical"
                    borderWidth={'1px'}
                    borderColor={'#ebedf2'}
                  />
                </Box>
                <HStack justifyContent={'space-between'}>
                  <ValuesData
                    tagName={'Action en attente'}
                    iconType="up"
                    value={600}
                    delta={{
                      label: 'Last Year',
                      value: '+5%',
                      valueColor: '#02bc7d',
                    }}
                  />
                </HStack>
              </HStack>
            </GridItem>

            <GridItem
              rowSpan={1}
              colSpan={1}
              bg="#f1f5f9"
              p={gstyle.p}
              borderRadius={gstyle.radius}
            >
              <Box>
                <TagTitle title={"Nombre de programmes"} size={16} />
                <Divider mt={2} />
                <ValuesData
                  iconType="up"
                  value={20}
                  delta={{
                    label: 'Last Year',
                    value: '+5%',
                    valueColor: '#02bc7d',
                  }}
                />
              </Box>
              {/* <Divider mt={3} mb={2} /> */}
            </GridItem>

            <GridItem
              rowSpan={1}
              colSpan={3}
              bg="#f1f5f9"
              p={gstyle.p}
              borderRadius={gstyle.radius}
            >
              <Box>
                <TagTitle title={'Programme'} size={16} />
              </Box>
              <Divider mt={2} mb={2} />
              <HStack justifyContent={'space-between'} alignItems="center">
                <HStack justifyContent={'space-between'}>
                  <ValuesData
                    tagName={'programme en cours'}
                    iconType="up"
                    value={12}
                    delta={{
                      label: 'Last Year',
                      value: '+5%',
                      valueColor: '#02bc7d',
                    }}
                  />
                </HStack>
                <Box h={'8vh'}>
                  <Divider
                    orientation="vertical"
                    borderWidth={'1px'}
                    borderColor={'#ebedf2'}
                  />
                </Box>
                <HStack justifyContent={'space-between'}>
                  <ValuesData
                    tagName={'Programme réalisé'}
                    iconType="up"
                    value={14}
                    delta={{
                      label: 'Last Year',
                      value: '+5%',
                      valueColor: '#02bc7d',
                    }}
                  />
                </HStack>
                <Box h={'8vh'}>
                  <Divider
                    orientation="vertical"
                    borderWidth={'1px'}
                    borderColor={'#ebedf2'}
                  />
                </Box>
                <HStack justifyContent={'space-between'}>
                  <ValuesData
                    tagName={'Programme en attente'}
                    iconType="up"
                    value={600}
                    delta={{
                      label: 'Last Year',
                      value: '+5%',
                      valueColor: '#02bc7d',
                    }}
                  />
                </HStack>
              </HStack>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={1}
              bg="#f1f5f9"
              p={gstyle.p}
              borderRadius={gstyle.radius}
            >
              <Box>
                <TagTitle title={"Nombre de projets"} size={16} />
                <Divider mt={2} />
                <ValuesData
                  iconType="up"
                  value={60}
                  delta={{
                    label: 'Last Year',
                    value: '+5%',
                    valueColor: '#02bc7d',
                  }}
                />
              </Box>
              {/* <Divider mt={3} mb={2} /> */}
            </GridItem>

            <GridItem
              rowSpan={1}
              colSpan={3}
              bg="#f1f5f9"
              p={gstyle.p}
              borderRadius={gstyle.radius}
            >
              <Box>
                <TagTitle title={'Projet'} size={16} />
              </Box>
              <Divider mt={2} mb={2} />
              <HStack justifyContent={'space-between'} alignItems="center">
                <HStack justifyContent={'space-between'}>
                  <ValuesData
                    tagName={'Projet en cours'}
                    iconType="up"
                    value={12}
                    delta={{
                      label: 'Last Year',
                      value: '+5%',
                      valueColor: '#02bc7d',
                    }}
                  />
                </HStack>
                <Box h={'8vh'}>
                  <Divider
                    orientation="vertical"
                    borderWidth={'1px'}
                    borderColor={'#ebedf2'}
                  />
                </Box>
                <HStack justifyContent={'space-between'}>
                  <ValuesData
                    tagName={'Projet réalisé'}
                    iconType="up"
                    value={14}
                    delta={{
                      label: 'Last Year',
                      value: '+5%',
                      valueColor: '#02bc7d',
                    }}
                  />
                </HStack>
                <Box h={'8vh'}>
                  <Divider
                    orientation="vertical"
                    borderWidth={'1px'}
                    borderColor={'#ebedf2'}
                  />
                </Box>
                <HStack justifyContent={'space-between'}>
                  <ValuesData
                    tagName={'Projet en attente'}
                    iconType="up"
                    value={600}
                    delta={{
                      label: 'Last Year',
                      value: '+5%',
                      valueColor: '#02bc7d',
                    }}
                  />
                </HStack>
              </HStack>
            </GridItem>
            
            

            {/* <GridItem
              rowSpan={50}
              colSpan={3}
              bg="#f1f5f9"
              p={gstyle.p}
              borderRadius={gstyle.radius}
            >
              <Box>
                <TagTitle title={'Table des direcives'} size={16} />
              </Box>
              <Divider mt={3} mb={2} />
              <HStack justifyContent={'space-between'} alignItems="center">
                <HStack justifyContent={'space-between'} w={'100%'}>
                  <DataTableGenTest />
                </HStack>
              </HStack>
            </GridItem>
            <GridItem
              rowSpan={50}
              colSpan={1}
              bg="#f1f5f9"
              p={gstyle.p}
              borderRadius={gstyle.radius}
            >
              <Box>
                <TagTitle
                  title={"Etat d'avancement des directives"}
                  size={16}
                />
              </Box>
              <Divider mt={3} mb={2} />
              <HStack justifyContent={'space-between'} alignItems="center">
                <HStack justifyContent={'space-between'}>
                  <HorizontalBarChart2 chartData={data_ParcMobile} />
                </HStack>
              </HStack>
            </GridItem> */}
            <GridItem
              rowSpan={60}
              colSpan={2}
              bg="#f1f5f9"
              p={gstyle.p}
              borderRadius={gstyle.radius}
            >
              <Box>
                <TagTitle title={'Evolution du budget consomé'} size={16} />
              </Box>
              <Divider mt={3} mb={2} />
              <Box w={'100%'} h={'100%'} mt={5}>
                <LineChartsParcOM />
              </Box>
            </GridItem>
            <GridItem
              rowSpan={60}
              colSpan={2}
              bg="#f1f5f9"
              p={gstyle.p}
              borderRadius={gstyle.radius}
              overflow="auto"
              css={scroll_customize}
            >
              <Stack mt={0}>
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
                        Tous les faits marquants
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
                {simulatedData.map((highlight, i) =>
                  displayHighlight(highlight, i)
                )}
              </Stack>
            </GridItem>
          </Grid>
        </Stack>
      </Stack>
    </DashboardLayout>
  );
}
