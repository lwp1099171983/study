<template>
  <div>
    <div>2333</div>
    <i-form ref="form" :model="formValidate" :rules="ruleValidate">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name" />
      </i-form-item>
      <i-form-item label="邮箱" prop="mail">
        <i-input v-model="formValidate.mail" />
      </i-form-item>
    </i-form>
    <button @click="handleSubmit">提交</button>
  </div>
</template>
<script>
import { reactive, ref, watchEffect } from 'vue'
// import IForm from '../components/i-form'
// import IFormItem from '../components/i-form-item'
// import IInput from '../components/i-input'
export default {
  // components: {
  //   IForm,
  //   IFormItem,
  //   IInput
  // },
  setup() {
    const form = ref()

    const formValidate = reactive({
      name: '',
      mail: ''
    })
    const ruleValidate = reactive({
      name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
      mail: [
        { required: true, message: '邮箱不能为空', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
      ]
    })

    const handleSubmit = () => {
      form.value?.validate(valid => {
        if (valid) {
          window.alert('提交成功')
        } else {
          window.alert('表单校验失败')
        }
      })
    }

    watchEffect(() => {
      console.log('formValidate', formValidate)
    })

    return {
      formValidate,
      ruleValidate,
      handleSubmit,
      form
    }
  }
}
</script>
