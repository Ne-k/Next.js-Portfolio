import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assests/icon-32.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/assests/icon-180.png"
          />
          <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

          {/*
            Fonts are fetched in CORS mode even same-origin, so dropping
            `crossOrigin` here makes the browser download each one twice.
          */}
          {[
            "ibm-plex-sans-latin-400-normal.woff2",
            "ibm-plex-sans-latin-600-normal.woff2",
            "ibm-plex-mono-latin-500-normal.woff2",
          ].map((file) => (
            <link
              key={file}
              rel="preload"
              as="font"
              type="font/woff2"
              href={`/fonts/${file}`}
              crossOrigin="anonymous"
            />
          ))}
        </Head>
        <body className="bg-paper antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
