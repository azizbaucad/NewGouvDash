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
      /* icon: <AiFillHome fontSize={20} color='#9999ff' mt={2} />, */
      active: 'null',
      url: null,
      subMenus: [
        { name: 'SGPR', active: 'home', url: routes.pages.dashboard.initial },
        { name: 'Cabinet', active: 'dv', url: routes.pages.dv.initial },
        { name: 'Autres', active: 'desc', url: routes.pages.desc.initial },
      ],
    },
    {
      name: 'Primature',
      active: 'null',
      url: routes.pages.dmgp.initial,
      subMenus: [
        { name: 'Gouvernance', active: 'ofms', url: routes.pages.ofms.initial },
        { name: 'Intérieur', active: 'dmgp', url: routes.pages.dmgp.initial },
      ],
    },
  ];

  return (
    <Box h={'100%'}>
      <VStack bg={colors.primary.gray} gap={'none'} alignItems={'center'} h={'100%'} w={'9.5vw'} position={'fixed'}>
        <VStack padding={2}>
          <Box h={59} w={59} pos={'relative'} mb={3} mt={1}>
            <Image {...images.logo} alt={'logo'} fill />
          </Box>
          <Divider borderColor={'#d7dce6'} mb={1} mt={1} size={'lg'} />
          <VStack spacing={0} width={'100%'} alignItems={'start'} h={'calc(100vh - 180px)'} overflowY="auto" css={scroll_customize_side}>
            {menus.map((menu, i) => (
              <Box key={i} w={'100%'}>
                <DashboardLink
                  redirectOn={menu.url}
                  active={activeLink?.activeOption == menu.active}
                  message={menu.name}
                  icon={menu.icon}
                  cursor='null'
                  colorMenu={colors.primary.black}
                />
                {menu.subMenus && (
                  <VStack pl={5} spacing={0}>
                    {menu.subMenus.map((subMenu, j) => (
                      <DashboardLink
                        key={j}
                        redirectOn={subMenu.url}
                        active={activeLink?.activeOption == subMenu.active}
                        message={subMenu.name}
                        icon={null}
                      />
                    ))}
                  </VStack>
                )}
              </Box>
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

