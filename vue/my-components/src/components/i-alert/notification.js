import Alert from './index.vue'
import { createApp } from 'vue'

Alert.newInstance = properties => {
  const props = properties || {}
  const Instance = createApp(Alert, props)
  const alertApp = Instance.mount('body')
  return {
    add: alertApp.add,
    remove: alertApp.remove
  }
}

export default Alert
