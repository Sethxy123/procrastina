import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue' 
import { createRouter, createWebHashHistory } from 'vue-router'// <--- 1. IMPORTAR

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView }, // <--- 2. AGREGAR ESTA LÍNEA
    { 
      path: '/', 
      name: 'home', 
      component: HomeView,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('token')) next('/login');
        else next();
      }
    }
  ]
})

export default router