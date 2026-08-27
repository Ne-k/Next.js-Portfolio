import type { AppProps } from "next/app";

import Head from "next/head";
import Script from "next/script";

import "../styles/globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

/** Routes served without a client runtime, which load analytics themselves. */
const NO_RUNTIME_ROUTES = new Set(["/", "/landing"]);

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {GA_ID && !NO_RUNTIME_ROUTES.has(router.pathname) ? (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      ) : null}

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
