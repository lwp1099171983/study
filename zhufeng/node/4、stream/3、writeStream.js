const fs = require("fs");
const path = require("path");

const ws = fs.createWriteStream(path.resolve(__dirname, "2.txt"), {
  flags: "w",
  highWaterMark: 3,
  start: 0,
});

let f1 = ws.write("ok", () => {
  console.log("success");
});
console.log("f1", f1);
let f2 = ws.write("ok", () => {
  console.log("success");
});
console.log("f2", f2);
let f3 = ws.write("ok", () => {
  console.log("success");
});
console.log("f3", f3);
