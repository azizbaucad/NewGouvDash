import { roleToDirection } from '@utils/services/direction';
import { getToken } from 'next-auth/jwt';
import router from 'next/router';
import { Fragment, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { signOut } from 'next-auth/react';

export default function Home(props) {
  const token = props.token?.name?.token?.access_token;
  const decodeToken = token ? jwtDecode(token) : null;
  const role = decodeToken
    ? decodeToken.authorities && decodeToken.authorities.length > 0
      ? decodeToken.authorities[0]
      : 'unknowRole'
    : 'unknownRole';

  useEffect(() => {
    if (role == 'unknowRole') {
      signOut();
    } else {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('role', role);
      }
      const routeUrl = roleToDirection(role);
      router.push(routeUrl);
    }
    return () => {};
  }, []);
  return <Fragment></Fragment>;
}

export const getServerSideProps = async ({ req }) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const session = await getToken({ req, secret });

  return {
    props: {
      token: session,
    },
  };
};
