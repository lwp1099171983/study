const path = require("path");

// module.exports = {
//   mode: "development", // 模式
//   entry: "./src/index.js",
//   output: {
//     filename: "lwp.js",
//     path: path.join(__dirname, "dist"),
//   },
// };

// loader：webpack默认识别js、json，loader就是将webpack不认识的变成它认识的

module.exports = {
  mode: "development", // 模式
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      // 转换规则
      {
        test: /\.css$/,
        use: "css-loader",
      },
    ],
  },
};
