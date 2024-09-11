import { Box, Button, Text, VStack } from '@chakra-ui/react';
import {
  FormInput,
  FormInputLogin,
  FormSubmit,
} from '@components/common/input/FormInput';
import { usePasswordType } from '@hooks';
import { authenticationSchema } from '@schemas';
import { forms, routes } from '@theme';
import { loginFormHandler } from '@utils/handlers';
import { mapFormInitialValues } from '@utils/tools/mappers';
import { Formik } from 'formik';
import { Fragment, useState } from 'react';

export const ToglleComponent = () => {
  // State to manage the visibity of the component
  const [showComponent, setShowComponent] = useState(false);
  // Function to toggle component visibility
  const toggleComponent = () => setShowComponent(!showComponent);

  return (
    <>
    <LoginForm />
    </>
  );
};

export const LoginForm = () => {
  const { passwordType, passwordTypeToggler } = usePasswordType();
  const {
    auth: {
      login: { identifier, password, submit },
    },
  } = forms.inputs;

  return (
    <VStack w={'100%'} alignItems={'start'}>
      <Box w={'100%'}>
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
              <FormInputLogin
                {...identifier}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <FormInputLogin
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
                }} /*  */
                {...submit}
              />
            </Fragment>
          )}
        </Formik>
      </Box>
    </VStack>
  );
};

export const RegisterForm = () => {
  const { passwordType, passwordTypeToggler } = usePasswordType();
  const {
    auth: {
      login: { identifier, password, role, submit, subscribe },
    },
  } = forms.inputs;

  const roleList = ['Ministre', 'Responsable projet'];

  const roleOption = roleList.map((status) => {
    return { value: status, name: status};
  })



  return (
    <VStack w={'100%'} alignItems={'start'}>
      <Box w={'100%'}>
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
              <FormInputLogin
                {...identifier}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <FormInputLogin
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
              <FormInputLogin
                py={1}
                select={true}
                options={roleOption}
                {...role}
                {...{
                  errors,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                }}
              />

              <FormSubmit
                mt={5}
                py={5}
                {...{
                  touched,
                  errors,
                  handleSubmit,
                  isSubmitting,
                }} /*  */
                {...subscribe}
              />
            </Fragment>
          )}
        </Formik>
      </Box>
    </VStack>
  );
};
