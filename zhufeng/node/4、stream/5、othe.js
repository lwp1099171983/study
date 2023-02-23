// process.stdin.on("data", (chunk) => {
//   // console.log(chunk.toString());
//   process.stdout.write(chunk.toString());
// });

const crypto = require("crypto");
const { Transform } = require("stream");

// 摘要算法  特点 1）不可逆 2）不同的内容摘要的结果不同 3）不同的内容摘要的结果长度相同 4）相同的内容摘要相同
const c1 = crypto.createHash("md5").update("2333").digest("base64");
// console.log(c1);

class MyTransform extends Transform {
  _transform(chunk, encoding, clearBuffer) {
    const r = crypto.createHash("md5").update(chunk).digest("base64");
    this.push(r);
    clearBuffer();
  }
}

const myTransFrom = new MyTransform();

process.stdin.pipe(myTransFrom).pipe(process.stdout);
