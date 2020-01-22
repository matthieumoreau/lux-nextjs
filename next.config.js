// next.config.js
require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  distDir: ".build",
  pageExtensions: ["page.tsx"],

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        safe: true,
        systemvars: true
      })
    ];

    return config;
  }
};
