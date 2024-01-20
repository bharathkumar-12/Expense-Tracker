import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/style.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faArrowTrendDown)


import App from './App.vue'
const app = createApp(App)
app.use(Toast)
.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

// createApp(App).mount('#app')
