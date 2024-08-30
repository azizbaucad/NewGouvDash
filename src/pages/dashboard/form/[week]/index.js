import { Box, Divider, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { direction, gird } from '@theme';
import { getToken } from 'next-auth/jwt';
import { PageTitle } from '@components/common/title/page';
import { ButtonBack } from '@components/common/button';
import { DescForm } from '@components/forms/desc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getElement } from 'pages/api/global';
import { getLastWeekList } from '@utils/services/date';
import { AiFillHome } from 'react-icons/ai';
export default function DescFormPage(props) {
  const router = useRouter();
  const [descData, setDescData] = useState();
  const week = router.query.week;
  const [selectedWeek, setSelectedWeek] = useState(week);

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

  return (
    <DashboardLayout activeMenu={'account-home'}>
      <Flex mt={10} px={2} w={'100%'} mb={0}>
        <Box>
          <PageTitle
            titleSize={17}
            titleColor={'black'}
            subtitleColor={'gray'}
            subtitleSize={14}
            icon={<AiFillHome fontSize={24} color="white" />}
            title={'Présidence'}
            subtitle={'/ Dashboard Section SGPR'}
          />
        </Box>
      </Flex>

      <Stack
      mt={6}
        w={'100%'}
        mb={3}
        bg={gstyle.bg}
        p={gstyle.p}
        borderRadius={gstyle.radius}
      >
        <HStack>
          <ButtonBack color="gray" />
          <Text as="b">Formulaires de mise-à-jour des KPIs SGPR</Text>
        </HStack>
        <Divider />

        <Stack alignItems="start" px={3}>
          <DescForm
            descForm={descData}
            directionId={desc.id}
            weekOption={weekOption}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
          />
        </Stack>
      </Stack>
    </DashboardLayout>
  );
}
