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
import { DescForm, DescPlanForm } from '@components/forms/desc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getElement } from 'pages/api/global';
import { getLastWeekList } from '@utils/services/date';
import { AiFillHome } from 'react-icons/ai';
import { TiCloudStorage, TiCloudStorageOutline } from 'react-icons/ti';

export default function DescFormProject(props) {
  const router = useRouter();
  const [descData, setDescData] = useState();
  const week = router.query.week;
  const [selectedWeek, setSelectedWeek] = useState(week);

  const { desc } = direction;
  const gstyle = gird.style;

  const weekOption = getLastWeekList().map((date) => {
    return { value: date.week + '-' + date.year, name: date.week };
  });

  const statusList = ['En cours', 'En attente'];

  const currentYearList = ['2024', '2025', '2026', '2027', '2028'];

  const statusOption = statusList.map((status) => {
    return { value: status.toLowerCase().replace(' ', '_'), name: status };
  });

  const currentYearOption = currentYearList.map((year) => {
    return { value: year, name: year };
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

  return (
    <DashboardLayout activeMenu={'account-home'}>
      <Stack
        mt={6}
        w={'100%'}
        bg="#e2e8f0"
        borderColor="#bfbfbf"
        h={'calc(100vh - 50px)'}
        borderRadius={gstyle.radiusform}
      >
       {/*  <HStack p={1} mt={1} justifyContent={'start'}>
        <Box mt={2}>
            <ButtonBack color="gray" />
          </Box>
          <Box ml={1}>
            <PageTitle
              titleSize={16}
              titleColor={'black'}
              subtitleColor={'#404245'}
              subtitleSize={16}
              icon={<AiFillHome size={26} color="#9999ff" />}
              title={'Assistant de renseignement de directives Primature '}
              subtitle={'/ Structure IGE Section SGPR'}
            />
          </Box>
        </HStack>
        <Divider /> */}

        <Stack alignItems={'start'} px={3} mt={10}>
          <DescForm
            descForm={descData}
            directionId={desc.id}
            currentYearOption={currentYearOption}
            statusOption={statusOption}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
          />
        </Stack>
      </Stack>
    </DashboardLayout>
  );
}
