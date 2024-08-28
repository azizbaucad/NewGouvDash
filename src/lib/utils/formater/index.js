import { Box, Text } from '@chakra-ui/react';
import { BsArrowDown } from 'react-icons/bs';
import { format } from 'd3-format';

export const formatNumber = (num) => {
  if (num >= 1e9) {
    return format('.2s')(num).replace('G', 'Mds');
  } else if (num >= 1e6) {
    return format('.2s')(num).replace('M', 'M');
  } else if (num >= 1e3) {
    return format('.2s')(num).replace('k', 'K');
  } else {
    return num;
  }
};

export const number = (number, size, color, fweight, fweightpercent, bg) => {
  return (
    <>
      <Box
        px="1"
        py="0"
        bg={bg}
        borderRadius="full"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="span" fontSize={size} color={color} fontWeight={fweight}>
          {number}
        </Text>
        <Text
          as="span"
          ml={1}
          fontSize={size}
          color={color}
          fontWeight={fweightpercent}
        >
          %
        </Text>
      </Box>
    </>
  );
};

export const numberWithBadge = (
  number,
  size,
  size_unit,
  color,
  fweight,
  fweightpercent,
  bg
) => {
  // Check if the number is 0, null, or "NaN"
  if (number === 0 || number === null || isNaN(number)) {
    // Return '0.00' in these cases
    return (
      <>
        <Box
          px="1"
          py="0"
          bg={bg}
          borderRadius="full"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text as="span" fontSize={size} color={color} fontWeight={fweight}>
            0.00
          </Text>
          <Text
            as="span"
            ml={1}
            fontSize={size_unit}
            color={color}
            fontWeight={fweightpercent}
          >
            %
          </Text>
        </Box>
      </>
    );
  }

  // If number is not 0, null, or "NaN", format and return the original number
  const formattedNumber = number.toFixed(2);

  return (
    <>
      <Box
        px="1"
        py="0"
        bg={bg}
        borderRadius="full"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="span" fontSize={size} color={color} fontWeight={fweight}>
          {formattedNumber}
        </Text>
        <Text
          as="span"
          ml={1}
          fontSize={size_unit}
          color={color}
          fontWeight={fweightpercent}
        >
          %
        </Text>
      </Box>
    </>
  );
};

export const numberWithBadgeItalic = (
  number,
  size,
  size_unit,
  color,
  fweight,
  fweightpercent,
  bg
) => {
  return (
    <>
      <Box
        px="1"
        py="0"
        bg={bg}
        borderRadius="full"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="i" fontSize={size} color={color} fontWeight={fweight}>
          {number}
        </Text>
        <Text
          as="span"
          ml={1}
          fontSize={size_unit}
          color={color}
          fontWeight={fweightpercent}
        >
          %
        </Text>
      </Box>
    </>
  );
};

//export const numberWithBadgeMarge = (
export const numberWithBadgeMarge = (
  number,
  size,
  size_unit,
  color,
  fweight,
  fweightpercent,
  bg
) => {
  // Check if the number is 0, null, or "NaN"
  if (number === 0 || number === null || isNaN(number)) {
    // Return '0.00' in these cases
    return (
      <>
        <Box
          px="1"
          py="0"
          bg={bg}
          borderRadius="full"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text as="span" fontSize={size} color={color} fontWeight={fweight}>
            0.00
          </Text>
          <Text
            as="span"
            ml={1}
            fontSize={size_unit}
            color={color}
            fontWeight={fweightpercent}
          >
            PT
          </Text>
        </Box>
      </>
    );
  }

  // If number is not 0, null, or "NaN", return the original number
  return (
    <>
      <Box
        px="1"
        py="0"
        bg={bg}
        borderRadius="full"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="span" fontSize={size} color={color} fontWeight={fweight}>
          {number}
        </Text>
        <Text
          as="span"
          ml={1}
          fontSize={size_unit}
          color={color}
          fontWeight={fweightpercent}
        >
          PT
        </Text>
      </Box>
    </>
  );
};

