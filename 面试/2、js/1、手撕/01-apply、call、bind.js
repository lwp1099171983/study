Function.prototype.myCall = function (self, ...args) {
    if (!(self instanceof Object)) {55555555555555555
        throw Error('type Error');
    }
    const content = self || window;
    content.fn = this;
    content.fn(...args);
    delete content.fn;
}

Function.prototype.myApply = function (self, arr) {
    if (!(self instanceof Object)) {
        throw Error('type Error');
    }
    const content = self || window;
    content.fn = this;
    content.fn(...arr);
    delete content.fn;
}

Function.myBind = function (self, ...args) {
    if (!(self instanceof Object)) {
        throw Error('type Error');
    }
    const fn = this;
    return function () {
        fn.apply(self, args);
    }
}


function test (a, b, c) {
    console.log('this.name', this.name);
    console.log('abc', `${a}_${b}_${c}`);
}

// test.myCall({ name: '2333' }, 1, 2, 3)
// test.myApply({ name: '2333' }, [1, 2, 3])

const testBind = test.myBind({ name: '2333' }, 1, 3, 5);
testBind();