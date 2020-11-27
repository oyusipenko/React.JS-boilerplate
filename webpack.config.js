const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  const isDev = env.development;
  const isProd = env.production;

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: "React.JS boilerplate",
        template: "src/index.html",
      }),
    ];
    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: "style-[hash:8].css",
        })
      );
    }
    return plugins;
  };

  return {
    entry: {
      main: path.resolve(__dirname, "src/index.js"),
    },

    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: isProd ? "[name]-[hash-8].bundle.js" : "[name].bundle.js",
    },

    mode: isDev ? "development" : isProd && "production",

    devServer: {
      open: true,
    },

    module: {
      rules: [
        // JS
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        // CSS
        {
          test: /\.css$/,
          use: getStyleLoaders(),
        },
        // SCSS
        {
          test: /\.s[ca]ss$/,
          use: [...getStyleLoaders(), "sass-loader"],
        },
        // IMAGES
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                name: "[name]-[sha1:hash:7].[ext]",
              },
            },
          ],
        },
        // FONTS
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "fonts",
                name: "[name].[ext]",
              },
            },
          ],
        },
      ],
    },

    plugins: [...getPlugins(), new CleanWebpackPlugin()],
  };
};