export const formaterNumber = (number, size, color, fweight, fstyle) => {
  // Check if the number is 0, null, or "NaN"
  const numberNotDecimal = removeDecimal(number);
  if (
    numberNotDecimal === 0 ||
    numberNotDecimal === null ||
    isNaN(numberNotDecimal)
  ) {
    // Return '0.00' in these cases
    return (
      <Text
        as="span"
        fontSize={size}
        color={color}
        fontWeight={fweight}
        fontStyle={fstyle}
      >
        0.00
      </Text>
    );
  }

  // Format the number with grouping separator and maximumFractionDigits set to 15 to avoid abbreviation
  const formattedNumber = new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 15,
    useGrouping: true,
  }).format(numberNotDecimal);

  // Return the formatted number
  return (
    <Text
      as="span"
      fontSize={size}
      color={color}
      fontWeight={fweight}
      fontStyle={fstyle}
    >
      {formattedNumber}
    </Text>
  );
};

export const formaterNumberItalic = (number, size, color, fweight, fstyle) => {
  if (number === 0 || number === null || isNaN(number)) {
    // Return '0.00' in these cases
    return (
      <Text as="i" fontSize={size} color={color} fontWeight={fweight}>
        0.00
      </Text>
    );
  }

  return (
    <Text as="i" fontSize={size} color={color} fontWeight={fweight}>
      {new Intl.NumberFormat().format(number)}
    </Text>
  );
};

export const formaterNumberWithBadge = (number, size, color, fweight) => {
  if (number === 0 || number === null || isNaN(number)) {
    return '0.00';
  }
  return (
    <>
      <Box
        px="1"
        py="0"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="span" fontSize={size} color={color} fontWeight={fweight}>
          {new Intl.NumberFormat().format(number)}
        </Text>
      </Box>
    </>
  );
};

export const abreviateNumberWithXof = (
  number,
  size_chiffre,
  size_unit,
  color,
  fw,
  fw_unit
) => {
  const numberNotDecimal = removeDecimal(number);
  const lengthNumber = String(numberNotDecimal).length;
  if (
    numberNotDecimal === 0 ||
    numberNotDecimal === null ||
    isNaN(numberNotDecimal)
  ) {
    return '0.00';
  } else if (numberNotDecimal <= 100 && numberNotDecimal >= -100) {
    return (
      <>
        <Text as="span" color={color} fontSize={size_chiffre} fontWeight={fw}>
          {numberNotDecimal}
        </Text>{' '}
      </>
    );
  } else if (numberNotDecimal < 1000 && numberNotDecimal >= -1000) {
    return (
      String(numberNotDecimal).substring(0, 2) +
      '.' +
      String(numberNotDecimal).substring(2, 4)
    );
  } else if (
    (numberNotDecimal >= 1000 && numberNotDecimal < 1000000) ||
    (numberNotDecimal <= -1000 && numberNotDecimal > -1000000)
  ) {
    const chiffre =
      String(numberNotDecimal).substring(0, lengthNumber - 3) +
      '.' +
      String(numberNotDecimal).substring(lengthNumber - 3, lengthNumber - 1);
    return (
      <>
        <Text as="span" color={color} fontSize={size_chiffre} fontWeight={fw}>
          {chiffre}
        </Text>{' '}
        <Text
          as="span"
          color={color}
          fontSize={size_unit}
          fontWeight={fw_unit}
          textTransform={'capitalize'}
        >
          Kxof
        </Text>
      </>
    );
  } else if (
    (numberNotDecimal >= 1000000 && numberNotDecimal < 1000000000) ||
    (numberNotDecimal <= -1000000 && numberNotDecimal > -1000000000)
  ) {
    const chiffre =
      String(numberNotDecimal).substring(0, lengthNumber - 6) +
      '.' +
      String(numberNotDecimal).substring(lengthNumber - 6, lengthNumber - 4);
    return (
      <>
        <Text as="span" color={color} fontSize={size_chiffre} fontWeight={fw}>
          {chiffre}
        </Text>{' '}
        <Text
          as="span"
          color={color}
          fontSize={size_unit}
          fontWeight={fw_unit}
          textTransform={'capitalize'}
        >
          Mxof
        </Text>
      </>
    );
  } else {
    const chiffre =
      String(numberNotDecimal).substring(0, lengthNumber - 9) +
      '.' +
      String(numberNotDecimal).substring(lengthNumber - 9, lengthNumber - 7);
    return (
      <>
        <Text as="span" color={color} fontSize={size_chiffre} fontWeight={fw}>
          {chiffre}
        </Text>{' '}
        <Text
          as="span"
          color={color}
          fontSize={size_unit}
          fontWeight={fw_unit}
          textTransform={'capitalize'}
        >
          Gxof
        </Text>
      </>
    );
  }
};

