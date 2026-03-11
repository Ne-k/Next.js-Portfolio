const path = require("path");

module.exports = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.nguyen.ink",
          },
        ],
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
    ];
  },

  async rewrites() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "nguyen.ink",
          },
        ],
        destination: "/landing",
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "localhost",
          },
        ],
        destination: "/landing",
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "cardin.nguyen.ink",
          },
        ],
        destination: "/cardin",
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "cardin.localhost",
          },
        ],
        destination: "/cardin",
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "dylan.nguyen.ink",
          },
        ],
        destination: "/dylan",
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "dylan.localhost",
          },
        ],
        destination: "/dylan",
      },
    ];
  },
  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
};
