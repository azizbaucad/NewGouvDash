import { HStack, Heading, Text } from '@chakra-ui/react';

export const TagTitle = ({ title, subtitle, size }) => {
  return (
    <HStack>
      <Heading fontSize={size} as={'b'}>
        {title}
      </Heading>
      <Text fontSize={size} color="gray">
        {subtitle}
      </Text>
    </HStack>
  );
};
