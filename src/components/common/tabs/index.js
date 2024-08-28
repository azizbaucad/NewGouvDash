import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

export const TabsPanelItem = ({
  title1,
  tab1,
  w1,
  h1,
  title2,
  tab2,
  w2,
  h2,
  title3,
  tab3,
  w3,
  h3,
  title4,
  w4,
  tab4,
  h4,
  fSize,
}) => {
  return (
    <Tabs variant="soft-rounded" colorScheme="gray">
      <TabList>
        <Tab fontSize={fSize}>{title1}</Tab>
        <Tab fontSize={fSize}>{title2}</Tab>
        <Tab fontSize={fSize}>{title3}</Tab>
        <Tab fontSize={fSize}>{title4}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box w={w1} h={h1}>
            {tab1}
          </Box>
        </TabPanel>
        <TabPanel>
          <Box w={w2} h={h2}>
            {tab2}
          </Box>
        </TabPanel>
        <TabPanel>
          <Box w={w3} h={h3}>
            {tab3}
          </Box>
        </TabPanel>
        <TabPanel>
          <Box w={w4} h={h4}>
            {tab4}
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const TabsPanelItemVertical = ({
  title1,
  tab1,
  title2,
  tab2,
  title3,
  tab3,
  title4,
  tab4,
  title5,
  tab5,
  title6,
  tab6,
  title7,
  tab7,
  title8,
  tab8,
  title9,
  tab9,
  title10,
  tab10,
  title11,
  tab11,
}) => {
  return (
    <Flex>
      <Tabs
        orientation="vertical"
        variant="soft-rounded"
        colorScheme="gray"
        w={'100vh'}
      >
        <TabList alignItems={'left'}>
          <Tab fontSize="12px">{title1}</Tab>
          <Tab fontSize="12px">{title2}</Tab>
          <Tab fontSize="12px">{title3}</Tab>
          <Tab fontSize="12px">{title4}</Tab>
          <Tab fontSize="12px">{title5}</Tab>
          <Tab fontSize="12px">{title6}</Tab>
          <Tab fontSize="12px">{title7}</Tab>
          <Tab fontSize="12px">{title8}</Tab>
          <Tab fontSize="12px">{title9}</Tab>
          <Tab fontSize="12px">{title10}</Tab>
          <Tab fontSize="12px">{title11}</Tab>
        </TabList>
        <TabPanels alignContent={'center'}>
          <TabPanel>
            <Box w="380px" h="380px">
              {tab1}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="380px" h="380px">
              {tab2}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="380px" h="380px">
              {tab3}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="380px" h="380px">
              {tab4}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="380px" h="380px">
              {tab5}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="380px" h="380px">
              {tab6}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="380px" h="380px">
              {tab7}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="380px" h="380px">
              {tab8}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="380px" h="380px">
              {tab9}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="380px" h="380px">
              {tab10}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="380px" h="380px">
              {tab11}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export const TabsPanelItemVerticalOptimized = ({
  tabs,
  w,
  h,
  fSize,
}) => {
  return (
    <Flex>
      <Tabs
        orientation="vertical"
        variant="soft-rounded"
        colorScheme="gray"
        w={w}
        h={h}
      >
        <TabList>
          {tabs.map((tab, index) => (
            <Tab key={index} fontSize={fSize}>
              {tab.title}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((tab, index) => (
            <TabPanel key={index}>
              <Box w={tab.w} h={tab.h}>
                {tab.content}
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};


export const ShowPanel = ({ title1, tab1, title2, tab2 }) => {
  const CustomTab = ({ title }) => (
    <Box ml={4} mt={3} mb={2}>
      <Tab
        fontSize="14px"
        _selected={{
          fontWeight: 700,
          color: '#2d7575',
          borderBottom: '2px solid #2d7575',
        }}
        _focus={{ boxShadow: 'none' }}
      >
        {title}
      </Tab>
    </Box>
  );

  return (
    <Tabs variant="unstyled">
      <TabList>
        <CustomTab title={title1} />
        <CustomTab title={title2} />
      </TabList>
      <TabPanels>
        <TabPanel>{tab1}</TabPanel>
        <TabPanel>{tab2}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

