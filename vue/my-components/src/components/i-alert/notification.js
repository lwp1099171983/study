import Alert from './index.vue'
import { createApp } from 'vue'

Alert.newInstance = properties => {
  // 创建节点
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)

  const props = properties || {}
  const Instance = createApp(Alert, props)
  const alertApp = Instance.mount(mountNode)
  return {
    add: alertApp.add,
    remove: alertApp.remove
  }
}

export default Alert
