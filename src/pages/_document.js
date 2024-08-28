// pages/_document.js
/* import { randomBytes } from 'crypto' */
import { ColorModeScript } from '@chakra-ui/react';
import { mediaStyles } from '@utils/media';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  /* const nonce = randomBytes(128).toString('base64')
  const csp = `object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http: 'nonce-${nonce}' 'strict-dynamic'; frame-ancestors 'none'`
 */
  return (
    <Html lang="en">
      <Head>
        {/* <meta httpEquiv="Content-Security-Policy" content={csp} /> */}
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: mediaStyles }}
        />
      </Head>
      <body>
        {/* 👇 Here's the script */}
        <ColorModeScript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
