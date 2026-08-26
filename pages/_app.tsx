import type { AppProps } from "next/app";

import Head from "next/head";
import Script from "next/script";

import "../styles/globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

/** The only routes that follow the system light/dark setting. */
const AUTO_THEME_ROUTES = new Set(["/", "/landing"]);

function MyApp({ Component, pageProps, router }: AppProps) {
  const followsSystemTheme = AUTO_THEME_ROUTES.has(router.pathname);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {followsSystemTheme ? (
          <>
            <meta
              key="theme-color-light"
              name="theme-color"
              media="(prefers-color-scheme: light)"
              content="#f2f1ec"
            />
            <meta
              key="theme-color-dark"
              name="theme-color"
              media="(prefers-color-scheme: dark)"
              content="#141311"
            />
            <meta name="color-scheme" content="light dark" />
          </>
        ) : (
          <>
            <meta name="theme-color" content="#f2f1ec" />
            <meta name="color-scheme" content="light" />
          </>
        )}
      </Head>

      {/* Landing ships no client runtime, so it loads analytics itself. */}
      {GA_ID && !followsSystemTheme ? (
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
