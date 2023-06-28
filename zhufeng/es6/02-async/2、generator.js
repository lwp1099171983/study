// const genTest = function* () {
//   const y1 = yield "hello";
//   console.log("y1", y1);
//   const y2 = yield "world";
//   console.log("y2", y2);
//   return "2333";
// };
// const gen = genTest();
// const res1 = gen.next();
// // next传参，给上一个yield结果赋值
// const res2 = gen.next("2333");
// const res3 = gen.next("6666");
// console.log(res1, res2, res3);

const fs = require("fs/promises");
const path = require("path");
function* redFile() {
  const data1 = yield fs.readFile(path.resolve(__dirname, "a.txt"), "utf8");
  const data2 = yield fs.readFile(path.resolve(__dirname, data1), "utf8");
  return data2;
}
const it = redFile();
console.log(it);
const { value, done } = it.next();
value.then((data1) => {
  const { value, done } = it.next(data1);
  value.then((data2) => {
    const { value, done } = it.next(data2);
    console.log("data2", value);
  });
});

// function co(it) {
//   return new Promise((resolve, reject) => {
//     const step = (preYieldVal) => {
//       console.log("preYieldVal", preYieldVal);
//       const { value, done } = it.next(preYieldVal);
//       if (!done) {
//         Promise.resolve(value).then((res) => {
//           step(res);
//         });
//       } else {
//         resolve(value);
//       }
//     };
//     step(it);
//   });
// }
// co(redFile()).then((data) => {
//   console.log("data", data);
// });
