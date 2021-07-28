const CracoEsbuildPlugin = require("craco-esbuild");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log(`craco.config.js: setting webpack target to: electron-renderer`);

const cspConfigPolicy = {
  // "default-src": "'none'",
  // "base-uri": "'self'",
  // "object-src": "'none'",
  "script-src": '',
  "style-src": '',
};

module.exports = {
  plugins: [{ plugin: CracoEsbuildPlugin }],
  webpack: {
    plugins: {
      // add: [new HtmlWebpackPlugin(),new CspHtmlWebpackPlugin(cspConfigPolicy)],
    },
    configure: {
      target: "electron-renderer",
    },
  },
};
