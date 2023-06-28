let arr = [
  { id: 7, name: "部门5", pid: 6 },
  { id: 5, name: "部门5", pid: 4 },
  { id: 1, name: "部门1", pid: 0 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 6, name: "部门5", pid: 5 },
  { id: 3, name: "部门3", pid: 1 },
];

const arrToTree = (arr, pid) => {
  const result = [];
  arr.forEach((item) => {
    if (item.pid === pid) {
      item.children = arrToTree(arr, item.id);
      result.push(item);
    }
  });
  return result;
};

// console.log(arrToTree(arr, 0));

const arrToTree2 = (arr) => {
  const result = [];
  const itemMap = {};
  for (const item of arr) {
    const { id, pid } = item;
    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      };
    }
    itemMap[id] = {
      ...item,
      children: itemMap[id]["children"],
    };
    const treeItem = itemMap[id];
    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
};

console.log(arrToTree2(arr));
