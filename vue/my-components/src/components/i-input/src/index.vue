<template>
  <input
    type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const currentValue = ref('')
    const handleInput = () => {}
    const handleBlur = () => {}
    return {
      currentValue,
      handleInput,
      handleBlur
    }
  }
}
</script>

<style></style>
