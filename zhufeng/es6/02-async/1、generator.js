//

// “元编程”————改变js本身的功能: [Symbol.xxxx]
let obj = {
  get [Symbol.toStringTag]() {
    return '2333'
  }
}
console.log(Object.prototype.toString.call(obj))

// 例子： 类数组 转成 数组
const likeArray = {
  // [Symbol.iterator]就是告诉浏览器如何迭代
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4,
  // [Symbol.iterator]() {
  //   // 此方法返回一个迭代器
  //   let i = 0
  //   return {
  //     next: () => {
  //       return {
  //         value: this[i],
  //         done: this.length === i++
  //       }
  //     }
  //   }
  // }
  [Symbol.iterator]: function* () {
    let i = 0
    let len = this.length
    while (len !== i) {
      yield this[i++]
    }
  }
}

let arr = [...likeArray]
console.log(arr)
