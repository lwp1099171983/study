/*
1、题目描述:实现一个 compose 函数
*/
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}

const compose = (...fns) => {
  if (!fns.length) return (v) => v;
  if (fns.length === 1) return fns[0];
  return fns.reduce(
    (pre, cur) =>
      (...args) =>
        pre(cur(...args))
  );
};

// const a = compose(fn1, fn2, fn3, fn4);
// console.log(a);
// console.log(a(1)); // 1+4+3+2+1=11

/*
2、题目描述:setinterval（带清除器） 用来实现循环定时调用 可能会存在一定的问题 能用 settimeout 解决吗
*/

function mySetinterval(fn, t) {
  let timer = null;
  const interval = () => {
    fn();
    timer = setTimeout(interval, t);
  };
  interval();
  return {
    cancel: () => {
      clearTimeout(timer);
    },
  };
}

// mySetinterval(() => {
//   console.log(2333);
// }, 1000)

/*
3、发布订阅模式
*/

class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(type, callback) {
    if (!this.events[type]) {
      this.events[type] = [callback];
    } else {
      this.events[type].push(callback);
    }
  }
  emit(type, ...args) {
    this.events[type] &&
      this.events[type].forEach((fn) => fn.apply(this, args));
  }
  off(type, callback) {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter((item) => item !== callback);
    }
  }
  once(type, callback) {
    const fn = () => {
      callback();
      this.off(type, callback);
    };
    this.on(type, fn);
  }
}

/**
 * 4 数组去重
 */

const uniqArr = (arr) => {
  return [...new Set(arr)];
};

/**
 * 5 数组扁平化
 * 题目描述:实现一个方法使多维数组变成一维数组
 * console.log(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
 */

const flatter = (arr) => {
  if (!arr.length) return [];
  let result = [];
  for (const item of arr) {
    if (!Array.isArray(item)) {
      result.push(item);
    } else {
      result = [...result, ...flatter(item)];
    }
  }
  return result;
};

// console.log(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));

/**
 *
 * 6 寄生组合继承
 */

/**
 *
 * 7 实现有并行限制的 Promise 调度器
 *
 */

const asyncPool = async ({ limit = 2, items = [] }) => {
  const promiseList = [];
  const maxLoop = new Set();
  for (const item of items) {
    const fn = async (item) => await item();
    const promise = fn(item);
    promiseList.push(promise);
    maxLoop.add(promise);
    const clean = () => maxLoop.delete(promise);
    promise.then(clean, clean);
    if (maxLoop.size >= limit) {
      await Promise.race(maxLoop);
    }
  }
  return Promise.all(promiseList);
};

// 使用
// async function start() {
//   const sleep = (action) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log(action);
//         resolve(action);
//       }, 2000);
//     });
//   };
//   await asyncPool({
//     limit: 2,
//     items: [
//       () => console.log('睡觉'),
//       () => sleep("吃饭"),
//       () => sleep("学习"),
//       () => sleep("打游戏"),
//       () => sleep("刷b站"),
//       () => sleep("写代码"),
//       () => sleep("洗漱"),
//     ],
//   });
//   console.log("执行完毕");
// }

// start();

/**
 *
 * 7 new 操作符
 *
 */

function myNew(constructorFn, ...args) {
  let newObj = Object.create(constructorFn);
  const result = constructorFn.apply(newObj, ...args);
  const flag =
    result && (typeof result === "object" || typeof result === "function");
  return flag ? result : newObj;
}

/**
 * 9 call apply bind
 */
Function.prototype.myCall = function (self, ...args) {
  const content = self || window;
  content.fn = this;
  content.fn(...args);
  delete content.fn;
};
Function.prototype.maApply = function (self, args) {
  const content = self || window;
  content.fn = this;
  content.fn(args);
  delete content.fn;
};
Function.prototype.bind = function (self, ...args) {
  const fn = this;
  return function () {
    this.myCall(self, ...args);
  };
};

/**
 *
 * 10 深拷贝（考虑到复制 Symbol 类型）
 *
 */
const isObject = (obj) => {
  return typeof obj === "object" && obj !== null;
};
const deepClone = (obj) => {
  if (!isObject(obj)) return null;
  let result;
  if (Array.isArray(obj)) {
    result = [];
  } else {
    result = {};
  }
  Reflect.ownKeys(obj).forEach((key) => {
    const element = obj[key];
    if (isObject(element)) {
      result[key] = deepClone(element);
    } else {
      result[key] = element;
    }
  });
  return result;
};

// const test = {
//   a: {
//     b: {
//       c: {
//         d: 23333
//       }
//     },
//     e: {
//       f: 66666
//     }
//   }
// }

// console.dir(deepClone(test))

/**
 *
 * 11 instanceof
 *
 */

function myInstanceof(property, constructor) {
  // console.log(property);
  let result;
  if (property === null) {
    result = false;
  }
  if (property.__proto__ === constructor.prototype) {
    result = true;
  } else {
    result = myInstanceof(property.__proto__, constructor);
  }
  return result;
}

const test = new Array();

console.log(myInstanceof(test, Object));

/**
 *
 * 12 柯里化
 *
 */

/**
 *
 * 13 冒泡排序--时间复杂度 n^2
 *
 */

/**
 *
 * 14 选择排序--时间复杂度 n^2
 *
 */

/**
 *
 * 15 插入排序--时间复杂度 n^2
 *
 */

/**
 *
 * 16 快排--时间复杂度 nlogn~ n^2 之间
 *
 */

/**
 *
 * 17 归并排序--时间复杂度 nlog(n)
 *
 */

/**
 *
 * 18 二分查找--时间复杂度 log2(n)
 *
 */

/**
 *
 *
 * 19 实现 LazyMan
 *
 */
