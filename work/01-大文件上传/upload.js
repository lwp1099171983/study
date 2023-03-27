function createFile(file, size = 5 * 1024 * 1024) {
  let chunkList = [];
  let cur = 0;
  while (cur < file.size) {
    chunkList.push({
      file: file.slice(cur, cur + size),
    });
    cur += size;
  }
  return chunkList;
}

// 处理数据
async function uploadFile(list) {
  const requestList = list
    .map(({ file, fileName, size, chunkName }) => {
      const formData = new FormData();
      formData.append("file", file); //该文件
      formData.append("fileName", fileName); //文件名
      formData.append("chunkName", chunkName); //切片名
      return { formData, index };
    })
    .map(({ formData, index }) =>
      axiosRequest({
        method: "post",
        url: "http://localhost:3000/upload", //请求接口，要与后端一一一对应
        data: formData,
      }).then((res) => {
        console.log(res); //显示每个切片上传进度
        let p = document.createElement("p");
        p.innerHTML = `${list[index].chunkName}--${res.data.message}`;
        document.getElementById("progress").appendChild(p);
      })
    );

  await Promise.all(requestList);
}

// 请求函数
function axiosRequest({ method = "post", url, data }) {
  return new Promise((resolve, reject) => {
    const config = {
      //设置请求头
      headers: "Content-Type:application/x-www-form-urlencoded",
    };
    //默认是post请求，可更改
    axios[method](url, data, config).then((res) => {
      resolve(res);
    });
  });
}

// 通知后端去做切片合并
function merge(size, fileName) {
  axiosRequest({
    method: "post",
    url: "http://localhost:3000/merge", //后端合并请求
    data: JSON.stringify({
      size,
      fileName,
    }),
  });
}

export default {
    createFile,
    uploadFile,
    axiosRequest,
    merge
}