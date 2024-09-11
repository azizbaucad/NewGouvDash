import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { ButtonBack } from '@components/common/button';
import { FormInput, FormSubmit } from '@components/common/input/FormInput';
import { PageTitle } from '@components/common/title/page';
import { descSchema } from '@schemas';
import { forms, routes } from '@theme';
import { descFormHandler } from '@utils/handlers';
import { mapFormInitialValues } from '@utils/tools/mappers';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FiArrowRight } from 'react-icons/fi';

export const DescForm = (props) => {
  const router = useRouter();

  const goBack = () => router.back();
  const {
    descForm: {
      week,
      structureValue,
      projetValue,
      currentYearValue,
      associatedMinisterValue,
      ownerMinisterValue,
      dateMettingValue,
      codeMettingValue,
      typeMettingValue,
      mettingValue,
      codeDirectiveValue,
      typeDirectiveValue,
      directiveValue,
      startRealDateValue,
      endRealDateValue,
      limitDateValue,
      previousLimitDateValue,
      stateValue,
      evitementSelfcareValue,
      submit,
    },
  } = forms.inputs;

  const valuesInitial = props.descForm ?? null;
  const toast = useToast();

  return <ContactForm />;
};

export const ContactForm = (props) => {
  const router = useRouter();

  const goBack = () => router.back();
  const {
    descForm: {
      week,
      structureValue,
      projetValue,
      currentYearValue,
      associatedMinisterValue,
      ownerMinisterValue,
      dateMettingValue,
      codeMettingValue,
      typeMettingValue,
      mettingValue,
      codeDirectiveValue,
      typeDirectiveValue,
      directiveValue,
      startRealDateValue,
      endRealDateValue,
      limitDateValue,
      previousLimitDateValue,
      stateValue,
      evitementSelfcareValue,
      submit,
    },
  } = forms.inputs;

  const valuesInitial = props.descForm ?? null;
  const toast = useToast();
  return (
    <Box maxW="100%" mx="auto" p={8} bg="#f1f5f9" borderRadius="lg">
      <HStack>
        <Box mt={2}>
          <ButtonBack color="gray" />
        </Box>
        <Box ml={1}>
          <PageTitle
            titleSize={16}
            titleColor={'black'}
            subtitleColor={'gray'}
            subtitleSize={16}
            icon={<AiFillHome size={26} color="#9999ff" />}
            subtitle={'Renseigner un projet'}
          />
        </Box>
      </HStack>
      <Divider mt={3} mb={5} />

      <Formik
        initialValues={props.initialValues ?? {}}
        validationSchema={props.validationSchema}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          props.onSubmit(values, setSubmitting, setFieldError);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* First Name & Last Name */}
            <HStack spacing={4} mb={4}>
              <FormControl isInvalid={errors.firstName && touched.firstName}>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
              </FormControl>

              <FormControl isInvalid={errors.lastName && touched.lastName}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
              </FormControl>
              <FormControl isInvalid={errors.lastName && touched.lastName}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
              </FormControl>
            </HStack>

            {/* Email Address */}
            <FormControl mb={4} isInvalid={errors.email && touched.email}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </FormControl>

            {/* Query Type */}
            <FormControl as="fieldset" mb={4}>
              <FormLabel as="legend">Query Type</FormLabel>
              <RadioGroup
                name="queryType"
                onChange={handleChange}
                value={values.queryType}
              >
                <Stack direction="row">
                  <Radio value="General Enquiry">General Enquiry</Radio>
                  <Radio value="Support Request">Support Request</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {/* Message */}
            <FormControl mb={4} isInvalid={errors.message && touched.message}>
              <FormLabel>Message</FormLabel>
              <Textarea
                name="message"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />
            </FormControl>

            {/* Consent Checkbox */}
            <FormControl mb={6}>
              <Checkbox
                name="consent"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                I consent to being contacted by the team
              </Checkbox>
            </FormControl>

            <Divider mb={4} />

            {/* Submit Button */}
            <Button
              type="submit"
              colorScheme="green"
              size="lg"
              isFullWidth
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};
