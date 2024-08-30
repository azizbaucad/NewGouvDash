import { Heading, HStack, VStack } from '@chakra-ui/react';
import { colors } from '@theme';
import router from 'next/router';

export const DashboardLink = ({
  active,
  icon,
  message,
  redirectOn,
  isDisabled,
  cursor, // Prop pour le curseur
  colorMenu, // Nouvelle prop pour la couleur du menu
}) => {
  const behaviorProps = active
    ? {
        color: colorMenu || colors.primary.black, // Utilisation de colorMenu
        _hover: { cursor: cursor || 'default' }, // Utilisation de la prop cursor
        border: '1px solid #e6e9ef', // Bordure grise claire
        backgroundColor: '#e6e9ef', // Couleur de fond pour les éléments actifs
        padding: '8px 10px', // Espacement intérieur
      }
    : {
        _hover: {
          cursor: cursor || 'pointer', // Utilisation de la prop cursor
          color: colorMenu || colors.primary.blackQuick, // Utilisation de colorMenu
        },
        color: colorMenu || colors.primary.blackQuick, // Couleur principale noire rapide
        padding: '8px 10px', // Espacement intérieur
      };

  return (
    <HStack
      {...behaviorProps}
      alignItems={'start'}
      borderRadius={10}
      marginRight={0}
      w={'100%'}
      marginBottom={1}
      fontWeight={400}
      {...(isDisabled
        ? {
            _hover: { cursor: 'not-allowed' },
            color: colors.primary.white,
          }
        : {
            onClick: () => router.push(redirectOn),
          })}
    >
      {icon}
      <Heading alignItems={'start'} fontFamily="'Roboto Mono', sans-serif" fontSize={14} fontWeight={500} pl={0} pr={0}>
        {message}
      </Heading>
    </HStack>
  );
};



