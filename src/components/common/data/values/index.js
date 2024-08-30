import {
  formaterNumber,
  abreviateNumber,
  abreviateNumberWithXof,
  abreviateNumberWithoutXof,
} from '@utils/formater';
import { HStack, Text, VStack, Tooltip } from '@chakra-ui/react';
import { RowTexts } from '@components/common/text';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { colors } from '@theme';

export const ValuesData = ({
  tagName,
  iconType,
  value,
  unit,
  delta,
  lastVal,
  lastVal2,
  lastVal3,
  tooltips_content,
  full_value,
}) => {
  const IconElement = iconType == 'down' ? BsArrowDown : BsArrowUp;

  const values = [
    {
      type: 'text',
      content: tagName,
      fontSize: 14,
      fontWeight: 600,
      color: '#48505f',
      fontStyle: 'normal',
      fontStretch: 'normal',
    },
    {
      type: 'list',
      list: [
        {
          type: 'text',
          content: value,
          fontSize: 20,
          fontStyle: 'normal',
          fontStretch: 'normal',
          color: '#000000',
          fontWeight: 'bold',
          displayToolstip: true,
          full_content: full_value,
        },
        {
          type: 'text',
          content: unit,
          fontSize: 12,
          fontWeight: 'bold',
          pl: 1,
          color: '#000000',
          as: 'b',
        },
      ],
      icon: (
        <IconElement
          width={0}
          as={'b'}
          pl={1}
          size={'.9rem'}
          color={
            iconType == 'down'
              ? colors.colorBadge.red.red_600
              : '#02bc7d'
          }
          style={{
            fontWeight: '600',
            fontSize: '24px',
            marginLeft: '5px',
          }}
        />
      ),
    },
    {
      type: 'list',
      list: delta && [
        {
          content: delta.label,
          fontSize: 12,
          fontFammily: "'Roboto Mono', sans-serif",
          fontWeight: '550',
          color: '#48505f',
          as: 'b',
        },
        {
          content: ' = ',
          fontSize: 10,
          
          color: 'gray',
        },
        {
          content: delta.value,
          fontSize: 13,
          fontWeight: '600',
          color: delta.valueColor,
        },
      ],
    },

    {
      type: 'list',
      list: [
        {
          content: lastVal?.value,
          fontSize: 13,
          fontWeight: '600',
          color: lastVal?.color,
          as: 'b',
        },
        {
          content: lastVal?.unit,
          fontSize: 13,
          fontWeight: '600',
          color: lastVal?.color,
          as: 'b',
        },
        {
          content: '',
          fontSize: 13,
          color: '#7A7876',
          as: 'b',
        },
        {
          content: lastVal?.label,
          fontSize: 12,
          color: '#48505f',
          //color: '#000',
          fontWeight: '600',
        },
      ],
    },
    {
      type: 'list',
      list2: [
        {
          content: lastVal2?.value,
          fontSize: 13,
          fontWeight: '600',
          color: lastVal2?.color,
          as: 'b',
        },
        {
          content: lastVal2?.unit,
          fontSize: 13,
          fontWeight: '600',
          color: lastVal2?.color,
          as: 'b',
        },
        {
          content: '',
          fontSize: 13,
          color: '#7A7876',
          as: 'b',
        },
        {
          content: lastVal2?.label,
          fontSize: 12,
          color: '#48505f',
          //color: '#000',
          fontWeight: '600',
        },
      ],
    },
    {
      type: 'list',
      list3: [
        {
          content: lastVal3?.value,
          fontSize: 13,
          fontWeight: '600',
          color: lastVal3?.color,
          as: 'b',
        },
        {
          content: lastVal3?.unit,
          fontSize: 13,
          fontWeight: '600',
          color: lastVal3?.color,
          as: 'b',
        },
        {
          content: '',
          fontSize: 13,
          color: '#7A7876',
          as: 'b',
        },
        {
          content: lastVal3?.label,
          fontSize: 12,
          color: '#48505f',
          //color: '#000',
          fontWeight: '600',
        },
      ],
    },
  ];

  return (
    <VStack alignItems={'start'} gridGap={0}>
      {/* Can you insert a tooltip here */}
      {/* <Tooltip label="Tooltip Inserted here">
        <Text>Put The Value here</Text>

      </Tooltip> */}

      {values.map((text, i) =>
        text.type === 'text' ? (
          <HStack textAlign={'left'} gridGap={0} alignItems={'end'} key={i}>
            {/* <Text>Test</Text> */}
            {/* Use Tooltip Here */}

            <Text
              pl={text.pl}
              fontSize={text.fontSize}
              color={text.color}
              as={text.as}
              mt={2}
            >
              {text.content}
            </Text>

            {text.icon}
          </HStack>
        ) : (
          <HStack gridGap={0} key={i}>
            <RowTexts texts={text.list} alignItems={'end'} />

            <RowTexts texts={text.list2} alignItems={'end'} />

            <RowTexts texts={text.list3} alignItems={'end'} />
            {text.icon}
          </HStack>
        )
      )}
    </VStack>
  );
};
