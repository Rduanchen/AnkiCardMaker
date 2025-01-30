// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

import vuetify from './plugins/vuetify'
app.use(vuetify)

app.mount('#app')
