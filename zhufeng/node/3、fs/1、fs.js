const fs = require("fs");
const path = require("path");

// 当我们默认读取的时候 读取到的内容就是buffer
/*
fs.readFile(path.resolve(__dirname, "a.json"), "utf8", (err, data) => {
  fs.writeFile(path.resolve(__dirname, "b.json"), data, function (err) {});
});
*/

// 1. err 处理 如果按照这种写法 读取的时候需要处理错误 写入的时候也需要处理错误
// 2. 如果文件非常大怎么办？ 这种方式不适合会淹没可用内存,大文件应该要分批读取
// 3. 希望精确读取做不到 （http 206 响应部分内容    用来实现分片下载）

// --------->流式：可以自己控制读取和写入的速率，可以要求暂停和恢复

// r 读
// w 写
// r+ 能读能写 以读为准 就是读取的文件不存在会报错
// w+ 能写能读 如果文件不存在会创建
// a append追加
let buffer = Buffer.alloc(3);
// fs.open(path.resolve(__dirname, "1.txt"), "r", (err, fd) => {
//   fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead) => {
//     // console.log(buffer);
//     fs.open(path.resolve(__dirname, "2.txt"), "w", (err, fd) => {
//       // 权限符号 2写入  4 读取 1代表的是执行   666  rw-rw-rw  chmod -R 777  rwxrwxrwx
//       fs.write(fd, buffer, 0, bytesRead, 0, (err, written) => {
//         console.log(written);
//       });
//     });
//   });
// });

fs.open(path.resolve(__dirname, "1.txt"), "r", (err, rfd) => {
  fs.open(path.resolve(__dirname, "2.txt"), "w", (err, wfd) => {
    let roffset = 0;
    let woffset = 0;
    function close() {
      fs.close(rfd);
      fs.close(wfd);
    }
    function next() {
      fs.read(rfd, buffer, 0, buffer.length, roffset, (err, bytesRead) => {
        if (bytesRead === 0) return close();
        fs.write(wfd, buffer, 0, bytesRead, woffset, (err, written) => {
          console.log(buffer);
          roffset += bytesRead;
          woffset += bytesRead;
          next();
        });
      });
    }
    next();
  });
});

// 这样做就是读一点 写一点 ， 但是没有能控制速率
// 嵌套太多  将读写分离出来
// 回调层次太多，用户也无法拿到读取的内容

// 解决上述读写，用文件流   ----->   就是将上述方法的读写进行了分离，并且实现了速率控制，解决嵌套问题 （这里用的是发布订阅）  流很重要
