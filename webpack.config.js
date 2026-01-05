const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
    publicPath: "/galleria/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public/logo.svg",
          to: "logo.svg",
        },
      ],
    }),
  ],
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: "/galleria/index.html" },
        { from: /./, to: "/galleria/index.html" },
      ],
    },
    static: {
      directory: path.resolve(__dirname, "public"),
      publicPath: "/galleria/",
    },
    port: 8080,
    open: ["galleria/"],
    hot: true,
  },
};
