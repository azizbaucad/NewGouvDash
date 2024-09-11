import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
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

export function ValidationModal(props) {
  const { onOpen, isOpen, onClose, direction, week } = props;

  const [comment, setComment] = useState('');
  const toast = useToast();

  const sendValidation = (data) => {
    createElement('v1/validation/save', data)
      .then((res) => {
        toast({
          title: `Validation soumise avec succès`,
          status: 'success',
          position: 'top',
          isClosable: true,
        });
        onClose();
      })
      .catch((err) => {
        console.log('Error:::', err);
      });
  };

  const onValidation = (status) => {
    sendValidation({
      status: status,
      week: week.split('-')[0],
      year: week.split('-')[1],
      comment: comment,
      direction: {
        id: direction.id,
      },
    });
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
          <Text>
            Validation de la semaine {week.split('-')[0]} {week.split('-')[1]}
          </Text>
        </ModalHeader>
        <ModalBody>
          <HStack w={'100%'}>
            <VStack w={'100%'}>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ajouter un commentaire"
                size="sm"
              />
            </VStack>
          </HStack>
        </ModalBody>
        <HStack w={'100%'} gap={3} py={5} justifyContent={'center'}>
          <Button
            bgColor="white"
            color="red"
            border="1px"
            borderColor="red"
            w={'45%'}
            onClick={() => onValidation('reject')}
          >
            Rejeter
          </Button>
          <IconedButton
            w={'45%'}
            bgColor={'#4bc0c0'}
            color="white"
            message={'Valider'}
            rightIcon={<FiArrowRight />}
            onClick={() => onValidation('validate')}
          />
        </HStack>
      </ModalContent>
    </Modal>
  );
}
