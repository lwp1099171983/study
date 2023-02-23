const a = [1, 2, 3, 4];

// console.log(a, a.slice(1));

console.log(a, a.splice(1, 0, 'a', 'b'))




// const b = { a: 1, b: 2 };
// b.length = 2;
// console.log(Array.from(b), b.length);

// const set = new Set(['foo', 'bar', 'baz', 'foo']); // 去重
// console.log('set', set, Array.from(set));


// const mapper = new Map([['1', 'a'], ['2', 'b']]);
// console.log(mapper.values(), Array.from(mapper.values()));

// var tmp = 'hello world';

// for (var i = 0; i < tmp.length; i++) {
//     console.log(tmp[i]);
// }

// console.log(i); // 11


const t = {
    0:'one',
    1:'two',
    length: 2
};

for (const key in t) {
    console.log(key);
    if (Object.hasOwnProperty.call(t, key)) {
        const element = t[key];
        
    }
}

for (const iterator of t) {
    console.log('iterator', iterator);
}