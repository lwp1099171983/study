<template>
  <div>
    <label>{{ label }}</label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  name: 'IFromItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  setup(props) {
    onMounted(() => {
      if (props.prop) {
        // 添加当前实例到i-form组件
      }
    })
  }
}
</script>

<style></style>
