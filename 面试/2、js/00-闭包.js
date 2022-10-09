function create() {
    let a = 100;
    return function () {
        console.log(a);
    }
}

const test = create();

const a = 200;

test(); // 输出 100



function print(fn) {
    const b = 200
    fn()
}

const b = 100;

function fn () {
    console.log(b);
}

print(fn); // 100