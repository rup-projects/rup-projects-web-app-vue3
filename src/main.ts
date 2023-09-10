import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import registerGlobalComponents from './plugins/global-components'
import { router } from './router'
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core CSS
import "primeicons/primeicons.css"; //icons
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);

registerGlobalComponents(app)

app.mount('#app')
