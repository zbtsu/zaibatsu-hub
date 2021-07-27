const CracoEsbuildPlugin = require("craco-esbuild");

console.log(`craco.config.js: setting webpack target to: electron-renderer`);

module.exports = {
  plugins: [{ plugin: CracoEsbuildPlugin }],
  webpack: {
    configure: {
      target: "electron-renderer",
    },
  },
};
