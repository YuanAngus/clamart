import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

// 初始化样式文件
import '@/styles/common.scss'

// 懒加载
import { lazyPlugin } from '@/directives'

// 全局组件
import { componentPlugin } from './components'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')
