/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // The gated PDFs live outside public/, so tracing has to be told about them.
  outputFileTracingIncludes: {
    "/api/documents/[doc]": ["./documents/*.pdf"],
  },

  // Several sibling repos live under the same parent folder, so Turbopack's
  // root inference walks too far up and fails to resolve `tailwindcss`.
  turbopack: { root: __dirname },

  async headers() {
    return [
      {
        // Everything except Next's own build output, which the dev server
        // occasionally labels with a content type that `nosniff` rejects.
        source: "/((?!_next/).*)",
        headers: securityHeaders,
      },
      {
        // Fingerprinted-by-hand assets: safe to cache hard.
        source: "/assests/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // Font files are immutable: the name pins family, weight, and subset.
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.nguyen.ink" }],
        destination: "https://nguyen.ink/:path*",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/nekk.ng/",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/Ne-k",
        permanent: true,
      },
      {
        source: "/spotify",
        destination: "https://open.spotify.com/user/mewz8iujhbqn1rwndb37q7tda",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/cardin-nguyen-378107238",
        permanent: true,
      },
      {
        // Both documents now sit behind the check on /resume.
        source: "/references",
        destination: "/resume",
        permanent: false,
      },
      {
        source: "/CN_Resume.pdf",
        destination: "/resume",
        permanent: true,
      },
      {
        source: "/CN_References.pdf",
        destination: "/resume",
        permanent: true,
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.discordapp.com" },
      { protocol: "https", hostname: "i.scdn.co" },
    ],
  },
};
