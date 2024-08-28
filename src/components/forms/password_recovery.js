import { Box } from '@chakra-ui/react';
import { FormInput, FormSubmit } from '@components/common/input/FormInput';
import { forms } from '@theme';
import { passwordRecoverySchema } from '@utils/schemas';
import { mapFormInitialValues } from '@utils/tools/mappers';
import { Formik } from 'formik';
import { Fragment } from 'react';

export const ForgotPasswordForm = () => {
  const {
    auth: {
      forgot_password: { email, submit },
    },
  } = forms.inputs;
  return (
    <Box py={10} w={'100%'}>
      <Formik
        initialValues={mapFormInitialValues(passwordRecoverySchema._nodes)}
        validationSchema={passwordRecoverySchema}
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
            <FormSubmit
              pt={5}
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
