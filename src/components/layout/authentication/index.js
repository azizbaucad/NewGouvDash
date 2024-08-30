import { Box, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { colors } from '@theme';
import { Media } from '@utils/media';
import { Fragment } from 'react';
import { DesktopLayoutView, MobileLayoutView } from './views';

export const AuthenticationLayout = ({ children, title }) => {
  return (
    <Fragment>
      <Media greaterThanOrEqual="lg">
        <DesktopLayoutView title={title}>{children}</DesktopLayoutView>
      </Media>
      <Media lessThan="lg">
        <MobileLayoutView title={title}>{children}</MobileLayoutView>
      </Media>
    </Fragment>
  );
};

export const AuthenticationLayoutForm = ({
  //redirection_route = '/',
  title,
  subtitle,
  //specifics,
  children,
}) => {
  return (
    <VStack
      alignItems={{ base: 'center', md: 'flex-start' }}
      justifyContent={{ base: 'center', md: 'initial' }}
    >
      <Stack pb={{ base: 1, md: 10 }} w={'100%'}>
        <Heading
          fontSize={{ base: 24, md: 34 }}
          textAlign={{ base: 'center', md: 'initial' }}
          fontFamily="'Roboto Mono', sans-serif"
        >
          {title}
        </Heading>

        <VStack
          alignItems={{ base: 'center', md: 'initial' }}
          justifyContent={{ base: 'center', md: 'initial' }}
          w={'100%'}
        >
          <Box w={{ base: '65%', md: '100%' }}>
            <Text
              color={colors.gray.regular}
              fontSize={{ base: 14, md: 20 }}
              noOfLines={2}
              mt={3}
              ml={1}
              textAlign={{ base: 'center', md: 'initial' }}
              fontFamily="'Roboto Mono', sans-serif"
            >
              {subtitle}
            </Text>
          </Box>
        </VStack>
      </Stack>

      {children}
    </VStack>
  );
};
