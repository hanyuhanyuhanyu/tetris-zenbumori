const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
  mode: "development",
  target: "web",
  entry: path.resolve(__dirname, "../src/index.ts"),
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules"/,
        use: [
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/.vue$/],
            },
          },
        ],
      },
      {
        enforce: "pre",
        test: /\.vue$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          hotReload: true,
        },
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: `
                  @import "@/scss/global.scss";
                `,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    modules: ["node_modules"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
      vue$: "vue/dist/vue.esm.js",
    },
  },
  plugins: [new VueLoaderPlugin()],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "index.js",
  },
  node: {
    __dirname: false,
  },
}
