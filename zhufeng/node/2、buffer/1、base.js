let buf1 = Buffer.from("a"); // 根据字符串来声明buffer，固定大小
let buf2 = Buffer.from([10, 2, 3, "c"]); // 这种方式一般不采用, 不会这么用
let buf3 = Buffer.alloc(10);
console.log(buf1, buf2, buf3);
