import components from '@/components'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index.js'

createApp(App).use(components).use(router).mount('#app')
