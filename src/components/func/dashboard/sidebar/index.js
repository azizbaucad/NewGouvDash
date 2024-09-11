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
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi2";
import { FcLineChart } from "react-icons/fc";

export const Sidebar = ({ activeLink }) => {
  const menus = [
    {
      name: 'Dashboard',
      icon: <FcLineChart fontSize={20} color="#1e293b" mt={1} />,
      active: 'null',
      url: null,
      subMenus: [
        { name: 'Accueil', active: 'dashboard', url: routes.pages.dashboard.initial },
        { name: 'Presidence', active: 'ofms', url: routes.pages.ofms.initial },
        { name: 'Primature', active: 'dmgp', url: routes.pages.dmgp.initial },
      ],
    },
    {
      name: 'Présidence',
      icon: <HiOutlineHome fontSize={20} color="#1e293b" mt={1} />,
      active: 'null',
      url: null,
      subMenus: [
        { name: 'Programme', active: 'programme', url: routes.pages.programme.initial },
        { name: 'Plan', active: 'plan', url: routes.pages.plan.initial },
        { name: 'Directive', active: 'directive', url: routes.pages.directive.initial },
        { name: 'Projet', active: 'projet', url: routes.pages.projet.initial },
        { name: 'Action', active: 'action', url: routes.pages.action.initial },
      ],
    },
    {
      name: 'BO du Dashboard',
      icon: <MdOutlineAdminPanelSettings fontSize={20} color="#1e293b" mt={1} />,
      active: 'null',
      url: routes.pages.dmgp.initial,
      subMenus: [
        { name: 'Comptes', active: 'compte', url: routes.pages.compte.initial },
/*         { name: 'Institution', active: 'institution', url: routes.pages.institution.initial },
        { name: 'Structure', active: 'structure', url: routes.pages.structure.initial }, */
       /*  { name: 'Activité', active: 'activite', url: routes.pages.activite.initial }, */
        { name: 'Equipe', active: 'equipe', url: routes.pages.equipe.initial },
      ],
    },
  ];

  return (
    <Box h={'100%'}>
      <VStack
        bg={colors.primary.gray}
        gap={'none'}
        alignItems={'center'}
        h={'100%'}
        w={'9.5vw'}
        position={'fixed'}
      >
        <VStack>
          <Box h={59} w={59} pos={'relative'} mb={3} mt={1}>
            <Image {...images.logo} alt={'logo'} fill />
          </Box>
          {/* <Divider borderColor={'#d7dce6'} mb={1} mt={1} size={'lg'} /> */}
          <VStack
            spacing={0}
            width={'100%'}
            alignItems={'start'}
            h={'calc(100vh - 160px)'}
            overflowY="auto"
            css={scroll_customize_side}
          >
            {menus.map((menu, i) => (
              <>
                <Box key={i} w={'100%'}>
                  <DashboardLink
                    redirectOn={menu.url}
                    active={activeLink?.activeOption == menu.active}
                    message={menu.name}
                    icon={menu.icon}
                    cursor="null"
                    colorMenu={colors.primary.black}
                  />
                  {menu.subMenus && (
                    <VStack ml={5} spacing={0}>
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
                {(i === 1) && (
                  <Divider borderColor={'gray.400'} mt={7} mb={7 } w={'100%'} />
                )}
              </>
            ))}
          </VStack>
        </VStack>
        <VStack marginBottom={4}>
          <AvatarMenu />
        </VStack>
      </VStack>
    </Box>
  );
};
