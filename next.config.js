/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

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
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
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
        source: "/resume",
        destination: "/CN_Resume.pdf",
        permanent: true,
      },
      {
        source: "/references",
        destination: "/CN_References.pdf",
        permanent: false,
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
