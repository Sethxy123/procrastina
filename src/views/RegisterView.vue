<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../axios'; 

const router = useRouter();
const form = ref({ name: '', email: '', password: '' });
const errorMsg = ref('');

const register = async () => {
    try {
        // Enviamos los datos a Laravel
        const response = await api.post('/register', form.value);

        // ¡Truco Pro! Laravel devuelve el token al registrarse.
        // Lo guardamos de una vez para loguearlos automáticamente.
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('userName', response.data.user.name);

        alert('¡Bienvenido a la comunidad, ' + response.data.user.name + '!');
        router.push('/'); // Los mandamos directo al Muro
        
    } catch (error) {
        if (error.response && error.response.data.errors) {
            // Si Laravel nos dice qué campo falló (ej: email repetido)
            errorMsg.value = Object.values(error.response.data.errors).flat().join(', ');
        } else {
            errorMsg.value = 'Error al registrarse. Intenta con otro correo.';
        }
    }
};
</script>

<template>
    <div class="row justify-content-center mt-5">
        <div class="col-md-6 col-lg-4">
            <div class="card shadow p-4">
                <div class="text-center mb-4">
                    <h3 class="fw-bold" style="color: var(--uno-yellow)">🚀 Únete al Club</h3>
                    <p class="text-muted">Crea tu cuenta en segundos</p>
                </div>
                
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label class="form-label text-white">Nombre de Usuario</label>
                        <input v-model="form.name" type="text" class="form-control" placeholder="Ej: El Vengador Flojo" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white">Email</label>
                        <input v-model="form.email" type="email" class="form-control" placeholder="correo@ejemplo.com" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-white">Contraseña</label>
                        <input v-model="form.password" type="password" class="form-control" placeholder="Mínimo 8 caracteres" required>
                    </div>
                    
                    <div v-if="errorMsg" class="alert alert-danger text-center">
                        {{ errorMsg }}
                    </div>

                    <button type="submit" class="btn btn-primary w-100 mb-3">
                        CREAR CUENTA
                    </button>

                    <div class="text-center">
                        <span class="text-muted">¿Ya tienes cuenta? </span>
                        <router-link to="/login" class="text-decoration-none fw-bold" style="color: var(--uno-blue)">
                            Inicia Sesión
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>