const fs = require("fs");
const path = require("path");

const rs = fs.createReadStream(path.resolve(__dirname, "1.txt"), {
  highWaterMark: 4,
});

const ws = fs.createWriteStream(path.resolve(__dirname, "2.txt"), {
  highWaterMark: 1,
});

rs.on("data", (data) => {
  let flag = ws.write(data); // 写入的时候 返回当前是否要继续读取  写入的数量 和 highWaterMark进行比较
  console.log("flag", flag, data);
  if (!flag) rs.pause();
});

rs.on("end", () => {
  console.log("end");
  ws.end();
});

ws.on("drain", () => {
  // 数据写入到文件后 会执行次方法
  console.log("drain");
  rs.resume();
});
