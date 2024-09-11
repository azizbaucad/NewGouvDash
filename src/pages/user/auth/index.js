import { LoginForm, ToglleComponent } from '@components/forms/login';
import {
  AuthenticationLayout,
  AuthenticationLayoutForm,
} from '@components/layout/authentication';
import { messages, routes } from '@theme';

export default function Login() {
  const {
    login: {
      heading: { title, subtitle },
      specifics,
    },
  } = messages.pages;
  return (
    <AuthenticationLayout title={'Login'}>
      <AuthenticationLayoutForm
        redirection_route={routes.pages.auth.register}
        {...{
          title,
          subtitle,
          specifics,
        }}
      >
        <ToglleComponent />
      </AuthenticationLayoutForm>
    </AuthenticationLayout>
  );
}
