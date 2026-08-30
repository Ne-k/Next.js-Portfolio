import Head from "next/head";

type SeoProps = {
  title: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  keywords?: string;
  /** Emitted as a JSON-LD <script>. */
  jsonLd?: Record<string, unknown>;
  noIndex?: boolean;
  /**
   * Slug of the icon set in public/assests, e.g. "cn" for icon-cn-32.png.
   * Lives here rather than in _document because one document serves three
   * hosts, and each wants its own initials in the tab.
   */
  icon?: string;
};

const DEFAULT_IMAGE = "https://cardin.nguyen.ink/assests/og-image.png";

/** Single source of truth for per-page metadata, Open Graph, and Twitter cards. */
const Seo = ({
  title,
  description,
  url,
  image = DEFAULT_IMAGE,
  imageAlt = "Cardin Nguyen",
  keywords,
  jsonLd,
  noIndex = false,
  icon = "n",
}: SeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={url} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}

      {/*
        Both sizes are declared so standard-DPI tabs pick the 16px cut rather
        than downsampling the 32px one, which turns two letters to mush.
      */}
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`/assests/icon-${icon}-16.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`/assests/icon-${icon}-32.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`/assests/icon-${icon}-180.png`}
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="nguyen.ink" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd ? (
        <script
          type="application/ld+json"
          // JSON.stringify output is escaped below so it cannot break out of the tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\u003c"),
          }}
        />
      ) : null}
    </Head>
  );
};

export { Seo };
