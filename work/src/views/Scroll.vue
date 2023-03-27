<template>
  <Index />
</template>

<script lang="jsx" setup>
import { ref, nextTick } from "vue";
const flag = ref(false);
const list = ref([]);
console.log(list);

// 子组件
const Item = ({ id, waitRender }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
      <img
        src={
          "https://p3-passport.byteimg.com/img/user-avatar/1f319f0ad130fb837df9efd96cca79bd~100x100.awebp"
        }
        width={80}
        height={60}
        alt=""
      />
      列表{id}
    </div>
  );
};

const Index = (props) => {
  console.log("props", props);
  return (
    <div>
      <el-button
        onClick={() => {
          flag.value = true;
          let arr = [];
          console.time();
          for (let i = 0; i < 5000; i++) {
            arr.push(i);
          }
          list.value = arr;
          nextTick(() => {
            console.timeEnd();
          });
        }}
      >
        渲染
      </el-button>
      {flag && list.value.map((item) => <Item id={item} key={item} />)}
    </div>
  );
};
</script>

<style scoped></style>
