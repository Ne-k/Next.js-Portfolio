module.exports = {
  plugins: {
    // `base` is pinned because sibling repos share the parent folder and the
    // plugin otherwise resolves `@import "tailwindcss"` from there.
    "@tailwindcss/postcss": { base: __dirname },
  },
};
