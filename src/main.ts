import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import PrimeVue from 'primevue/config'
import Lara from '@/presets/lara'
import Ripple from 'primevue/ripple';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  unstyled: true, pt: Lara, ripple: true
});
app.directive('ripple', Ripple);
app.mount('#app')
