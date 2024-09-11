import { HightlightContent } from '@components/common/data/hightlight';
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { TagTitle } from '@components/common/title';
import { DashboardLayout } from '@components/layout/dashboard';
import { direction, gird, hightlightStatus } from '@theme';
import { getToken } from 'next-auth/jwt';
import { BsPlusLg } from 'react-icons/bs';

import { PageTitle } from '@components/common/title/page';
import { MdSearchOff } from 'react-icons/md';
import { BiSolidSquareRounded } from 'react-icons/bi';
import { IconedButton } from '@components/common/button';
import { ListSemaineItem } from '@components/common/dropdown_item';
import {
  scroll_customize,
  scroll_x_customize,
} from '@components/common/styleprops';
import { useEffect, useState } from 'react';
import {
  getHightlightData,
  getHightlightStatus,
} from '@utils/services/hightlight/data';
import { HighlightModal } from '@components/common/modal/highlight';
import moment from 'moment';
import { getCurrentWeek, getLastWeek } from '@utils/services/date';
import { highlightStatusStyle } from '@utils/schemas/src/highlight';
import { FaCopy } from 'react-icons/fa';
import { CopyHighlightModal } from '@components/common/modal/highlight/copy/index.';
import { DMenuButton } from '@components/common/menu_button';

export default function DrpsPage(props) {
  const gstyle = gird.style;
  const { drps } = direction;
  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    onOpen: onCopyOpen,
    isOpen: isCopyOpen,
    onClose: onCopyClose,
  } = useDisclosure();
  const { realizes, difficults, challenges, coordinationPoint } =
    hightlightStatus;

  const statusList = [realizes, coordinationPoint, difficults, challenges];

  const [highlights, setHighlights] = useState();
  const [selectedHighlight, setSelectedHighlight] = useState();
  const [highlightStatus, setHighlightStatus] = useState();
  const [currentWeekList, setCurrentWeekList] = useState();
  const [error, setError] = useState();

  const lastWeek = getLastWeek().week + '-' + getLastWeek().year;
  const [selectedWeek, setSelectedWeek] = useState(lastWeek);

  const getHightlight = () => {
    getHightlightData(
      selectedWeek?.split('-')[0],
      selectedWeek?.split('-')[1],
      drps.id,
      setHighlights,
      setError
    );
  };

  useEffect(() => {
    getHightlight();
  }, [selectedWeek]);

  const openHightlightModal = () => {
    getHightlightStatus(null, setHighlightStatus, setError);
    setCurrentWeekList([getCurrentWeek(), getLastWeek()]);
    onOpen();
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
    if (value === 'copy-hightlight') onCopyOpen();
  };

  return (
    <DashboardLayout activeMenu={'account-drps'}>
      <HighlightModal
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        weekListOption={currentWeekList}
        highlightStatus={highlightStatus}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        getHightlight={getHightlight}
        selectedHighlight={selectedHighlight}
        direction={drps}
      />
      <CopyHighlightModal
        onOpen={onCopyOpen}
        onClose={onCopyClose}
        isOpen={isCopyOpen}
        weekListOption={currentWeekList}
        setSelectedWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
        direction={drps}
        getHightlight={getHightlight}
      />
      <Flex mt={3} px={2} w={'100%'} mb={3}>
        <Box>
          <PageTitle
            titleSize={17}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={14}
            icon={drps.icon}
            title={drps.label}
            subtitle={' / ' + drps.description}
          />
        </Box>
        <Spacer />
        <Box mr={2}>
          <DMenuButton
            onChange={onDMenuChange}
            name={'Nouvelle taches'}
            rightIcon={<BsPlusLg />}
            menus={[
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
        </Box>
        <ListSemaineItem
          onWeekSelect={setSelectedWeek}
          selectedWeek={selectedWeek}
        />
      </Flex>

      <Stack p={2} w={'100%'}>
        <Grid
          templateColumns={`repeat(${statusList.length}, 1fr)`}
          gap={1}
          h={`calc(100vh - 130px)`}
          overflowX="auto"
          css={scroll_x_customize}
        >
          {statusList.map((status, i) => (
            <GridItem
              key={i}
              bg={gstyle.bg}
              p={gstyle.p}
              borderRadius={gstyle.radius}
              w={gstyle.w}
              overflowY="auto"
              css={scroll_customize}
            >
              <Box>
                <HStack>
                  <BiSolidSquareRounded
                    fontSize={18}
                    color={status.style.iconColor}
                  />
                  <TagTitle title={status.label} size={16} />
                </HStack>
              </Box>
              <Divider mb={3} mt={3} />
              <Stack mt={2}>
                {highlights
                  ?.filter((highl) => highl.status.name == status.name)
                  .map((highligh, i) => (
                    <HightlightContent
                      key={i}
                      title={highligh.direction.name + ' • ' + highligh.title}
                      body={highligh.textHighlight}
                      blc={
                        highlightStatusStyle(highligh.status.name)?.style
                          .iconColor
                      }
                      date={moment(highligh.createdAt).format('DD-MM-YYYY')}
                      bgColor={
                        highlightStatusStyle(highligh.status.name)?.style
                          .bgColor
                      }
                      radius="3px"
                      blw="2px"
                      openHightlight={() => openHightlight(highligh)}
                      p={1}
                    />
                  ))}

                {highlights?.filter((highl) => highl.status.name == status.name)
                  ?.length === 0 && (
                  <Stack alignItems="center" mt={10}>
                    <MdSearchOff color="#cccccc" size={85} />
                    <Text color="#b2b2b2"> Pas de mise à jour</Text>
                  </Stack>
                )}
              </Stack>
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </DashboardLayout>
  );
}
