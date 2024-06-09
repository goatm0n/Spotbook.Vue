import "bootstrap/dist/css/bootstrap.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import AdminApp from './PublicApp.vue'
import router from './router'
import { startup } from '@/appshell'

startup().then(() => {
    const app = createApp(AdminApp)

    app.use(createPinia())
    app.use(router)


    app.mount('#app')
});

