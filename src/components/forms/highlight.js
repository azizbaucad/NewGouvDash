import { Button, HStack, VStack, useToast } from '@chakra-ui/react';
import { FormInput, FormSubmit } from '@components/common/input/FormInput';
import { highlightSchema } from '@schemas';
import { forms, routes } from '@theme';
import { highlightFormHandler } from '@utils/handlers';
import { mapFormInitialValues } from '@utils/tools/mappers';
import { Formik } from 'formik';
import { Fragment } from 'react';
import { FiArrowRight } from 'react-icons/fi';

export const HighlightForm = (props) => {
  const {
    highlight: { title, status, desc, submit, week },
  } = forms.inputs;

  const highlighValue = props.highlight;
  const valuesInitial = highlighValue
    ? {
        title: highlighValue.title,
        week: highlighValue.week + '-' + highlighValue.year,
        desc: highlighValue.textHighlight,
        status: highlighValue.status.id,
      }
    : null;

  const toast = useToast();

  return (
    <HStack w={'100%'}>
      <VStack w={'100%'}>
        <Formik
          initialValues={
            valuesInitial ?? mapFormInitialValues(highlightSchema._nodes)
          }
          validationSchema={highlightSchema}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            highlightFormHandler({
              directionId: props.directionId,
              highlighId: highlighValue?.id ?? null,
              data: values,
              setSubmitting,
              closeModal: props.onClose,
              getHightlight: props.getHightlight,
              setSelectedWeek: props.setSelectedWeek,
              selectedWeek: props.selectedWeek,
              toast: toast,
              setFieldError,
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
              <HStack w={'100%'} gap={10}>
                <FormInput
                  py={1}
                  select={true}
                  options={props.weekOption}
                  {...week}
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
                  {...status}
                  {...{
                    errors,
                    handleChange,
                    handleBlur,
                    touched,
                    values,
                  }}
                />
              </HStack>

              <FormInput
                py={1}
                {...title}
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
                {...desc}
                textArea={true}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <HStack w={'100%'} gap={10} py={2}>
                <Button
                  onClick={props.onClose}
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
    </HStack>
  );
};
