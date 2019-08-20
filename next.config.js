require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");
module.exports = {
  webpack: (config, { dev, buildId }) => {
    config.module.rules.push(
      {
        test: /\.(less)/,
        loader: "emit-file-loader",
        options: {
          name: "dist/[path][name].[ext]"
        }
      },
      {
        test: /\.less$/,
        use: [
          "babel-loader",
          "raw-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: loader => [
                require("autoprefixer")({
                  browsers: ["last 15 versions"]
                })
              ]
            }
          },
          {
            loader: require.resolve("less-loader"), // compiles Less to CSS
            options: {
              modifyVars: { "@primary-color": "#ffa42f" }
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "images/[name].[hash:8].[ext]"
        }
      }
    );
    config.plugins = config.plugins || [];
    // 使浏览器拥有process.env变量
    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];
    return config;
  }
};
