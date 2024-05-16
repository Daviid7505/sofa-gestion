import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.min.js'
import '@/assets/bootstrap.min.js'

//import 'bootstrap-icons/font/bootstrap-icons.css'
import 'boxicons'


createApp(App).use(store).use(router).mount('#app')
