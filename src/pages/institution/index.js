import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { colors, direction, gird } from '@theme';
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
import { MdOutlineAdminPanelSettings } from "react-icons/md";


export default function DescAccountFormPage(props) {
  const router = useRouter();
  const [descData, setDescData] = useState();
  const week = router.query.week;
  const [selectedWeek, setSelectedWeek] = useState(week);

  const { desc } = direction;
  const gstyle = gird.style;

  //Build handleClick button
  const handleButtonClick = () => {
    router.push('institution/form/' + selectedWeek)
  }


  //const handleButt

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
    console.log('Selected Value:', value)
    if (value == 'data') router.push('dashboard/form/' + selectedWeek);
    if (value == 'project') router.push('dashboard/project/' + selectedWeek);
    if (value == 'plan') router.push('dashboard/plan/' + selectedWeek)
  }

  return (
    <DashboardLayout activeMenu={'account-institution'}>
      <Stack
        mt={1}
        w={'100%'}
        bg="#cbd5e1"
        p={1}
        borderColor="#bfbfbf"
        h={'calc(80vh - 5px)'}
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
              icon={<MdOutlineAdminPanelSettings size={26} color="#9999ff" />}
              title={'Pole administration'}
              subtitle={'/ Institution'}
            />
          </Box>
          {/* <Box mr={3}>
            <DMenuButton
              onChange={onDMenuChange}
              bgColor={'#9999ff'}
              color={'#fff'}
              name={'Creer une action'}
              rightIcon={<BsPlusLg />}
              menus={[
                {
                  value: 'data',
                  label: 'Créer un projet',
                },
                {
                  value: 'project',
                  label: 'Créer une directive',
                },
                {
                  value: 'project',
                  label: 'Créer un plan',
                },
              {
                  value: 'plan',
                  label: 'Uploader le fichier',
                },
              ]}
            />
          </Box> */}
        </HStack>
        <Divider />

        <Stack alignItems="center">
          <HStack>
            <VStack
              justifyContent={'center'}
              alignContent={'center'}
              alignItems={'center'}
              mt={30}
            >
              <TiCloudStorage size={100} color="#f5f5f5" />
              <Text
                align={'center'}
                mt={3}
                mb={3}
                fontSize={'16'}
                fontWeight={'normal'}
                fontFamily="'Roboto, mono', sans-serif"
                color={'#404245'}
              >
                Ajouter une institution
              </Text>
              <HStack alignItems={'center'}>
                {' '}
                <Button
                  w={'100%'}
                  bgColor={'#9999ff'}
                  color={'white'}
                  h={'2.5rem'}
                  onClick={handleButtonClick}
                >
                  Formulaire
                </Button>
                {/* <Button
                  w={'100%'}
                  bgColor={'#9999ff'}
                  color={'white'}
                  h={'2.5rem'}
                >
                  Fichier
                </Button> */}
              </HStack>
            </VStack>
            <VStack></VStack>
            </HStack>
            {/* <DescForm
              descForm={descData}
              directionId={desc.id}
              weekOption={weekOption}
              selectedWeek={selectedWeek}
              setSelectedWeek={setSelectedWeek}
            /> */}
        </Stack>
      </Stack>
    </DashboardLayout>
  );
}
