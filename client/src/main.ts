import './main.css'
import App from './app.vue'
import routes from './routes'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import QrReader from 'vue3-qr-reader'
import VMask from '@devindex/vue-mask'

createApp(App)
    .use(routes)
    .use(VMask)
    .use(QrReader)
    .use(createPinia())
    .mount('#app')