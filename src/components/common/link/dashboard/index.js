import { Heading, VStack } from '@chakra-ui/react';
import { colors } from '@theme';
import router from 'next/router';

export const DashboardLink = ({
  active,
  icon,
  message,
  redirectOn,
  isDisabled,
}) => {
  const behaviorProps = active
    ? {
        color: colors.primary.white,
        _hover: { cursor: 'pointer' },
        //bgColor: { base: colors.primary.regular_green_orange, lg: colors.primary.gray},
        borderLeft: '2px',
        borderLeftColor: colors.primary.regular,
      }
    : {
        _hover: {
          cursor: 'pointer',
          color: colors.primary.white,
        },
        color: colors.primary.lightgray,
      };
  return (
    <VStack
      {...behaviorProps}
      alignItems={'center'}
      borderRadius={0}
      w={'100%'}
      marginBottom={5}
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
      <Heading fontSize={12} fontWeight={400} pl={0} pr={0}>
        {message}
      </Heading>
    </VStack>
  );
};
