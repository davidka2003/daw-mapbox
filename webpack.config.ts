import path from "path";
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from "webpack";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
const getConfig = (mode: "development" | "production") => {
  return {
    entry: {
      bundle: path.resolve(__dirname, "src/index.tsx"),
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name][contenthash].js",
      clean: true,
      assetModuleFilename: "[name][ext]",
    },
    module: {
      rules: [
        {
          test: /\.tsx$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
              plugins: ["react-refresh/babel"],
            },
          },
        },
        {
          test: /\.ts$/,
          include: [path.resolve(__dirname /* "src" */)],
          exclude: [path.resolve(__dirname, "node_modules"), /webpack.config.ts$/],
          loader: "ts-loader",
        },

        {
          test: /\.module\.s(a|c)ss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: mode === "development" ? true : false,
                localIdentName: mode === "production" ? "[hash:base64]" : "[path][name]__[local]--[hash:base64:5]",
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: mode === "development" ? true : false,
              },
            },
          ],
        },
        {
          test: /\.s(a|c)ss/,
          exclude: /\.module\.s(a|c)ss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: false,
                sourceMap: mode === "development" ? true : false,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: mode === "development" ? true : false,
              },
            },
          ],
        },
        {
          test: /\.module\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: mode === "development" ? true : false,
                localIdentName: mode === "production" ? "[hash:base64]" : "[path][name]__[local]--[hash:base64:5]",
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: mode === "development" ? true : false,
                modules: false,
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          type: "asset/resource",
        },
      ],
    },
    devtool: mode === "development" ? "inline-source-map" : false,
    devServer: {
      port: 3001,
      open: true,
      hot: true,
      // compress: true,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/index.html"),
      }),
      new ForkTsCheckerWebpackPlugin({ async: false }),
      new NodePolyfillPlugin(),
      mode === "development" && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    stats: {
      logging: mode === "development" ? "error" : "none",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      alias: {
        "@hooks": path.resolve("hooks"),
        "@shared": path.resolve("shared"),
        "@store": path.resolve("store"),
        "@api": path.resolve("api"),
        "@components": path.resolve("src/components"),
        "@utils": path.resolve("utils"),
      },
    },
  } as Configuration;
};
module.exports = (env: any, argv: any) => {
  if (argv.mode === "development" || env.NODE_ENV === "development") {
    return getConfig("development");
  }
  if (argv.mode === "production" || env.NODE_ENV === "production") {
    return getConfig("production");
  }
  return getConfig("production");
};

interface Configuration extends WebpackConfiguration {
  devServer: any;
}
