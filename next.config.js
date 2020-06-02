// next.config.js

const withLess = require('@zeit/next-less');

module.exports = withLess({
  distDir: '.build/client',
  pageExtensions: ['page.tsx'],

  webpack: config => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
});
