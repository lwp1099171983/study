const EventEmitter = require("events");
const fs = require("fs");

class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    const { flags, start, end, highWaterMark } = options;
    this.path = path;
    this.flags = flags || "r";
    this.start = start || 0;
    this.end = end || 0;
    this.highWaterMark = highWaterMark || 64 * 1024;

    this.offset = this.start;

    // 打开文件
    this.open();

    // 2.需要等待用户监听了data事件后再发射
    this.flowing = false;
    this.on("newListener", (event) => {
      console.log("newListener", event);
      if (event === "data" && !this.flowing) {
        this.flowing = true;
        this.read();
      }
    });
  }

  read() {
    // 保证文件打开
    if (typeof this.fd !== "number") {
      // 文件还没打开
      return this.once("open", () => this.read());
    }
    const buffer = Buffer.alloc(this.highWaterMark);
    fs.read(
      this.fd,
      buffer,
      0,
      buffer.length,
      this.offset,
      (err, bytesRead) => {
        if (bytesRead) {
          this.offset += bytesRead;
          this.emit("data", buffer.slice(0, bytesRead));
          if (this.flowing) this.read();
        } else {
          this.emit("end");
          this.destroy();
        }
      }
    );
  }

  open() {
    fs.open(this.path, (err, fd) => {
      if (err) return this.destroy("error", err);
      console.log("opened");
      this.fd = fd;
      this.emit("open", fd);
    });
  }

  destroy(err) {
    if (err) {
      this.emit("error", err);
    }
    if (typeof this.fd === "number") {
      fs.close(this.fd, () => this.emit("close"));
    }
  }
  pause() {
    this.flowing = false;
  }
  resume() {
    if (!this.flowing) {
      this.read();
    }
  }
  pipe(ws) {
    this.on("data", (chunk) => {
      let flag = ws.write(chunk);
      if (!flag) this.pause();
    });

    ws.on("drain", () => {
      this.resume();
    });
  }
}

module.exports = ReadStream;
