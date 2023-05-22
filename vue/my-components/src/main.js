import components from '@/components'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index.js'
import Alert from './components/i-alert/index'

const app = createApp(App)

app.use(components).use(router)

app.config.globalProperties.$Alert = Alert

app.mount('#app')
