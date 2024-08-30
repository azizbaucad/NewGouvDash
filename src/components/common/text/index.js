import { Box, Text, Tooltip } from '@chakra-ui/react';

export const RowTexts = ({ texts, color, params_value }) => {
  const displayText = (text, i) => (
    <Text
      cursor={text.cursor}
      key={i}
      pl={text.pl}
      fontSize={text.fontSize}
      color={text.color ?? color}
      textDecoration={text.textDecoration}
      as="span"
      fontWeight={text.fontWeight}
      fontFamily="'Roboto Mono', sans-serif"
    >
      {text.content}
    </Text>
  );
  return (
    <Box>
      {texts?.map((text, i) =>
        text.displayToolstip ? (
          <Tooltip
            bg="#454d57"
            label={text.full_content}
            hasArrow
            arrowSize={10}
            placement="auto"
            key={i}
          >
            {displayText(text, i)}
          </Tooltip>
        ) : (
          displayText(text, i)
        )
      )}
    </Box>
  );
};

export const truncate = (input, n) =>
  input?.length > n ? `${input.substring(0, n - 2)}...` : input;
