<template>
  <div class="alert">
    <div v-for="item in notices" :key="item.name" class="alert-main">
      <div class="alert-content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
const notices = reactive([])
const seed = ref(0)

const getUuid = () => 'alert_' + seed.value++

const add = notice => {
  const name = getUuid()
  let _notice = Object.assign(
    {
      name: name
    },
    notice
  )
  notices.push(_notice)
  // 定时移除，单位：秒
  const duration = notice.duration
  setTimeout(() => {
    remove(name)
  }, duration * 1000)
}

const remove = name => {
  for (let i = 0; i < notices.length; i++) {
    if (notices[i].name === name) {
      notices.splice(i, 1)
      break
    }
  }
}
defineExpose({
  add,
  remove
})
</script>

<style scoped>
.alert {
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  text-align: center;
  pointer-events: none;
}
.alert-content {
  display: inline-block;
  padding: 8px 16px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
}
</style>
