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
    <DashboardLayout activeMenu={'account-desc'}>
      <Flex mt={3} px={2} w={'100%'} mb={3}>
        <Box>
          <PageTitle
            titleSize={17}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={14}
            icon={desc.icon}
            title={desc.label}
            subtitle={' / ' + desc.description}
          />
        </Box>
      </Flex>

      <Stack
        w={'100%'}
        mb={3}
        bg={gstyle.bg}
        p={gstyle.p}
        borderRadius={gstyle.radius}
      >
        <HStack>
          <ButtonBack color="gray" />
          <Text as="b">Formulaires de mise-à-jour des valeurs</Text>
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
