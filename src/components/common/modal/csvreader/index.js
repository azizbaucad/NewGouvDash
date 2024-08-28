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
} from '@chakra-ui/react';
import { IconedButton } from '@components/common/button';
import { PageTitle } from '@components/common/title/page';
import CSVReader from '@utils/services/csvreader';
import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

export function CSVReaderModal(props) {
  const [dataResults, setDataResults] = useState([]);
  const {
    onOpen,
    isOpen,
    onClose,
    //dataModel,
    //getHightlight,
    direction,
    //selectedCSVReader,
    week,
    obj,
    tag,
    saveData,
    addRef,
  } = props;

  const uploadData = (objModel, tag = false, addRef = false) => {
    if (dataResults.length > 0) {
      const obj_datas = dataResults.slice(1).map((data, index) => {
        var model = Object.fromEntries(
          Object.keys(objModel).map((key, i) => [key, data[i]])
        );
        model = {
          ...model,
          direction: { id: direction.id },
          week: week?.split('-')[0],
          year: week?.split('-')[1],
        };
        if (tag !== false) model['tag'] = tag;
        if (addRef === true) {
          model[
            'ref'
          ] = `${direction.id}${model.tag}${model.name}${model?.week}${model?.year}`;
        }
        return model;
      });
      saveData(obj_datas);
    }
  };

  const closeModal = () => {
    onClose();
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
          <Box>{tag} - Charger le fichier de données </Box>
        </ModalHeader>
        <ModalBody>
          <CSVReader setDataResults={setDataResults} />
        </ModalBody>
        <HStack w={'100%'} gap={3} py={5} justifyContent={'center'}>
          <Button
            onClick={onClose}
            bgColor="white"
            border="1px"
            borderColor="gray.200"
            w={'45%'}
          >
            Annuler
          </Button>
          <IconedButton
            w={'45%'}
            bgColor={'#4bc0c0'}
            color="white"
            message={'Enregistrer'}
            rightIcon={<FiArrowRight />}
            onClick={() => uploadData(obj, tag ?? false, addRef ?? false)}
          />
        </HStack>
      </ModalContent>
    </Modal>
  );
}
