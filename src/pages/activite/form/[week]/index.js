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
import { DescAccountForm, DescActiviteForm, DescForm, DescPlanForm } from '@components/forms/desc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getElement } from 'pages/api/global';
import { getLastWeekList } from '@utils/services/date';
import { AiFillHome } from 'react-icons/ai';
import { TiCloudStorage, TiCloudStorageOutline } from 'react-icons/ti';

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
    <DashboardLayout activeMenu={'account-activite'}>
      <Stack
        mt={1}
        w={'100%'}
        bg="#cbd5e1"
        p={1}
        borderColor="#bfbfbf"
        h={'calc(100vh - 80px)'}
        borderRadius={gstyle.radiusform}
      >
        <Stack alignItems={'start'} px={3} mt={10}>
          <DescActiviteForm
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
