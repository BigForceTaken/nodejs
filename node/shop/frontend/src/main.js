import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import axios from 'axios'
import router from './router.js'

const app = createApp(App)

app.provide('$axios', axios)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
