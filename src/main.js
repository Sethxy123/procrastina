import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 

// Importación de estilos (Bootstrap)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './assets/main.css'

// 1. Crear la instancia de la aplicación
const app = createApp(App)

// 2. Conectar las herramientas (Router)
app.use(router)

// 3. Montar la aplicación en el HTML
app.mount('#app')