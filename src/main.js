import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '@formkit/themes/genesis'
import './assets/style.css'
import { plugin, defaultConfig } from '@formkit/vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faUserSecret,
	faArrowTrendDown,
	faArrowTrendUp,
	faArrowUp,
	faArrowDown,
	faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
library.add(
	faUserSecret,
	faArrowTrendDown,
	faArrowTrendUp,
	faArrowDown,
	faArrowUp,
	faCircleXmark,
);


import App from './App.vue'
const app = createApp(App)
app.use(Toast)
.use(plugin, defaultConfig)
.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

// createApp(App).mount('#app')
