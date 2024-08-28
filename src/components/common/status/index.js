import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { colors } from '@theme';

export const ErrorComponent = () => {
  return (
    <Alert status={'error'}>
      <AlertIcon />
      <AlertTitle>Oups!</AlertTitle>
      <AlertDescription>
        We have trouble loading this component. Please try again
      </AlertDescription>
    </Alert>
  );
};

export const WarningComponent = ({ message }) => {
  return (
    <Alert status={'warning'}>
      <AlertIcon />
      {message || 'This component might load incorrectly'}
    </Alert>
  );
};

export const LoadingComponent = () => {
  return (
    <Box mt={3}>
      <Spinner color={colors.primary.regular_green_orange} />
    </Box>
  );
};
