console.log(exports === module.exports);
module.exports = "6666";
// 自带的全局参数
// console.log(exports, require, module, __dirname, __filename);

// process对象
// platform：平台     cwd/chdir     env
// console.log(process.env);

console.log(process.argv);
