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
      dirValue,
      ibouValue,
      orangeMoneyValue,
      portalValue,
      chatbotValue,
      eannuaireValue,
      csatValue,
      dsatValue,
      serviceLevelValue,
      timeCycleValue,
      rateAbandonValue,
      npsValue,
      cesValue,
      trValue,
      caRebondValue,
      fcrValue,
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
            <HStack
              w={'40%'}
              gap={10}
              alignContent="start"
              justifyContent="space-between"
            >
              <FormInput
                py={1}
                select={true}
                options={props.weekOption}
                values={{ ...values, week: props.selectedWeek }}
                handleChange={(e) => props.setSelectedWeek(e.target.value)}
                {...week}
                {...{
                  errors,
                  handleBlur,
                  touched,
                }}
              />
              <FormInput
                py={1}
                type="number"
                {...dirValue}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />
            </HStack>
            <Divider />
            <VStack alignItems="start">
              <Text as="b"> Mix par canal digital </Text>

              <HStack w={'100%'} gap={10}>
                <FormInput
                  py={1}
                  type="number"
                  {...ibouValue}
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
                  type="number"
                  {...orangeMoneyValue}
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
                  type="number"
                  {...portalValue}
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
                  type="number"
                  {...chatbotValue}
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
                  type="number"
                  {...eannuaireValue}
                  {...{
                    errors,
                    handleChange,
                    handleBlur,
                    touched,
                    values,
                  }}
                />
              </HStack>
              <Stack w={'20%'}>
                <FormInput
                  py={1}
                  type="number"
                  {...evitementSelfcareValue}
                  {...{
                    errors,
                    handleChange,
                    handleBlur,
                    touched,
                    values,
                  }}
                />
              </Stack>
            </VStack>

            <Divider />
            <VStack alignItems="start">
              <HStack w={'100%'} gap={10}>
                <FormInput
                  py={1}
                  type="number"
                  {...csatValue}
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
                  type="number"
                  {...dsatValue}
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
                  type="number"
                  {...serviceLevelValue}
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
                  type="number"
                  {...timeCycleValue}
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
                  type="number"
                  {...rateAbandonValue}
                  {...{
                    errors,
                    handleChange,
                    handleBlur,
                    touched,
                    values,
                  }}
                />
              </HStack>
              <HStack w={'100%'} gap={10}>
                <FormInput
                  py={1}
                  type="number"
                  {...npsValue}
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
                  type="number"
                  {...cesValue}
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
                  type="number"
                  {...trValue}
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
                  type="number"
                  {...caRebondValue}
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
                  type="number"
                  {...fcrValue}
                  {...{
                    errors,
                    handleChange,
                    handleBlur,
                    touched,
                    values,
                  }}
                />
              </HStack>
            </VStack>

            <HStack w={'48%'} gap={10} py={10}>
              <Button
                onClick={goBack}
                bgColor="white"
                w={'100%'}
                h={'3rem'}
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
                rightIcon={<FiArrowRight size={'1.5rem'} />}
              />
            </HStack>
          </Fragment>
        )}
      </Formik>
    </VStack>
  );
};