//Abreviate With Xof Number with Badge
export const abreviateNumberWithXofWithBadge = (
  number,
  size_unit,
  color,
  fw_unit,
  bg
) => {
  const numberNotDecimal = removeDecimal(number);
  const lengthNumber = String(numberNotDecimal).length;

  if (numberNotDecimal <= 100 && numberNotDecimal >= -100) {
    const chiffre = numberNotDecimal;
    return (
      <>
        <Box
          px="1"
          py="0"
          bg={bg}
          borderRadius="full"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            as="span"
            color={color}
            fontSize={size_unit}
            fontWeight={fw_unit}
            textTransform={'capitalize'}
          >
            {chiffre}
          </Text>
        </Box>
      </>
    );
  } else if (
    numberNotDecimal === 0 ||
    numberNotDecimal === null ||
    isNaN(numberNotDecimal)
  ) {
    return '0.00';
  } else if (numberNotDecimal < 1000 && numberNotDecimal >= -1000) {
    return (
      String(numberNotDecimal).substring(0, 2) +
      '.' +
      String(numberNotDecimal).substring(2, 4)
    );
  } else if (
    (numberNotDecimal >= 1000 && numberNotDecimal < 1000000) ||
    (numberNotDecimal <= -1000 && numberNotDecimal > -1000000)
  ) {
    const chiffre =
      String(numberNotDecimal).substring(0, lengthNumber - 3) +
      '.' +
      String(numberNotDecimal).substring(lengthNumber - 3, lengthNumber - 1);
    return (
      <>
        <Box
          px="1"
          py="0"
          bg={bg}
          borderRadius="full"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            as="span"
            color={color}
            fontSize={size_unit}
            fontWeight={fw_unit}
            textTransform={'capitalize'}
          >
            {chiffre} Kxof
          </Text>
        </Box>
      </>
    );
  } else if (
    (numberNotDecimal >= 1000000 && numberNotDecimal < 1000000000) ||
    (numberNotDecimal <= -1000000 && numberNotDecimal > -1000000000)
  ) {
    const chiffre =
      String(numberNotDecimal).substring(0, lengthNumber - 6) +
      '.' +
      String(numberNotDecimal).substring(lengthNumber - 6, lengthNumber - 4);
    return (
      <>
        <Box
          px="1"
          py="0"
          bg={bg}
          borderRadius="full"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            as="span"
            color={color}
            fontSize={size_unit}
            fontWeight={fw_unit}
            textTransform={'capitalize'}
          >
            {chiffre} Mxof
          </Text>
        </Box>
      </>
    );
  } else {
    const chiffre =
      String(numberNotDecimal).substring(0, lengthNumber - 9) +
      '.' +
      String(numberNotDecimal).substring(lengthNumber - 9, lengthNumber - 7);
    return (
      <>
        <Box
          px="1"
          py="0"
          bg={bg}
          borderRadius="full"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            as="span"
            color={color}
            fontSize={size_unit}
            fontWeight={fw_unit}
            textTransform={'capitalize'}
          >
            {chiffre} Gxof
          </Text>
        </Box>
      </>
    );
  }
};

//Abreviate With Xof Number with Badge
export const abreviateNumberWithoutXofWithBadge = (
  number,
  size_unit,
  color,
  fw_unit,
  bg
) => {
  const lengthNumber = String(number).length;

  if (number === 0 || number === null || isNaN(number)) {
    return '0.00';
  } else if (number <= 100 && number >= -100) {
    return number;
  } else if (number < 1000 && number >= -1000) {
    return (
      String(number).substring(0, 2) + '.' + String(number).substring(2, 4)
    );
  } else if (
    (number >= 1000 && number < 1000000) ||
    (number <= -1000 && number > -1000000)
  ) {
    const chiffre =
      String(number).substring(0, lengthNumber - 3) +
      '.' +
      String(number).substring(lengthNumber - 3, lengthNumber - 1);
    return (
      <>
        <Box
          px="1"
          py="0"
          bg={bg}
          borderRadius="full"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            as="span"
            color={color}
            fontSize={size_unit}
            fontWeight={fw_unit}
            textTransform={'capitalize'}
          >
            {chiffre} K
          </Text>
        </Box>
      </>
    );
  } else if (
    (number >= 1000000 && number < 1000000000) ||
    (number <= -1000000 && number > -1000000000)
  ) {
    const chiffre =
      String(number).substring(0, lengthNumber - 6) +
      '.' +
      String(number).substring(lengthNumber - 6, lengthNumber - 4);
    return (
      <>
        <Box
          px="1"
          py="0"
          bg={bg}
          borderRadius="full"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            as="span"
            color={color}
            fontSize={size_unit}
            fontWeight={fw_unit}
            textTransform={'capitalize'}
          >
            {chiffre} M
          </Text>
        </Box>
      </>
    );
  } else {
    const chiffre =
      String(number).substring(0, lengthNumber - 9) +
      '.' +
      String(number).substring(lengthNumber - 9, lengthNumber - 7);
    return (
      <>
        <Box
          px="1"
          py="0"
          bg={bg}
          borderRadius="full"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            as="span"
            color={color}
            fontSize={size_unit}
            fontWeight={fw_unit}
            textTransform={'capitalize'}
          >
            {chiffre} G
          </Text>
        </Box>
      </>
    );
  }
};

