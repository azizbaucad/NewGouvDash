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
      fontFamily:"'Roboto Mono', sans-serif",
    },
    {
      content: subtitle,
      fontSize: subtitleSize,
      pl: 1,
      color: subtitleColor,
      fontFamily:"'Roboto Mono', sans-serif",
    },
  ];

  return (
    <HStack
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius={3}
      gap={0}
      w={'100%'}
    >
      {/* <Box bg={'#00BD9C'} p={3} borderRadius={5}> */}
      {/* <Box bg={'#9999ff'} p={3}> */}
        {icon}
      {/* </Box> */}
      {/* <Box
        bg={'#f1f5f9'}
        p={2}
        
        borderRadius={5}
        borderStartRadius={0}
      > */}
      <Box p={2}> <RowTexts texts={texts} alignItems={'center'} /></Box>
       
      {/* </Box> */}
    </HStack>
  );
};
