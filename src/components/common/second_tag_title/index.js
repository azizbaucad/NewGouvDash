import {
  VStack,
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Divider,
} from '@chakra-ui/react';

export const secondTagTitle = ({
  color,
  fWeight,
  fSize,
  title,
  tTransform,
  divBdColor,
}) => {
  return (
    <>
      <Text
        color={color}
        fontWeight={fWeight}
        fontSize={fSize}
        textTransform={tTransform}
      >
        {title}
      </Text>
      <Divider borderColor={divBdColor} />
    </>
  );
};
