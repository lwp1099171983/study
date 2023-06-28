import "@/main.css";
import "@/sass.scss"; // 引入 Sass 文件
import logo from "../public/A11535439.png";

const a = "Hello webpack";
console.log(a);

const img = new Image();
img.src = logo;

document.getElementById("imgBox").appendChild(img);

class Author {
  name = "ITEM";
  age = 18;
  email = "lxp_work@163.com";

  info = () => {
    return {
      name: this.name,
      age: this.age,
      email: this.email,
    };
  };
}

module.exports = Author;
