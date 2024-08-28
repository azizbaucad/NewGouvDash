import { HStack, Text, Box, Heading, Circle } from '@chakra-ui/react';
import { BsFillStopFill } from 'react-icons/bs';
import { RowTexts, truncate } from '@components/common/text';
import { Fragment, useState } from 'react';

export const HightlightHeader = ({ status }) => {
  return (
    <HStack alignItems={'left'} justifyContent={'space-between'}>
      <Heading fontSize={16} ml={0}>
        Objectifs Mensuels
      </Heading>
      <HStack spacing={1}>
        {status.map((statusItem, i) => (
          <HightlightStatus
            key={i}
            textStatus={statusItem.name}
            icon={statusItem.icon}
            iconColor={statusItem.iconColor}
            fontSizeText={12}
          />
        ))}
      </HStack>
    </HStack>
  );
};

export const HightlightStatus = ({
  iconColor,
  fontStyleText,
  fontSizeText,
  fontWeightText,
  colorText,
  textStatus,
}) => {
  return (
    <Fragment>
      <BsFillStopFill color={iconColor} size={20} />
      <Text
        fontStyle={fontStyleText}
        fontSize={fontSizeText}
        fontWeight={fontWeightText}
        color={colorText}
      >
        {textStatus}
      </Text>
    </Fragment>
  );
};

export const HightlightContent = ({
  bgColor,
  iconBgColor,
  p,
  radius,
  blw,
  blc,
  icon,
  title,
  date,
  body,
  openHightlight,
}) => {
  const [displayContent, setDisplayContent] = useState(false);
  const texts = [
    {
      content: displayContent ? body : truncate(body, 120),
      fontSize: 12,
      as: 'span',
    },
    {
      content: ' • ' + date,
      fontSize: 10,
      fontWeight: 'bold',
    },
  ];

  return (
    <HStack
      borderRadius={radius ?? 'xl'}
      borderLeftWidth={blw}
      borderLeftColor={blc}
      p={p ?? 4}
      bgColor={bgColor}
      lineHeight="normal"
    >
      <Box>
        {icon && (
          <Circle
            size="30px"
            bg={iconBgColor}
            color="#fff"
            alignItems={'center'}
          >
            {icon}
          </Circle>
        )}
      </Box>
      <Box>
        <Text
          as="b"
          fontSize={12}
          cursor="pointer"
          p={0}
          onClick={openHightlight}
        >
          {' '}
          {title}{' '}
        </Text>
        <RowTexts texts={texts} display="row" p={0} />
        <HStack marginTop={1}>
          {body?.length > 120 && (
            <Text
              fontSize={9}
              color="blue"
              cursor="pointer"
              onClick={() => setDisplayContent(!displayContent)}
            >
              {' '}
              Voir {displayContent ? 'moins' : 'plus'}{' '}
            </Text>
          )}
        </HStack>
      </Box>
    </HStack>
  );
};
