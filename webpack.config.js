const path = require("path");

module.exports = {
  entry: "./src/renderer/renderer.ts",
  output: {
    filename: "renderer.js",
    path: path.resolve(__dirname, "dist/renderer"),
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode: "development", // Utilisez 'production' pour les builds finaux
};
