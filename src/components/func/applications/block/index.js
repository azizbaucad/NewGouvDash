import {
  Button,
  Divider,
  FormControl,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BoxZone } from '@components/common/cards/boxZone';
import { FormSearch } from '@components/common/input/FormInput';
import {
  ApiProducts,
  AppEnvSwitcher,
  ApplicationCredential,
  ApplicationList,
} from '@components/func/dashboard/application';
import { useCredentials } from '@hooks';
import { colors, messages, routes } from '@theme';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

export const ApplicationsBlock = ({
  apps,
  _handleSearch,
  isOnProd,
  selectedEnv,
  switcher,
}) => {
  const router = useRouter();
  const {
    buttons: { application },
  } = messages.components;
  const {
    dashboard: {
      applications: { new: new_application_route },
    },
  } = routes.pages;
  return (
    <Fragment>
      <HStack alignItems={'center'} my={10} w={{ base: '100%', lg: '80%' }}>
        <FormSearch placeholder="Search your app…" keyUp={_handleSearch} />

        <FormControl>
          <Button
            bgColor={colors.primary.regular}
            colorScheme={'orange'}
            h={50}
            onClick={() => router.push(new_application_route)}
          >
            {application.new}
          </Button>
        </FormControl>
      </HStack>

      <AppEnvSwitcher
        {...{
          isOnProd,
          selectedEnv,
          switcher,
        }}
      />

      {!apps.all && (
        <ApplicationList applications={isOnProd ? apps.prod : apps.sandbox} />
      )}
      {apps.all && <ApplicationList applications={apps.all} />}
    </Fragment>
  );
};

export const AppInfosBlock = ({
  apiProduct,
  apiProducts,
  description,
  appAttributes,
}) => {
  return (
    <Fragment>
      <Heading size={'sm'}>{apiProduct.applicationApi}</Heading>

      <ApiProducts products={apiProducts} />

      <VStack alignItems={'flex-start'} py={10} w={'100%'}>
        <Heading size={'sm'}>{description}</Heading>
        <Text pt={3}>{appAttributes.description || '...'}</Text>
      </VStack>
    </Fragment>
  );
};

export const AppCredentialsBlock = ({
  creds,
  cred_id,
  cred_secret,
  consumerKey,
  consumerSecret,
}) => {
  const { visibility, copyCreds, visibilityToggler } = useCredentials();
  return (
    <VStack alignItems={'flex-start'} w={'100%'}>
      <Heading size={'sm'} pb={3}>
        {creds}
      </Heading>
      <BoxZone>
        <ApplicationCredential
          display={cred_id.display}
          name={cred_id.name}
          handleCredsCopy={copyCreds}
          toggleCreds={visibilityToggler}
          credential={consumerKey}
          visibility={visibility.client_id}
        />

        <Divider orientation={'horizontal'} />

        <ApplicationCredential
          display={cred_secret.display}
          name={cred_secret.name}
          handleCredsCopy={copyCreds}
          toggleCreds={visibilityToggler}
          credential={consumerSecret}
          visibility={visibility.client_secret}
        />
      </BoxZone>
    </VStack>
  );
};
