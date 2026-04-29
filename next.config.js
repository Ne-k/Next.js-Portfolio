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
