import { Box } from '@chakra-ui/react';
import { FormInput, FormSubmit } from '@components/common/input/FormInput';
import { usePasswordType } from '@hooks';
import { forms, routes } from '@theme';
import { registrationFormHandler } from '@utils/handlers';
import { registrationSchema } from '@utils/schemas';
import { mapFormInitialValues } from '@utils/tools/mappers';
import { Formik } from 'formik';
import { Fragment } from 'react';

export const RegistrationForm = () => {
  const { passwordType, passwordTypeToggler } = usePasswordType();
  const {
    inputs: {
      auth: {
        register: { email, password, password_confirmation, submit },
      },
    },
  } = forms;
  return (
    <Box py={10} w={'100%'}>
      <Formik
        initialValues={mapFormInitialValues(registrationSchema._nodes)}
        validationSchema={registrationSchema}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          registrationFormHandler({
            data: values,
            setSubmitting,
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
            <FormInput
              {...email}
              {...{
                errors,
                handleChange,
                handleBlur,
                touched,
              }}
              value={values.email}
            />

            <FormInput
              py={5}
              {...password}
              {...{
                errors,
                handleChange,
                handleBlur,
                touched,
                passwordTypeToggler,
              }}
              type={passwordType}
              password
              value={values.password}
            />

            <FormInput
              {...password_confirmation}
              pb={5}
              {...{
                errors,
                handleChange,
                handleBlur,
                touched,
                passwordTypeToggler,
              }}
              password
              type={passwordType}
              value={values.password_confirmation}
            />

            <FormSubmit
              py={5}
              {...{
                touched,
                errors,
                handleSubmit,
                isSubmitting,
              }}
              {...submit}
            />
          </Fragment>
        )}
      </Formik>
    </Box>
  );
};
