// 模拟new的过程
function MyNewFn () {
    let newObj = null;
    const constructor = Array.prototype.shift.call(arguments);
    let result = null;
    // 判断是否是函数
    if (typeof constructor !== 'function') {
        throw Error('type error!');
    }
    // 创建对象，绑定构造函数的原型
    newObj = Object.create(constructor.prototype);
    console.log('newObj', newObj);
    // 绑定this，执行构造函数
    result = constructor.apply(newObj, arguments);
    // 判断返回对象
    let flag = result && (typeof result === "object" || typeof result === "function");
    // 判断返回结果
    return flag ? result : newObj;
}

// 执行
function test () {
    this.a = '1111';
    this.b = '2333';
    return this;
}
const theTest = MyNewFn(test)
console.log(theTest);