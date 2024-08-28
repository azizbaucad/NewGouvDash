import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  Select,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { colors, forms } from '@theme';
import { ErrorMessage } from 'formik';
import { FiSearch } from 'react-icons/fi';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

export const FormInput = ({
  dark,
  select,
  options = [],
  textArea,
  uid,
  label,
  errors,
  placeholder,
  handleChange,
  handleBlur,
  touched,
  type,
  fontColor,
  values,
  py,
  pt,
  pb,
  isDisabled,
  passwordTypeToggler,
  secureTextEntry,
}) => {
  const inputProps = {
    bgColor: dark ? colors.transparent : colors.white,
    color: dark ? colors.white : colors.primary.gray,
    name: uid,
    onChange: handleChange,
    onBlur: handleBlur,

    fontcolor: fontColor || colors.black,
    placeholder,
    type: type || 'text',
    value: values[uid] ?? '',
    h: 50,
    w: '100%',
    isDisabled,
  };
  return (
    <FormControl {...{ pt, pb, py }} isInvalid={errors[uid]}>
      <FormLabel color={inputProps.color} fontWeight={500}>
        {label}
      </FormLabel>

      {textArea ? (
        <Textarea p={5} minH={220} maxH={220} {...inputProps} />
      ) : select ? (
        <Select {...inputProps}>
          {options.map((option, i) => (
            <option value={option.value} key={`${uid}-option-${i}`}>
              {option.name}
            </option>
          ))}
        </Select>
      ) : (
        <Box pos={'relative'} w={'100%'}>
          <Input {...inputProps} />
          {secureTextEntry && (
            <Box
              pos={'absolute'}
              right={'3%'}
              top={'30%'}
              _hover={{ cursor: 'pointer' }}
              onClick={passwordTypeToggler}
              zIndex={2}
            >
              {type == 'password' ? (
                <VscEye color={inputProps.color} size={'1.25rem'} />
              ) : (
                <VscEyeClosed color={inputProps.color} size={'1.25rem'} />
              )}
            </Box>
          )}
        </Box>
      )}

      {errors[uid] && touched[uid] && (
        <FormErrorMessage>{errors[uid]}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export const FormSubmit = ({
  uid,
  touched,
  errors,
  submit_message,
  handleSubmit,
  isSubmitting,
  pt,
  pb,
  colorScheme,
  color,
  bgColor,
  rightIcon,
  leftIcon,
  borderRadius,
  borderWidth,
  h = '3rem',
}) => {
  return (
    <FormControl {...{ pt, pb, colorScheme }}>
      <Button
        {...{
          rightIcon,
          leftIcon,
        }}
        _hover={{}}
        onClick={handleSubmit}
        colorScheme={colorScheme || colors.colorScheme.orange}
        {...{
          borderWidth,
          borderRadius,
          color,
          h,
        }}
        bgColor={bgColor || colors.primary.regular_green_orange}
        w={'100%'}
        type={'submit'}
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        loadingText={forms.inputs.loadingText}
      >
        {submit_message}
      </Button>
      {errors[uid] && touched[uid] && (
        <VStack>
          <ErrorMessage
            style={{ color: colors.error }}
            render={(errorMessage) => (
              <Text color={colors.error}>{errorMessage}</Text>
            )}
            name={uid}
          />
        </VStack>
      )}
    </FormControl>
  );
};

export const FormSearch = ({
  uid,
  errors,
  handleChange,
  handleBlur,
  value,
  isDisabled,
  placeholder,
}) => {
  const inputProps = {
    borderColor: colors.black,
    fontWeight: 500,
    name: uid,
    onChange: handleChange,
    onBlur: handleBlur,
    placeholder,
    value,
    h: '3rem',
    w: '100%',
    isDisabled,
  };

  return (
    <FormControl isInvalid={errors[uid]}>
      <InputGroup>
        <InputLeftElement alignSelf={'center'} h={'100%'} width={'3rem'}>
          <FiSearch size={'1.3rem'} />
        </InputLeftElement>
        <Input {...inputProps} />
      </InputGroup>
    </FormControl>
  );
};
