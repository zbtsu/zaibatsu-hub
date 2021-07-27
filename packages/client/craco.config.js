const CracoEsbuildPlugin = require("craco-esbuild");
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

console.log(`craco.config.js: setting webpack target to: electron-renderer`);

const cspConfigPolicy = {
  "default-src": "'none'",
  "base-uri": "'self'",
  "object-src": "'none'",
  "script-src": ["'self'"],
  "style-src": ["'self'"],
};

module.exports = {
  plugins: [{ plugin: CracoEsbuildPlugin }],
  webpack: {
    plugins: {
      add: [new cspHtmlWebpackPlugin(cspConfigPolicy)],
    },
    configure: {
      target: "electron-renderer",
    },
  },
};
