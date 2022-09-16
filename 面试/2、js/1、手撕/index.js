const cloneDeep = (obj) => {
    // 判断是不是对象、数组
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    let result;
    // 判断是数组还是对象
    if (obj instanceof Array) {
        // 是数组对象
        result = [];
    } else {
        // 是对象
        result = {}
    }
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const element = obj[key];
            result[key] = cloneDeep(element);
        }
    }
    return result;
}

const testObj = {
    name: 'lwp',
    age: '27',
    stu: {
        s1: 'code',
        s2: 'sing',
        s3: {
            test: '23333'
        }
    }
}

const newObj = cloneDeep(testObj);

console.log('newObj', newObj);