import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" type="image/png" href="/assests/avatar.png" />
          <link rel="apple-touch-icon" href="/assests/avatar.png" />
          <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

          {/* Scroll-reveal starts elements hidden; without JS they must stay visible. */}
          <noscript>
            <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
          </noscript>
        </Head>
        <body className="bg-ink-950 antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
