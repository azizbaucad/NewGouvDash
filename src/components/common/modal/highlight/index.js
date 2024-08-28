import {
  Box,
  Divider,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { PageTitle } from '@components/common/title/page';
import { HighlightForm } from '@components/forms/highlight';
import {
  getCurrentWeek,
  getLastWeek,
  getLastWeekList,
} from '@utils/services/date';
import { deleteElement } from 'pages/api/global';
import { useState } from 'react';

export function HighlightModal(props) {
  const {
    onOpen,
    isOpen,
    onClose,
    highlightStatus,
    getHightlight,
    direction,
    selectedHighlight,
    setSelectedWeek,
    selectedWeek,
  } = props;

  const statusOption = highlightStatus?.map((status) => {
    return { value: status.id, name: status.label };
  });

  const [deleted, setDeleted] = useState(false);
  const toast = useToast();

  //const weekOption = weekListOption?.map(date => { return { value: date.week, name: date.week } });

  const weekOption = [
    ...getLastWeekList(4).map((date) => {
      return {
        value: date.week + '-' + date.year,
        name: date.week,
      };
    }),
  ];

  const closeModal = () => {
    setDeleted(false);
    onClose();
  };

  const deleteHighlight = () => {
    if (deleted) {
      deleteElement('v1/highlight', selectedHighlight.id)
        .then((res) => {
          toast({
            title: `Fait marquant supprimer avec succès`,
            status: 'success',
            position: 'top',
            isClosable: true,
          });
          getHightlight();
          closeModal();
        })
        .catch((err) => {
          console.log('Error ', err);
        });
    } else {
      setDeleted(true);
    }
  };

  return (
    <Modal onClose={onClose} size="xl" onOpen={onOpen} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>
          <Flex mb={3}>
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
          </Flex>
          <Divider mb={5} />
          <HStack>
            <Box>Ajouter un fait marquant</Box>
            <Spacer />
            {selectedHighlight && (
              <Text
                color="gray.500"
                fontSize="13px"
                as="ins"
                onClick={deleteHighlight}
                cursor="pointer"
              >
                {deleted ? 'Je suis sûr' : 'Supprimer'}
              </Text>
            )}
          </HStack>
        </ModalHeader>
        <ModalBody>
          <HighlightForm
            onClose={closeModal}
            statusOption={statusOption}
            weekOption={weekOption}
            getHightlight={getHightlight}
            setSelectedWeek={setSelectedWeek}
            selectedWeek={selectedWeek}
            directionId={direction.id}
            highlight={selectedHighlight ?? null}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
