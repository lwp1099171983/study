<template>
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        v-model="model"
        @change="change"
      />
      <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="change"
      />
    </span>
    <slot></slot>
  </label>
</template>

<script setup>
import { inject, onMounted, reactive, ref, watch } from 'vue'
import { checkBoxGroupKey } from '../i-check-group/constance'
import { formItemContextKey } from '../i-form/constance'

const formItemContext = inject(formItemContextKey)
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Number, Boolean],
    default: false
  },
  trueValue: {
    type: [String, Number, Boolean],
    default: true
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false
  },
  label: {
    type: [String, Number, Boolean]
  }
})
const currentValue = ref(props.value)
const model = reactive([])
const group = ref(false)

const emits = defineEmits(['input'])

const checkBoxGroup = inject(checkBoxGroupKey)

const updateModel = () => {
  currentValue.value = props.value === props.trueValue
}

const change = () => {
  if (props.disabled) {
    return false
  }

  const checked = event.target.checked
  currentValue.value = checked

  const value = checked ? props.trueValue : props.falseValue
  emits('input', value)

  if (group.value) {
    checkBoxGroup.change(model)
  } else {
    emits('on-change', value)
    formItemContext?.onFormChange && formItemContext.onFormChange(value)
  }
}

onMounted(() => {
  if (checkBoxGroup?.checkBoxGrou) {
    group.value = true
    checkBoxGroup.updateModel(true)
  } else {
    updateModel()
  }
})

watch(
  () => props.value,
  val => {
    if (val === props.trueValue || val === props.falseValue) {
      updateModel()
    } else {
      throw 'Value should be trueValue or falseValue.'
    }
  }
)
</script>

<style lang="scss" scoped></style>
