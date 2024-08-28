import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { MdWarning } from 'react-icons/md';
import { TbDatabaseX } from 'react-icons/tb';

export const DataUnavailable = ({
  message,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  SizeIcon,
  paddingY,
}) => {
  return (
    <Box
      mt={marginTop}
      mb={marginBottom}
      ml={marginLeft}
      mr={marginRight}
      textAlign="center"
      py={paddingY}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <TbDatabaseX
        size={SizeIcon}
        color="red.300"
        style={{ marginBottom: '1rem', color: '#2D3748' }}
      />
      <Text fontSize="xs" color="gray.900">
        {message}
      </Text>
    </Box>
  );
};