export const abreviateNumberWithoutXof = (
  number,
  size_chiffre,
  size_unit,
  color,
  fw,
  fw_unit
) => {
  const lengthNumber = String(number).length;

  if (number === 0 || number === null || isNaN(number)) {
    return '0.00';
  } else if (number < 1000 && number >= -1000) {
    return (
      String(number).substring(0, 2) + '.' + String(number).substring(2, 4)
    );
  } else if (
    (number >= 1000 && number < 1000000) ||
    (number <= -1000 && number > -1000000)
  ) {
    const chiffre =
      String(number).substring(0, lengthNumber - 3) +
      '.' +
      String(number).substring(lengthNumber - 3, lengthNumber);
    return (
      <>
        <Text as="span" color={color} fontSize={size_chiffre} fontWeight={fw}>
          {chiffre}
        </Text>{' '}
        <Text
          as="span"
          color={color}
          fontSize={size_unit}
          fontWeight={fw_unit}
          textTransform={'capitalize'}
        >
          K
        </Text>
      </>
    );
  } else if (
    (number >= 1000000 && number < 1000000000) ||
    (number <= -1000000 && number > -1000000000)
  ) {
    const chiffre =
      String(number).substring(0, lengthNumber - 6) +
      '.' +
      String(number).substring(lengthNumber - 6, lengthNumber - 4);
    return (
      <>
        <Text as="span" color={color} fontSize={size_chiffre} fontWeight={fw}>
          {chiffre}
        </Text>{' '}
        <Text
          as="span"
          color={color}
          fontSize={size_unit}
          fontWeight={fw_unit}
          textTransform={'capitalize'}
        >
          M
        </Text>
      </>
    );
  } else {
    const chiffre =
      String(number).substring(0, lengthNumber - 9) +
      '.' +
      String(number).substring(lengthNumber - 9, lengthNumber - 7);
    return (
      <>
        <Text as="span" color={color} fontSize={size_chiffre} fontWeight={fw}>
          {chiffre}
        </Text>{' '}
        <Text
          as="span"
          color={color}
          fontSize={size_unit}
          fontWeight={fw_unit}
          textTransform={'capitalize'}
        >
          G
        </Text>
      </>
    );
  }
};

//Translate number month to name month
export const numberMonthToName = (numberMonth, numberYear) => {
  const NamesMonth = [
    'Janv',
    'Fév',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil',
    'Août',
    'Sept',
    'Oct',
    'Nov',
    'Déc',
  ];

  const nameMonth = NamesMonth[numberMonth - 1] || ''; // Soustrayez 1 car les tableaux sont indexés à partir de 0

  //const shortYear = numberYear.toString().slice(-2);

  return nameMonth + '-' + numberYear.toString().slice(-2);
};

//Translate number week to name month
export const weekNumber = (num, numberYear) => {
  return 'S' + num + '-' + numberYear.toString().slice(-2);
};

//Fonction qui permet de verifier et de supprimer la valuer decimal d'un nombre
export function removeDecimal(number) {
  if (Number.isInteger(number)) {
    return number;
  } else {
    return parseInt(number);
  }
}

//Fonction qui permet de verifier si la valeur est null undefined ou superieur à 0
export const valueGetZero = (value) => {
  const num = Number(value);
  return num > 0;
};
