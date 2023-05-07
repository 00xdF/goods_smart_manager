import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 新增此行
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import global from './utils/global'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
app.config.globalProperties.$global = global
app.use(router).use(ElementPlus).mount('#app')

//将所有的icon组件添加
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
