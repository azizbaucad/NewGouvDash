import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { LoadingComponent } from '@components/common/status';
import { DashboardLayout } from '@components/layout/dashboard';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MediaContextProvider } from '../lib/utils/media';

const colorSchemes = {
  colorSecondary: '#fff9f3',
};

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const theme = extendTheme({ colors, breakpoints, colorSchemes });

// 3. Pass the `theme` prop to the `ChakraProvider`
function DeveloperConsole({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(false);
  const [authorizedLoader, setAuthorizeLoading] = useState(false);
  const router = useRouter();

  /*useEffect(() => {
    setAuthorizeLoading(router.pathname.includes('dashboard'));
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', stopLoading);
    router.events.on('routeChangeError', stopLoading);

    return () => {
      router.events.off('routeChangeStart', startLoading);
      router.events.off('routeChangeComplete', stopLoading);
      router.events.off('routeChangeError', stopLoading);
    };
  }, []);*/

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>{process.env.NEXT_PUBLIC_SITENAME}</title>
        </Head>
        <MediaContextProvider disableDynamicMediaQueries>
          {loading && authorizedLoader ? (
            <DashboardLayout
              activeMenu={`account-${router.pathname.split('/')[1]}`}
            >
              <Box alignItems={'flex-start'}>
                <LoadingComponent size={'lg'} />
              </Box>
            </DashboardLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </MediaContextProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default DeveloperConsole;
