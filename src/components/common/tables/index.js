import { Box, Table, Thead, Tbody, Tr, Th, Td, Tfoot, TableCaption } from "@chakra-ui/react";

export const DataTableGenTest = () => {
  return (
    <Box p={0} w={'100%'}>
      <Table variant='striped' colorScheme='gray' size="sm" w={'100%'}>
        {/* <TableCaption>How much food I ate this week</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Type</Th>
            <Th>Responsable</Th>
            <Th>title</Th>
            <Th>Etat</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Pizza</Td>
            <Td>Monday</Td>
            <Td>3.01</Td>
            <Td>Respect des délais prévus pour le début et la clôture des inscriptions</Td>
            <Td>En attente</Td>
            <Td color={'blue'}>Voir plus</Td>
          </Tr>
          <Tr>
            <Td>Tacos</Td>
            <Td>Tuesday</Td>
            <Td>13.01</Td>
            <Td>Directive Y</Td>
            <Td>En cours</Td>
            <Td color={'blue'}>Voir plus</Td>
          </Tr>
          <Tr>
            <Td>Tacos</Td>
            <Td>Tuesday</Td>
            <Td>13.01</Td>
            <Td>Directive Y</Td>
            <Td>En cours</Td>
            <Td color={'blue'}>Voir plus</Td>
          </Tr>
          <Tr>
            <Td>Tacos</Td>
            <Td>Tuesday</Td>
            <Td>13.01</Td>
            <Td>Directive Y</Td>
            <Td>En cours</Td>
            <Td color={'blue'}>Voir plus</Td>
          </Tr>
          <Tr>
            <Td>Tacos</Td>
            <Td>Tuesday</Td>
            <Td>13.01</Td>
            <Td>Directive Y</Td>
            <Td>En cours</Td>
            <Td color={'blue'}>Voir plus</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};
