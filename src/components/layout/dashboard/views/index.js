import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  Stack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Sidebar } from '@components/func/dashboard/sidebar';
import { colors, images } from '@theme';
import Image from 'next/image';
import { useRef } from 'react';
import { CgMenuLeft } from 'react-icons/cg';
import { scroll_customize } from '@components/common/styleprops';

export const DesktopDashboardLayoutView = ({ children, activeLink }) => {
  return (
    <Stack h={'100vh'} w={'100%'} bgColor={'#cdd4e0'}>
      <HStack alignItems={'flex-start'} h={'100vh'} w={'100%'} gap={'none'}>
        {/* User Sidebar */}
        <Sidebar activeLink={activeLink} />
        {/* End User Sidebar */}

        {/* Dashboard Content */}
        <Stack
          h={'100%'}
          overflowY="auto"
          css={scroll_customize}
          w={'100%'}
          alignItems="center"
          marginLeft={'6vw'}
        >
          <Box w={'96%'}>
            <VStack>{children}</VStack>
          </Box>
        </Stack>
      </HStack>
    </Stack>
  );
};

export const MobileDashboardLayoutView = ({ children, activeLink, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Stack
      alignItems={'flex-start'}
      justifyContent={'flex-start'}
      bgColor={'#cdd4e0'}
    >
      {/* User Sidebar */}
      <HStack alignItems={'center'} w={'100%'} p={19}>
        <Box ref={btnRef} onClick={onOpen}>
          <CgMenuLeft size={23} />
        </Box>
        <HStack marginLeft={5}>
          <Box h={50} w={50} pos={'relative'}>
            <Image {...images.logo} alt={'logo'} fill />
          </Box>

          <Heading size={'sm'}>{'Dashbord DG'}</Heading>
        </HStack>
      </HStack>
      {/* End User Sidebar */}

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'sm'}
      >
        <DrawerOverlay />
        <DrawerContent bgColor={colors.primary.gray} maxW={100}>
          <DrawerCloseButton />

          <DrawerBody>
            <Sidebar activeLink={activeLink} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box px={19}>
        <Heading size={'md'}>{title}</Heading>
        <VStack alignItems={'flex-start'}>{children}</VStack>
      </Box>
    </Stack>
  );
};
