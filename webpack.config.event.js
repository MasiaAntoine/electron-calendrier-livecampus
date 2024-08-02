const path = require("path");

module.exports = {
  entry: "./src/renderer/rendererEvent.ts",
  output: {
    filename: "rendererEvent.js",
    path: path.resolve(__dirname, "dist/renderer"),
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
  mode: "development",
};
