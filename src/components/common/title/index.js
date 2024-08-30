import { HStack, Heading, Text } from '@chakra-ui/react';
import { fonts } from '@theme';

export const TagTitle = ({ title, subtitle, size }) => {
  return (
    <HStack>
      <Text color={'#000'} fontSize={size} fontWeight={'550'} >
        {title}
      </Text>
      <Text fontSize={size} color="gray">
        {subtitle}
      </Text>
    </HStack>
  );
};
