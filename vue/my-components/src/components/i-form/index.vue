<template>
  <form>
    <slot />
  </form>
</template>

<script>
import { reactive, provide } from 'vue'
import { formContextKey } from './constance'
export default {
  name: 'IForm',
  props: {
    model: Object,
    rules: Object
  },
  setup(props) {
    const fields = reactive([])

    // 收集form-item
    const onFormMountedAdd = field => {
      if (field) fields.push(field)
    }

    // 删除form-item
    const onFormMountedRemove = field => {
      if (field.prop) fields.splice(fields, 1)
    }

    // 公开方法：全部重置数据
    const resetFields = () => {
      fields.value.forEach(field => {
        field.resetField()
      })
    }

    // 公开方法：全部校验数据，支持 Promise
    const validate = callback => {
      return new Promise(resolve => {
        let valid = true
        let count = 0
        fields.forEach(field => {
          field.validate('', errors => {
            if (errors) {
              valid = false
            }
            if (++count === fields.length) {
              // 全部完成
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    }

    provide(
      formContextKey,
      reactive({
        onFormMountedAdd,
        onFormMountedRemove,
        model: props.model,
        rules: props.rules
      })
    )

    return {
      resetFields,
      validate
    }
  }
}
</script>

<style></style>
