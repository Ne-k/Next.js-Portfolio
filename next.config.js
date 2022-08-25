const path = require("path");

module.exports = {
  async redirects() {
    return [

      {
        source: '/instagram',
        destination: 'https://www.instagram.com/nekk.ng/',
        permanent: true
      },
      {
        source: '/github',
        destination: 'https://github.com/Ne-k',
        permanent: true
      },
      {
        source: '/spotify',
        destination: 'https://open.spotify.com/user/mewz8iujhbqn1rwndb37q7tda',
        permanent: true
      },
      {
        source: '/resume',
        destination: '/CN_Resume.pdf',
        permanent: true
      }
    ]
  },

  /*
  rewrites: async () => {
    // In order to support wildcard subdomains with different content, use a "rewrite" to include the host in the path
    return [
      {
        source: '/:path*{/}?',
        has: [
          {
            type: 'host',
            value: '(?<siteHost>.*)',
          },
        ],
        destination: '/site/:siteHost/:path*',
      },
    ];
  },

   */

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["cdn.discordapp.com", "i.scdn.co"],
  },
};
