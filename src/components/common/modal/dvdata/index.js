import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { forms, routes } from '@theme';
import { PageTitle } from '@components/common/title/page';
import { useState } from 'react';
import { IconedButton } from '@components/common/button';
import { FiArrowRight } from 'react-icons/fi';
import { FaXbox } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { createElement } from 'pages/api/global';

export function DvDataModal(props) {
  const { onOpen, isOpen, onClose, direction, getValuesData, week } = props;

  const [om, setOm] = useState(0);
  const [fibre, setFibre] = useState(0);
  const toast = useToast();

  const sendDvData = (datas) => {
    createElement('v1/direction-data/save-direction-data-all', datas)
      .then((res) => {
        toast({
          title: `Enregistrement réussi avec succès`,
          status: 'success',
          position: 'top',
          isClosable: true,
        });
        //getWeekData
        getValuesData();
        onClose();
      })
      .catch((err) => {
        console.log('Error::: ', err);
        toast({
          title: `Une erreur est survenu lors de l'enregistrement`,
          status: 'error',
          position: 'top',
          isClosable: true,
        });
      });
  };

  const onDvData = () => {
    const data = {
      week: week.split('-')[0],
      year: week.split('-')[1],
      direction: {
        id: direction.id,
      },
    };
    sendDvData([
      {
        ...data,
        tag: 'gross_add_fiber',
        name: 'gross_add_fiber_week',
        value: fibre,
        ref: `${direction.id}gross_add_fibergross_add_fiber_week${data?.week}${data?.year}`,
      },
    ]);
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
                subtitleColor={'gray'}
                subtitleSize={15}
                icon={direction.icon}
                title={direction.label}
                subtitle={' / ' + direction.description}
              />
            </Stack>
            <IoMdClose onClick={onClose} as="b" />
          </Flex>
          <Divider mb={5} />
          <Text>
            Gross Add de la semaine {week.split('-')[0]} {week.split('-')[1]}
          </Text>
        </ModalHeader>
        <ModalBody>
          <VStack w={'100%'}>
            <Box w={'100%'} mb={2}>
              <Text>Gross Add Fibre </Text>
              <Input
                type="number"
                value={fibre}
                onChange={(e) => setFibre(e.target.value)}
              />
            </Box>
            {/*<Box w={'100%'} mb={2}>
                            <Text>Gross Add OM  </Text>
                            <Input
                                type="number"
                                value={om}
                                onChange={e => setOm(e.target.value)}
                            />
    </Box>*/}
          </VStack>
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
            onClick={() => onDvData()}
          />
        </HStack>
      </ModalContent>
    </Modal>
  );
}
