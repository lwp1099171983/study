const sleep = (action) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(action);
      resolve(action);
    }, 2000);
  });
};

const asyncPool = async ({ limit = 2, items }) => {
  const promises = [];
  const pool = new Set();
  for (const item of items) {
    const fn = async (item) => await item();
    const promise = fn(item);
    promises.push(promise);
    pool.add(promise);
    const clean = () => pool.delete(promise);
    promise.then(clean, clean);
    console.log(pool, limit);
    if (pool.size >= limit) {
      await Promise.race(pool);
    }
  }
  return Promise.all(promises);
};

async function start() {
  await asyncPool({
    limit: 2,
    items: [
      () => console("睡觉"),
      () => sleep("吃饭"),
      () => sleep("学习"),
      () => sleep("打游戏"),
      () => sleep("刷b站"),
      () => sleep("写代码"),
      () => sleep("洗漱"),
    ],
  });
  console.log("执行完毕");
}

start();
