<template>
  <div>
    <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">
      {{ label }}
    </label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="i-form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  inject,
  reactive,
  toRefs,
  provide,
  ref,
  computed
} from 'vue'
import { formContextKey, formItemContextKey } from '../i-form/constance'
import AsyncValidator from 'async-validator'
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
    const formContext = inject(formContextKey)
    const validateState = ref('') // 校验状态
    const validateMessage = ref('') // 校验不通过时的提示信息
    const isRequired = ref(false)
    const fieldValue = computed(() => formContext.model[props.prop])
    const initialValue = ref('')

    // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
    const getRules = () => {
      let formRules = formContext.rules
      formRules = formRules ? formRules[props.prop] : []
      return [].concat(formRules || [])
    }

    // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    const getFilteredRule = trigger => {
      const rules = getRules()
      return rules.filter(
        rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      )
    }

    // 校验
    const validate = (trigger = 'blur', callback = () => {}) => {
      let rules = getFilteredRule(trigger)

      if (!rules || rules.length === 0) {
        return true
      }

      // 设置状态为校验中
      validateState.value = 'validating'

      // 以下为 async-validator 库的调用方法
      let descriptor = {}
      descriptor[props.prop] = rules

      const validator = new AsyncValidator(descriptor)
      let model = {}

      model[props.prop] = fieldValue.value

      validator.validate(model, { firstFields: true }, errors => {
        validateState.value = !errors ? 'success' : 'error'
        validateMessage.value = errors ? errors[0].message : ''

        callback(validateMessage.value)
      })
    }

    const resetField = () => {
      validateState.value = ''
      validateMessage.value = ''

      formContext.model[props.prop] = initialValue.value
    }

    const onFormChange = () => {
      console.log('onFormChange')
      validate('change')
    }

    const onFormBlur = () => {
      console.log('onFormBlur')
      validate('blur')
    }

    provide(
      formItemContextKey,
      reactive({
        onFormChange,
        onFormBlur
      })
    )

    onMounted(() => {
      // 设置初始值，以便在重置时恢复默认值
      initialValue.value = fieldValue
      if (props.prop) {
        // 添加当前实例到i-form组件
        formContext.onFormMountedAdd(
          reactive({
            ...toRefs(props),
            validate,
            onFormChange,
            onFormBlur,
            resetField
          })
        )
      }
    })

    return {
      validateState,
      validateMessage,
      isRequired,
      fieldValue
    }
  }
}
</script>

<style></style>
