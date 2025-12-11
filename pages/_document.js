import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        
        {/* Meta de base */}
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Cotes-Boostées.com" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#4F46E5" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}