// next.config.js
require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');

const withLess = require('@zeit/next-less');

module.exports = withLess({
  distDir: '.build/client',
  pageExtensions: ['page.tsx'],
  experimental: {
    jsconfigPaths: true, // enables it for both jsconfig.json and tsconfig.json
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        safe: true,
        systemvars: true,
      }),
    ];

    return config;
  },
});
