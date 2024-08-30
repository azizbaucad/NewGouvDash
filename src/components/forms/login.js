import { Box } from '@chakra-ui/react';
import { FormInput, FormSubmit } from '@components/common/input/FormInput';
import { usePasswordType } from '@hooks';
import { authenticationSchema } from '@schemas';
import { forms, routes } from '@theme';
import { loginFormHandler } from '@utils/handlers';
import { mapFormInitialValues } from '@utils/tools/mappers';
import { Formik } from 'formik';
import { Fragment } from 'react';

export const LoginForm = () => {
  const { passwordType, passwordTypeToggler } = usePasswordType();
  const {
    auth: {
      login: { identifier, password, submit },
    },
  } = forms.inputs;

  return (
    <Box alignItems={'center'} py={10} w={'100%'}>
      <Formik
        initialValues={mapFormInitialValues(authenticationSchema._nodes)}
        validationSchema={authenticationSchema}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          loginFormHandler({
            data: values,
            setSubmitting,
            setFieldError,
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
              {...identifier}
              {...{
                errors,
                handleChange,
                handleBlur,
                touched,
                values,
              }}
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
                values,
              }}
              type={passwordType}
            />

            <FormSubmit
            mt={5}
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
