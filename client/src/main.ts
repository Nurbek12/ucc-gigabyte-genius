import './main.css'
import App from './app.vue'
import routes from './routes'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VMask from '@devindex/vue-mask'

createApp(App)
    .use(routes)
    .use(VMask)
    .use(createPinia())
    .mount('#app')