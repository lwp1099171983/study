var arr = [
  { id: 1, pid: 0, name: "超市" },
  { id: 2, pid: 0, name: "生鲜区" },
  { id: 3, pid: 1, name: "零食区" },
  { id: 4, pid: 2, name: "大虾" },
  { id: 5, pid: 2, name: "猪肉" },
  { id: 6, pid: 13, name: "卫生纸" },
  { id: 7, pid: 3, name: "薯片" },
  { id: 8, pid: 7, name: "烧烤味" },
  { id: 9, pid: 7, name: "黄瓜味" },
];

function recurrenceFilter(arr, pid) {
  let data = [];
  arr.forEach((item) => {
    if (item.pid === pid) {
      item.children = recurrenceFilter(arr, item.id);
      data.push(item);
    }
  });
  return data;
}

// console.log(recurrenceFilter(arr, 0));

function arrToTree(arr) {
  let result = [];
  const itemMap = {};

  for (const item of arr) {
    const { id, pid } = item;

    if (!itemMap[id]) {
      itemMap[id] = {};
    }

    if (pid === 0) {
      result.push(treeItem);
    } else {
    }
  }
}
