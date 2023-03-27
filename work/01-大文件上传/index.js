import { createFile, uploadFile, merge } from "./upload";

let input = document.getElementById("input");
let upload = document.getElementById("upload");
let files = {};
let chunkList = [];

// 获取文件
input.addEventListener("change", (e) => {
  files = e.target.files[0];
  chunkList = createFile(files);
  console.log(chunkList);
});

// 文件上传
upload.addEventListener("click", async () => {
  const uploadList = chunkList.map(({ file }, index) => ({
    file,
    size: file.size,
    percent: 0,
    chunkName: `${files.name}-${index}`,
    fileName: files.name,
    index,
  }));
  //发请求，调用函数
  await uploadFile(uploadList);
  merge(files.size, files.name)
});
