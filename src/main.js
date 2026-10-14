import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/main.css'
import 'aos/dist/aos.css'
import AOS from 'aos'
import App from './App.vue'

AOS.init({
	duration: 700,
	easing: 'ease-out-cubic',
	once: true,
	offset: 60,
	disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
})

router.afterEach(() => {
	window.requestAnimationFrame(() => AOS.refresh())
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
