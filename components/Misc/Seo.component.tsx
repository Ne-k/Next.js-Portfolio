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
}: SeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={url} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="nguyen.ink" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />

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
