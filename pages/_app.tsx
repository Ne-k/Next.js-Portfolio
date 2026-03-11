import type { AppProps } from "next/app";
import "../styles/globals.css";

import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import "@fontsource/jost/600.css";
import "@fontsource/jost/700.css";
import "@fontsource/sen/400.css";
import "@fontsource/sen/700.css";

import { generateDefaultSeo } from "next-seo/pages";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
      <Head>
        {generateDefaultSeo({
          title: "Cardin | Backend Developer",
          titleTemplate: "Cardin | Backend Developer",
          defaultTitle: "Cardin | Backend Developer",
          description: "Hey! I'm Cardin, a backend developer and a student",
          openGraph: {
            url: "https://nekk.vercel.app",
            title: "Cardin | Backend Developer",
            description: "Hey! I'm Cardin, a backend developer and a student",
            images: [
              {
                url: "https://media.discordapp.net/attachments/953754034630717454/999515622801158304/image0_13.jpg",
                width: 890,
                height: 890,
                alt: "Banner",
              },
            ],
          },
          additionalMetaTags: [
            {
              property: "keywords",
              content:
                "Backend Developer, Nek, Cardin Nguyen, Web Developer, web development, web developer, tech enthusiast",
            },
          ],
        })}
        <link rel="icon" type="image/png" href="/assests/avatar.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
