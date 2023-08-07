async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
  setTimeout(() => {
    console.log("timer1");
  }, 0);
}
async function async2() {
  setTimeout(() => {
    console.log("timer2");
  }, 0);
  console.log("async2");
}
async1();
setTimeout(() => {
  console.log("timer3");
}, 0);
console.log("start");

function testFn() {
  console.log("这是一个方法");
}

/**
async function async1() {
  console.log("1");
  console.log(await async2());
  console.log("2");
}
async function async2() {
  console.log("3");
  setTimeout(() => console.log("4"), 0);
  console.log("5");
}
console.log("6");
setTimeout(function () {
  console.log("7");
}, 0);
async1();
new Promise(function (resolve) {
  console.log("8");
  resolve();
}).then(function () {
  console.log("9");
});
console.log("10");
**/
