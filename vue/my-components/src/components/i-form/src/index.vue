<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
import { reactive, provide } from 'vue'
export default {
  name: 'IForm',
  props: {
    model: Object,
    rules: Object
  },
  setup() {
    const fields = reactive([])
    const onFormMountedAdd = field => {
      if (field) fields.push(field)
    }
    const onFormMountedRemove = field => {
      if (field.prop) fields.splice(fields)
    }

    return {
      fields,
      onFormMountedAdd,
      onFormMountedRemove
    }
  }
}
</script>

<style></style>
