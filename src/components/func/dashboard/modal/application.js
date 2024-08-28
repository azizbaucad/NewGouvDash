import {
  Box,
  Button,
  Highlight,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { CenteredModal } from '@components/common/cards/modal';
import { colors, messages, routes } from '@theme';
import { appApproveOrRevokeHandler, appDeletionHandler } from '@utils/handlers';
import router from 'next/router';
import { useState } from 'react';

export const AppDeletionModal = ({
  app,
  application_name,
  developer,
  onClose,
  isOpen,
  revoke,
  approve,
}) => {
  let key = revoke ? 'revokeModal' : 'deletionModal';
  key = approve ? 'approveModal' : key;

  const modalProps = {
    heading: messages.components.layout[key].heading.replace(
      '{app}',
      application_name
    ),
    title: messages.components.layout[key].header.title.replace(
      '{app}',
      application_name
    ),
    subtitle: messages.components.layout[key].header.subtitle.replace(
      '{app}',
      application_name
    ),
  };

  const [unlockDelete, setUnlockDelete] = useState(false);

  const handleChange = (value) =>
    setUnlockDelete(value.currentTarget.value === application_name);

  const toast = useToast();

  const handleDelete = () => {
    if (!revoke && !approve) {
      appDeletionHandler({ application: app.name, developer: developer }).then(
        () => {
          toast({
            title: `[Permanent action] ${application_name} deleted.`,
            status: 'error',
            isClosable: true,
          });

          router.push(routes.pages.dashboard.account.applications);
        }
      );
      return;
    }

    appApproveOrRevokeHandler({
      application: app.name,
      developer: developer,
      revoke: revoke,
    }).then(() => {
      const toaster_message = {
        title: revoke
          ? `[Temporary action] ${application_name} revoked.`
          : `[Approval action] ${application_name} enabled.`,
        status: revoke ? 'error' : 'info',
      };

      toast({
        title: toaster_message.title,
        status: toaster_message.status,
        isClosable: true,
      });

      setTimeout(() => {
        router.reload();
      }, 1500);
    });
  };

  return (
    <CenteredModal
      title={modalProps.heading}
      isOpen={isOpen}
      onClose={onClose}
      size={'lg'}
      footer={
        <Button
          onClick={handleDelete}
          isDisabled={!unlockDelete}
          colorScheme={approve ? 'facebook' : 'red'}
          borderColor={approve ? colors.blue.regular : colors.error}
          color={approve ? colors.blue.regular : colors.error}
          variant={'outline'}
          w={'100%'}
        >
          {messages.components.layout[key].confirmation.replace(
            '{app}',
            application_name
          )}
        </Button>
      }
    >
      <Stack direction={'column'}>
        <Text fontSize={15}>{modalProps.title}</Text>

        <Box pb={3}>
          <Text fontSize={15}>
            <Highlight
              query={application_name}
              styles={{ fontWeight: 'bold', fontStyle: 'italic' }}
            >
              {modalProps.subtitle}
            </Highlight>
          </Text>
        </Box>

        <Input
          onKeyUp={handleChange}
          borderColor={colors.gray.regular}
          w={'100%'}
        />
      </Stack>
    </CenteredModal>
  );
};
