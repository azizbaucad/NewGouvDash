import {
  Box,
  Flex,
  Grid,
  Stack,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Thead,
  GridItem,
  HStack,
  Heading,
  Divider,
  Text,
  Spacer,
} from '@chakra-ui/react';
import { ListSemaineItem } from '@components/common/dropdown_item';
import { TabsPanelItem } from '@components/common/tabs';
import { PageTitle } from '@components/common/title/page';
import { DashboardLayout } from '@components/layout/dashboard';
import { direction, gird } from '@theme';
import { getLastWeek } from '@utils/services/date';
import { useRouter } from 'next/router';
import { getElement } from 'pages/api/global';
import { useEffect, useState } from 'react';
import { BsArrowDown } from 'react-icons/bs';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdOutlineArrowBack } from 'react-icons/md';

export default function OfmsPage(props) {
  const gstyle = gird.style;
  const { ofms } = direction;
  //Get The Selected Week
  const lastWeek = getLastWeek().week + '-' + getLastWeek().year;
  const [selectedWeek, setSelectedWeek] = useState(lastWeek);
  const [values, setValues] = useState();
  const [itemsPerPageLenght, setItemsPerPageLength] = useState(0);
  const [dataValues, setDataValues] = useState();

  //Get Values Data
  const getValuesData = () => {
    const params =
      'week=' +
      selectedWeek?.split('-')[0] +
      '&year=' +
      selectedWeek?.split('-')[1];
    getElement('v1/direction-data/data-volume-table?' + params)
      .then((res) => {
        setValues(res.data);
      })
      .catch((error) => {});
  };

  const getValuesDataValues = () => {
    const params =
      'week=' +
      selectedWeek?.split('-')[0] +
      '&year=' +
      selectedWeek?.split('-')[1];
    getElement('v1/direction-data/data-valeur-table?' + params)
      .then((res) => {
        setDataValues(res.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getValuesData();
    getValuesDataValues();
  }, [selectedWeek]);

  //Call The json object here
  const jsonData = [
    {
      name: 'cash_in',
      s: 0.0,
      s_1: 0.0,
      s_2: 0.0,
      s_3: 0.0,
      s_4: 0.0,
      // Autres propriétés...
    },
    // Autres objets JSON...
  ];

  const itemsPerPage_ = 18;
  DataIsTable({ data: values, itemsPerPage_ });

  const router = useRouter();

  const handleBackClick = () => {
    router.push('/ofms');
  };

  return (
    <>
      <DashboardLayout activeMenu={'account-ofms'}>
        <Flex mt={3} px={2} w={'100%'} mb={3}>
          <Box>
            <PageTitle
              titleSize={17}
              titleColor={'black'}
              subtitleColor={'#404245'}
              subtitleSize={14}
              icon={ofms.icon}
              title={ofms.label}
              subtitle={' / ' + ofms.description}
            />
            {/*  </PageTitle> */}
          </Box>
          <Spacer />
          <Box mr={2}></Box>
          <ListSemaineItem
            onWeekSelect={setSelectedWeek}
            selectedWeek={selectedWeek}
          />
        </Flex>

        <Stack w={'100%'} p={3}>
          <Grid
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={2}
            /* h={gstyle.h * 6 + 'px'} */
            h={'925px'}
          >
            <GridItem
              h={'100%'}
              bg={gstyle.bg}
              p={gstyle.p}
              borderRadius={gstyle.radius}
              rowSpan={2}
              colSpan={4}
            >
              <Stack mb={4}>
                <HStack
                  alignItems={'left'}
                  justifyContent={'space-left'}
                  p={'0'}
                >
                  <Stack
                    justify={'center'}
                    textColor={'teal.400'}
                    cursor="pointer"
                    onClick={handleBackClick}
                  >
                    <MdOutlineArrowBack size={25} />
                  </Stack>
                  <Text fontSize={16} fontWeight={'bold'} ml={3}>
                    Volume/Valeur des transactions
                  </Text>
                </HStack>
                <Divider />
              </Stack>
              {/* <TwoDimensionalTableOld data={tableData} itemsPerPage={10} /> */}
              <Box>
                <TabsPanelItem
                  title1={'Volume'}
                  tab1={
                    <Box maxHeight="900px" overflowY="auto">
                      <TwoDimensionalTable
                        data={values}
                        itemsPerPage={itemsPerPage_}
                        titleTable={'Volume des transactions'}
                      />
                    </Box>
                  }
                  title2={'Valeur'}
                  tab2={
                    <Box maxHeight="900px" overflowY="auto">
                      <TwoDimensionalTable
                        data={dataValues}
                        itemsPerPage={itemsPerPage_}
                        titleTable={'Valeur des transactions'}
                      />
                    </Box>
                  }
                />
              </Box>
              {/* <Box maxHeight="900px" overflowY="auto">
                <TwoDimensionalTable data={values} itemsPerPage={itemsPerPage_} />
              </Box> */}
            </GridItem>
          </Grid>
        </Stack>
      </DashboardLayout>
    </>
  );
}

export function TwoDimensionalTable({ data, itemsPerPage, titleTable }) {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (!Array.isArray(data)) {
    //console.log('Les données ne sont pas un tableau en réalité');
    return null;
  }
  const sliceData = data.slice(0, itemsPerPage);
  //console.log('Les données sont un tableau en');
  //console.log(sliceData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem); // Utilisation de data directement

  let columnAttributes = [];
  if (currentItems.length > 0 && currentItems[0]) {
    columnAttributes = Object.keys(currentItems[0]).filter(
      (attr) => attr !== 'week' && attr !== 'year' && attr !== 'name'
    ); // Les noms de propriétés sauf 'week' et 'year'
  }

  const rowAttributes = currentItems.map((item) => item.name); // Utilisation de la propriété 'name' pour les lignes

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Table
        size="base"
        variant="simple"
        bg={'white'}
        w={'100%'}
        h={'100px'}
        borderRadius={'3px'}
        mb={'3px'}
        alignItems={'center'}
      >
        <Thead>
          <Tr>
            <Th
              bgColor={'gray.200'}
              fontWeight={'bold'}
              textTransform={'capitalize'}
              fontSize={'12px'}
              color={'black'}
            >
              {titleTable} {/* Nom de la première colonne */}
            </Th>
            {columnAttributes.map((item, index) => (
              <Th
                key={index}
                bgColor={'gray.200'}
                fontWeight={'bold'}
                textTransform={'capitalize'}
                fontStyle={'normal'}
                fontSize={'12px'}
              >
                {item}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rowAttributes.map((attribute, rowIndex) => (
            <Tr
              key={rowIndex}
              onMouseEnter={() => setHoveredRow(rowIndex)}
              onMouseLeave={() => setHoveredRow(null)}
              bgColor={hoveredRow === rowIndex ? 'teal.50' : ''}
            >
              <Td
                fontWeight={'bold'}
                textTransform={'capitalize'}
                fontSize={'12px'}
              >
                {attribute}
              </Td>
              {columnAttributes.map((colAttr, colIndex) => (
                <Td
                  key={colIndex}
                  onMouseEnter={() =>
                    setHoveredCell({ rowIndex, cellIndex: colIndex })
                  }
                  onMouseLeave={() => setHoveredCell(null)}
                  bgColor={
                    hoveredCell?.rowIndex === rowIndex &&
                    hoveredCell?.cellIndex === colIndex
                      ? 'teal.200'
                      : ''
                  }
                  fontSize={'12px'}
                >
                  {currentItems[rowIndex][colAttr]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack mt={'6px'} justifyContent={'end'} alignItems={'center'}>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={data.length} // Utilisation de la longueur des données pour la pagination
          paginate={paginate}
          currentPage={currentPage}
        />
      </HStack>
    </>
  );
}

export function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul
        style={{
          display: 'flex',
          justifyContent: 'center',
          listStyle: 'none',
          marginTop: '20px',
        }}
      >
        {pageNumbers.map((number) => (
          <li key={number} style={{ marginRight: '10px' }}>
            <button
              onClick={() => paginate(number)}
              style={{
                cursor: 'pointer',
                backgroundColor: currentPage === number ? '#4FD1C5' : '#EDF2F7',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '3px',
              }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

//function de verification si data est un tableau
function DataIsTable({ data, itemsPerPage }) {
  if (!Array.isArray(data)) {
    //console.log('Les données ne sont pas un tableau');
    return null;
  }
  const sliceData = data.slice(0, itemsPerPage);
  // console.log('Les données sont un tableau');
  // console.log(sliceData);
}
