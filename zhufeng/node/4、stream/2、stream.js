// 可读流

const fs = require("fs");
const path = require("path");
const ReadStream = require("./readStream");

const rs = fs.createReadStream(path.resolve(__dirname, "1.txt"), {
  // const rs = new ReadStream(path.resolve(__dirname, "1.txt"), {
  // flags: "r",
  highWaterMark: 3,
  // start: 1,
  // end: 5,
});

rs.on("open", (fd) => {
  console.log("open", fd);
});

let arr = [];
rs.on("data", (chunk) => {
  arr.push(chunk);
  console.log("data", chunk);
});

rs.on("end", () => {
  console.log("end", Buffer.concat(arr).toString());
});

rs.on("error", () => {
  console.log("error");
});

rs.on("close", () => {
  console.log("error");
});

// 1.内部就是创建了一个可读流 ：  new ReadStream
// 2. 内部会对用户的属性 进行格式化
// 3.Readble.apply(this,options) Reflect.apply
// 4.我们要自己实现一个读流，必须要继承Readble接口
// 5.maybeReadMore -> Readable.read方法 -> ReadStream._read
// 6.用户会将读取到的结果 调用父类的push传入， 内部会自动emit数据
// const { Readable } = require("stream");
// class MyReadStream extends Readable {
//   constructor() {
//     super();
//     this.i = 0;
//   }
//   _read() {
//     // 这里的实现可以是fs的实现也可以是自己的，
//     if (this.i === 10) {
//       this.push(null);
//     } else {
//       this.push(this.i++ + "");
//     }
//   }
// }
// let mrs = new MyReadStream();
// mrs.on("data", function (data) {
//   console.log(data);
// });
// mrs.on("end", function () {
//   console.log("end");
// });

// 以后再看到 on('data')  on('end') 就是可读流
