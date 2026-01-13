<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../axios'; // <--- Importamos NUESTRA configuración

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMsg = ref('');

const login = async () => {
    try {
        // ¡Mira qué limpio! Sin headers manuales, sin JSON.stringify
        const response = await api.post('/login', {
            email: email.value,
            password: password.value
        });

        // Guardamos el token
        localStorage.setItem('token', response.data.access_token);
        
        // Guardamos el usuario (opcional, por si quieres mostrar el nombre)
        localStorage.setItem('userName', response.data.user.name);

        alert('¡Bienvenido ' + response.data.user.name + '!');
        
        // Redirigir al Home (aún no existe, pero ya lo haremos)
        router.push('/'); 
        
    } catch (error) {
        console.error(error);
        // Axios guarda el mensaje del servidor en error.response.data
        if (error.response) {
            errorMsg.value = error.response.data.mensaje || 'Credenciales incorrectas';
        } else {
            errorMsg.value = 'Error de conexión con el servidor';
        }
    }
};
</script>

<template>
    <div class="row justify-content-center mt-5">
        <div class="col-md-6 col-lg-4">
            <div class="card shadow">
                <div class="card-header bg-primary text-white text-center">
                    <h3>🔐 Iniciar Sesión</h3>
                </div>
                <div class="card-body">
                    <form @submit.prevent="login">
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input v-model="email" type="email" class="form-control" required placeholder="correo@ejemplo.com">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Contraseña</label>
                            <input v-model="password" type="password" class="form-control" required>
                        </div>
                        
                        <div v-if="errorMsg" class="alert alert-danger">
                            {{ errorMsg }}
                        </div>

                        <button type="submit" class="btn btn-primary w-100">Entrar</button>
                        <button type="submit" class="btn btn-primary w-100">Entrar</button>

<div class="mt-4 text-center">
    <span class="text-muted">¿Nuevo aquí? </span>
    <router-link to="/register" class="fw-bold text-decoration-none" style="color: var(--uno-green)">
        Regístrate Gratis
    </router-link>
</div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>