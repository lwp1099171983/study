import IForm from './i-form'
import IFormItem from './i-form-item'
import IInput from './i-input'

export default {
  install(app) {
    app.component('IForm', IForm)
    app.component('IFormItem', IFormItem)
    app.component('IInput', IInput)
  }
}
