const buf1 = Buffer.from("珠");
const buf2 = Buffer.from("峰");

const bigBuffer = Buffer.alloc(6);

Buffer.prototype.copy = function (
  target,
  targetStart,
  sourceStart = 0,
  sourceEnd = this.length
) {
  for (let i = 0; i < sourceEnd - sourceStart; i++) {
    target[targetStart + i] = this[sourceStart + i];
  }
};

Buffer.prototype.concat = function (arr, len) {
  if (len == undefined) {
    len = arr.reduce((t, c) => t + c.length, 0);
  }
  const buf = Buffer.alloc(len);
  for (let i = 0; i < len; i++) {
    buf[i] = arr[i];
  }
  return buf;
};

// buf1.copy(bigBuffer, 0, 0, 3);
// buf2.copy(bigBuffer, 3, 0, 3);

// console.log(buf1, buf2);
// console.log(bigBuffer);

const buf = Buffer.concat([buf1, buf2]);
console.log(buf);
