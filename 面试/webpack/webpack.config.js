// loader：webpack默认识别js、json，loader就是将webpack不认识的变成它认识的

const path = require("path");
const HttpWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 以引入css文件引入css样式

console.log("process.env.NODE_ENV=", process.env.NODE_ENV); // 打印环境变量
console.log("__dirname", path.join(__dirname, "public"));

// 路径处理方法
function resolve(dir) {
  return path.join(__dirname, dir);
}

// 费时分析
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = {
  mode: "development", // 模式
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
    publicPath: "./",
  },
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      // 转换规则
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     // {
      //     //   loader: "url-loader",
      //     //   options: {
      //     //     limit: 8192,
      //     //   },
      //     // },
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[path][name].[ext]",
      //       },
      //     },
      //   ],
      // },
      // webpack5的资源能处理
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: "asset",
        generator: {
          // 输出文件位置以及文件名
          // [ext] 自带 "." 这个与 url-loader 配置不同
          filename: "[name][hash:8][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024, //超过50kb不转 base64
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: "asset",
        generator: {
          // 输出文件位置以及文件名
          filename: "[name][hash:8][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 超过100kb不转 base64
          },
        },
      },
    ],
  },
  plugins: [
    new HttpWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // 添加插件
      filename: "[name].[hash:8].css",
    }),
  ],
  devServer: {
    static: ["public"],
    compress: true, //是否启动压缩 gzip
    port: 8080, // 端口号
    // open: true,
  },
  resolve: {
    // 别名
    alias: {
      "~": resolve("src"),
      "@": resolve("src"),
      components: resolve("src/components"),
    },
    // 如果用户引入模块时不带扩展名，就会按照extensions从左到右加上去试着解析
    extensions: [".ts", "..."], // ...代表默认设置 = ['.js', '.json', '.wasm']
    //告诉webpack要优先从下面设置的目录查找资源。大大节省时间
    modules: [resolve("src"), "node_modules"],
  },
};

module.exports = (env, argv) => {
  console.log("argv.mode=", argv.mode);
  return config;
};

const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: { filename: "bundle.js", path: path.resolve(__dirname, "dist") },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "img/[name][hash:8].[ext]" },
          },
        ],
      },
    ],
  },
};
