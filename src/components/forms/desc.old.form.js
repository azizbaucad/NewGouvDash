import {
  Button,
  Divider,
  HStack,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FormInput, FormSubmit } from '@components/common/input/FormInput';
import { descSchema } from '@schemas';
import { forms, routes } from '@theme';
import { descFormHandler } from '@utils/handlers';
import { mapFormInitialValues } from '@utils/tools/mappers';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
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

  return (
    <VStack w={'100%'} alignItems="start">
      <Formik
        alignItems="start"
        enableReinitialize={true}
        initialValues={valuesInitial ?? mapFormInitialValues(descSchema._nodes)}
        validationSchema={descSchema}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          descFormHandler({
            directionId: props.directionId,
            descId: valuesInitial?.id ?? null,
            data: values,
            setSubmitting,
            closeModal: props.onClose,
            //getHightlight: props.getHightlight,
            week: props.selectedWeek,
            toast: toast,
            setFieldError,
            goBack,
            redirectOnSuccess: routes.pages.dashboard.initial,
          });
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
          <Fragment>
            <Text
              fontSize={'16px'}
              fontFamily="'Roboto mono', sans-serif"
              fontWeight={'550'}
              mt={2}
            >
              {' '}
              Team projet{' '}
            </Text>
            <Divider />

            <HStack w={'100%'} gap={2} alignContent="start" h={'3.5rem'} mb={2}>
              <FormInput
                py={1}
                select={true}
                options={props.currentYearOption}
                {...currentYearValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <FormInput
                py={1}
                type="text"
                {...associatedMinisterValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <FormInput
                py={1}
                type="text"
                {...ownerMinisterValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />
            </HStack>
            {/* <Divider mt={0} mb={0} color={''} /> */}
            <Text
              fontSize={'16px'}
              fontFamily="'Roboto mono', sans-serif"
              fontWeight={'550'}
              mt={2}
            >
              {' '}
              Rencontre{' '}
            </Text>
            <Divider />

            <HStack w={'100%'} gap={2} alignContent="start" h={'3.5rem'} mb={2}>
              <FormInput
                py={1}
                type="date"
                {...dateMettingValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <FormInput
                py={1}
                type="text"
                {...codeMettingValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <FormInput
                py={1}
                type="text"
                {...typeMettingValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <FormInput
                py={1}
                textArea={true}
                {...mettingValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />
            </HStack>

            <Text
              fontSize={'16px'}
              fontFamily="'Roboto mono', sans-serif"
              fontWeight={'550'}
              mt={2}
            >
              {' '}
              Directive{' '}
            </Text>
            <Divider />

            <HStack w={'100%'} gap={2} alignContent="start" h={'3.5rem'} mb={2}>
              <FormInput
                py={0}
                type="text"
                {...codeDirectiveValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <FormInput
                py={1}
                type="text"
                {...typeDirectiveValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <FormInput
                py={1}
                textArea={true}
                {...directiveValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />
            </HStack>

            <Text
              fontSize={'16px'}
              fontFamily="'Roboto mono', sans-serif"
              fontWeight={'550'}
              mt={2}
            >
              {' '}
              Détails directives{' '}
            </Text>
            <Divider />

            <HStack w={'100%'} gap={2} alignContent="start" h={'3.5rem'} mb={2}>
              <FormInput
                py={1}
                type="date"
                {...startRealDateValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <FormInput
                py={1}
                type="date"
                {...endRealDateValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <FormInput
                py={1}
                type="date"
                {...limitDateValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <FormInput
                py={1}
                type="date"
                {...previousLimitDateValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <FormInput
                py={1}
                select={true}
                options={props.statusOption}
                {...stateValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />
            </HStack>

            <HStack w={'100%'} gap={2} py={10}>
              <Button
                onClick={goBack}
                bgColor="white"
                w={'50%'}
                h={'2.3rem'}
                border="1px"
                borderColor="gray.200"
              >
                Annuler
              </Button>
              <FormSubmit
                {...{
                  touched,
                  errors,
                  handleSubmit,
                  isSubmitting,
                }}
                {...submit}
                /* rightIcon={<FiArrowRight size={'1.5rem'} />} */
              />
            </HStack>
          </Fragment>
        )}
      </Formik>
    </VStack>
  );
};
