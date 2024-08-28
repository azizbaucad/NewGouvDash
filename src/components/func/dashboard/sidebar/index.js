import { Box, Divider, VStack } from '@chakra-ui/react';
import { DashboardLink } from '@components/common/link/dashboard';
import { AvatarMenu } from '@components/func/user/Avatar';
import { colors, images, routes } from '@theme';
import Image from 'next/image';
import {
  AiFillAppstore,
  AiFillBank,
  AiFillHome,
  AiFillShop,
  AiOutlineComment,
  AiOutlineDesktop,
  AiOutlineFileZip,
} from 'react-icons/ai';
import { PiArrowsLeftRightBold } from 'react-icons/pi';
import { FaMoneyCheck, FaNetworkWired, FaSellsy, FaUser } from 'react-icons/fa';
import { BsPersonHeart } from 'react-icons/bs';
import { RiShakeHandsFill } from 'react-icons/ri';
import { scroll_customize_side } from '@components/common/styleprops';
import { MdOutlineScreenSearchDesktop } from 'react-icons/md';
import { CgRowFirst } from 'react-icons/cg';

export const Sidebar = ({ activeLink }) => {
  const menus = [
    {
      name: 'Présidence',
      icon: <AiFillHome fontSize={20} />,
      active: 'home',
      url: routes.pages.dashboard.initial,
    },
    {
      name: 'Primature',
      icon: <AiFillShop fontSize={20} />,
      active: 'dmgp',
      url: routes.pages.dmgp.initial,
    },
   /*  {
      name: 'OFMS',
      icon: <PiArrowsLeftRightBold fontSize={20} />,
      active: 'ofms',
      url: routes.pages.ofms.initial,
    },
    {
      name: 'DESC',
      icon: <BsPersonHeart fontSize={20} />,
      active: 'desc',
      url: routes.pages.desc.initial,
    },
    {
      name: 'DV',
      icon: <RiShakeHandsFill fontSize={20} />,
      url: routes.pages.dv.initial,
      active: 'dv',
    },
    {
      name: 'DDE',
      icon: <AiFillBank fontSize={20} />,
      active: 'ddedmc',
      url: routes.pages.ddedmc.initial,
    },
    {
      name: 'DIGITAL',
      icon: <AiFillAppstore fontSize={20} />,
      active: 'digital',
      url: routes.pages.digital.initial,
    },
    {
      name: 'DRJ',
      icon: <AiOutlineFileZip fontSize={20} />,
      active: 'drj',
      url: routes.pages.drj.initial,
    },
    {
      name: 'DSI',
      icon: <AiOutlineDesktop fontSize={20} />,
      active: 'dsi',
      url: routes.pages.dsi.initial,
    },
    {
      name: 'DRH',
      icon: <FaUser fontSize={20} />,
      active: 'drh',
      url: routes.pages.drh.initial,
    }, */
  
  ];

  return (
    <Box h={'100%'}>
      <VStack
        bg={colors.primary.gray}
        gap={'none'}
        justifyContent={'start'}
        h={'100%'}
        w={'5.95vw'}
        position={'fixed'}
      >
        <VStack padding={2}>
          <Box h={59} w={59} pos={'relative'} mb={1} mt={1}>
            <Image {...images.logo} alt={'logo'} fill />
          </Box>
          <Divider mb={1} size={'lg'} />

          <VStack
            spacing={'none'}
            width={'5.85vw'}
            alignItems={'center'}
            h={`calc(100vh - 180px)`}
            overflowY="auto"
            css={scroll_customize_side}
          >
            {menus.map((menu, i) => (
              <DashboardLink
                key={i}
                redirectOn={menu.url}
                active={activeLink?.activeOption == menu.active}
                icon={menu.icon}
                message={menu.name}
              />
            ))}
          </VStack>
        </VStack>
        <VStack p={2} marginBottom={4}>
          <AvatarMenu />
        </VStack>
      </VStack>
    </Box>
  );
};
