import {
  Box,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  VStack,
  Select,
  HStack,
  Text,
  Button,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { IconedButton } from '@components/common/button';
import { PageTitle } from '@components/common/title/page';
import { getLastWeekList } from '@utils/services/date';
import { getHightlightData } from '@utils/services/hightlight/data';
import { createElement } from 'pages/api/global';
import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

export function CopyHighlightModal(props) {
  const {
    onOpen,
    isOpen,
    onClose,
    highlightStatus,
    direction,
    selectedWeek,
    setSelectedWeek,
    getHightlight,
  } = props;

  const [weekCopy, setWeekCopy] = useState();
  const [weekPaste, setWeekPaste] = useState(selectedWeek);
  const [error, setError] = useState(selectedWeek);
  const toast = useToast();

  const statusOption = highlightStatus?.map((status) => {
    return { value: status.id, name: status.label };
  });
  //const weekOption = weekListOption?.map(date => { return { value: date.week, name: date.week } });

  const weekOption = [
    ...getLastWeekList(4).map((date) => {
      return {
        value: date.week + '-' + date.year,
        name: date.week,
      };
    }),
  ];

  const saveCopy = (datas) => {
    datas.map(async (data) => {
      const sendData = {
        ...data,
        id: null,
        week: weekPaste?.split('-')[0],
        year: weekPaste?.split('-')[1],
      };
      const save = await createElement('v1/highlight/save', sendData, 'null');
      console.log(' save ', save);
    });
    toast({
      title: `Semaine copier avec succès`,
      status: 'success',
      position: 'top',
      isClosable: true,
    });
    weekPaste != selectedWeek ? setSelectedWeek(weekPaste) : getHightlight();
    closeModal();
  };

  const copyAndSaveWeek = () => {
    getHightlightData(
      weekCopy?.split('-')[0],
      weekCopy?.split('-')[1],
      direction.id,
      saveCopy,
      setError
    );
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal onClose={onClose} size="xl" onOpen={onOpen} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>
          <Flex mb={3} justifyContent="space-between">
            <Stack justifyContent="left" alignContent="start">
              <PageTitle
                titleSize={17}
                titleColor={'black'}
                subtitleColor={'#404245'}
                subtitleSize={15}
                icon={direction.icon}
                title={direction.label}
                subtitle={' / ' + direction.description}
              />
            </Stack>
            <IoMdClose onClick={onClose} as="b" />
          </Flex>
          <Divider mb={5} />
          <Text fontSize={15}>
            Copier les faits marquants d&apos;une semaine
          </Text>
        </ModalHeader>
        <ModalBody>
          <HStack w={'100%'}>
            <Box mb={2} w={'50%'}>
              <Text>Source </Text>
              <Select
                value={weekCopy}
                onChange={(e) => setWeekCopy(e.target.value)}
              >
                {weekOption.map((option, i) => (
                  <option value={option.value} key={i}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Box mb={2} w={'50%'}>
              <Text>Destination </Text>
              <Select
                value={weekPaste}
                onChange={(e) => setWeekPaste(e.target.value)}
              >
                {weekOption.map((option, i) => (
                  <option value={option.value} key={i}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </Box>
          </HStack>
        </ModalBody>
        <HStack w={'100%'} gap={3} py={5} justifyContent={'center'}>
          <Button
            bgColor="white"
            color="red"
            border="1px"
            borderColor="red"
            w={'45%'}
            onClick={onClose}
          >
            Annuler
          </Button>
          <IconedButton
            w={'45%'}
            bgColor={'#4bc0c0'}
            color="white"
            message={'Enregistrer'}
            rightIcon={<FiArrowRight />}
            onClick={() => copyAndSaveWeek()}
          />
        </HStack>
      </ModalContent>
    </Modal>
  );
}
