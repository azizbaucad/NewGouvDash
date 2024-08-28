import {
  VStack,
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';

export const kpiCard = ({ title, value, change, unit }) => {
  return (
    <Box p={4} boxShadow="md" borderRadius="md" backgroundColor="white">
      <VStack spacing={4}>
        <Text fontWeight="bold">{title}</Text>
        <Stat>
          <StatLabel>Value</StatLabel>
          <StatNumber>{value}</StatNumber>
          <StatHelpText>
            <StatArrow type={change >= 0 ? 'increase' : 'decrease'} />
            {change}% {unit}
          </StatHelpText>
        </Stat>
      </VStack>
    </Box>
  );
};
