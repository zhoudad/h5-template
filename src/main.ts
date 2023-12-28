import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import './app.css'
import 'tdesign-mobile-vue/dist/reset.css';
import 'tdesign-mobile-vue/es/style/index.css';
import '@/styles/theme.css'

import router from './router';

const app = createApp(App)
const pinia = createPinia()
app
    .use(router)
    .use(pinia)


app.mount('#app')