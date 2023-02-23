// 主要使用on emit off once
// const EventEmitter = require("events");
const EventEmitter = require("./events");

function Girl() {}

Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype);

const girl = new Girl();

const sleep = function (type) {
  console.log("睡觉", type);
};
const drink = function (type) {
  console.log("喝", type);
};

let wating = false;
girl.on("newListener", function (type) {
  //  每次绑定事件的时候 就会执行此方法
  // newListener的回调的调用时机，实在绑定之前触发的
  // console.log("newListener", type);

  if (!wating) {
    process.nextTick(() => {
      girl.emit(type);
      wating = false;
    });
    wating = true;
  }
});

girl.on("失恋", sleep);
girl.on("失恋", drink);

// girl.emit("失恋", "2333");
