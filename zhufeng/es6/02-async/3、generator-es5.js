// const genTest = function* (x) {
//   const y1 = yield x + 1
//   console.log('y1', y1)
//   const y2 = yield x + 2
//   console.log('y2', y2)
//   return x + 3
// }

// co————执行generator
const regeneratorRuntime = {
  mark(it) {
    return it;
  },
  // 生成迭代器
  wrap(iteratorFn) {
    const _context = {
      next: 0, // 上下文走向的状态码
      sent: null,
      done: false,
      stop() {
        _context.done = true;
      },
      abrupt(type, val) {
        switch (type) {
          case "return":
            this.stop();
            return val;
          default:
            return "test";
        }
      },
    };

    // 返回迭代器
    return {
      next(v) {
        // 记录上一个next的参数， 记录到sent
        _context.sent = v;
        const value = iteratorFn(_context);
        return {
          value,
          done: _context.done,
        };
      },
    };
  },
};

// es5
const genTest = regeneratorRuntime.mark(function genTest(x) {
  var y1, y2;
  return regeneratorRuntime.wrap(function genTest$(_context) {
    // 状态机
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2;
          return x + 1;

        case 2:
          y1 = _context.sent;

          console.log("y1", y1);
          _context.next = 6;
          return x + 2;

        case 6:
          y2 = _context.sent;

          console.log("y2", y2);
          return _context.abrupt("return", x + 3);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, genTest);
});

const gen = genTest(1);

const res1 = gen.next();
// next传参，给上一个yield结果赋值
const res2 = gen.next(res1);
const res3 = gen.next(res2);

console.log(res1, res2, res3);
