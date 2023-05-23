<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, provide, watch, inject } from 'vue'
import { checkBoxGroupKey } from './constance'
import { formItemContextKey } from '../i-form/constance'

const formItemContext = inject(formItemContextKey)
const currentValue = ref('')
const childrens = reactive([])
const emits = defineEmits(['on-change'])
const props = defineProps({
  value: {
    type: Array,
    default() {
      return []
    }
  }
})

const updateModel = update => {
  if (childrens?.length) {
    childrens.forEach(child => {
      child.model = props.value
      if (update) {
        child.currentValue = props.value.indexOf(child.label) >= 0
        child.group = true
      }
    })
  }
}

const change = data => {
  currentValue.value = data
  emits('input', data)
  emits('on-change', data)
  formItemContext?.onFormChange && formItemContext.onFormChange(data)
}

const onCheckBoxAdd = item => {
  if (item) childrens.push(item)
}

const onCheckBoxRemove = () => {}

watch(
  () => props.value,
  () => {
    updateModel(true)
  }
)

onMounted(() => {
  updateModel(true)
})

provide(
  checkBoxGroupKey,
  reactive({
    onCheckBoxAdd,
    onCheckBoxRemove,
    updateModel,
    change
  })
)
</script>
