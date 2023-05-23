import IForm from './i-form'
import IFormItem from './i-form-item'
import IInput from './i-input'
import ICheckBoxGroup from './i-checkbox-group'
import ICheckBox from './i-checkbox'

export default {
  install(app) {
    app.component('IForm', IForm)
    app.component('IFormItem', IFormItem)
    app.component('IInput', IInput)
    app.component('ICheckBoxGroup', ICheckBoxGroup)
    app.component('ICheckBox', ICheckBox)
  }
}
