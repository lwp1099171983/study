<template>
  <input
    type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
import { ref, defineEmits, inject, watch } from 'vue'
import { formItemContextKey } from '../i-form/constance'
const currentValue = ref(props.value)
const emits = defineEmits(['update:modelValue'])
const formItemContext = inject(formItemContextKey)

watch(
  () => props.modelValue,
  (val, preVal) => {
    console.log('props.modelValue', val, preVal)
    currentValue.value = val
  }
)

const handleInput = event => {
  const inputVal = event.target.value
  currentValue.value = inputVal
  emits('update:modelValue', inputVal)
  formItemContext?.onFormChange && formItemContext.onFormChange(inputVal)
}

const handleBlur = () => {
  formItemContext.onFormBlur(currentValue.value)
}
</script>

<style></style>
