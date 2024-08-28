import { Box, HStack } from '@chakra-ui/react';
import { RowTexts } from '@components/common/text';
import { colors } from '@theme';

export const PageTitle = ({
  icon,
  title,
  subtitle,
  titleSize,
  titleColor,
  subtitleColor,
  subtitleSize,
}) => {
  const texts = [
    {
      content: title,
      fontSize: titleSize,
      pl: 1,
      color: titleColor,
      fontWeight: 'bold',
    },
    {
      content: subtitle,
      fontSize: subtitleSize,
      pl: 1,
      color: subtitleColor,
    },
  ];

  return (
    <HStack
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius={8}
      gap={0}
      w={'100%'}
    >
      {/* <Box bg={'#00BD9C'} p={3} borderRadius={5}> */}
      <Box bg={'#4bc0c0'} p={3} borderRadius={5}>
        {icon}
      </Box>
      <Box
        bg={colors.primary.white}
        p={1}
        pl={2}
        pr={2}
        borderRadius={5}
        borderStartRadius={0}
      >
        <RowTexts texts={texts} alignItems={'center'} />
      </Box>
    </HStack>
  );
};
