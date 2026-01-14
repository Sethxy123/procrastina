<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../axios'; // Usamos nuestra conexión configurada

const router = useRouter();
const perezas = ref([]);
const ranking = ref([]);
const loading = ref(true);

// Datos para el formulario
const form = ref({
    actividad: '',
    horas: '',
    imagen: null
});

// 1. Cargar Datos al entrar
const cargarDatos = async () => {
    try {
        const [resMuro, resRanking] = await Promise.all([
            api.get('/perezas'),
            api.get('/ranking')
        ]);
        perezas.value = resMuro.data.datos.reverse(); // Lo nuevo arriba
        ranking.value = resRanking.data;
    } catch (error) {
        console.error("Error cargando:", error);
    } finally {
        loading.value = false;
    }
};

// 2. Publicar Nueva Pereza
const publicar = async () => {
    const formData = new FormData();
    formData.append('actividad_ignorada', form.value.actividad);
    formData.append('horas', form.value.horas);
    if (form.value.imagen) {
        formData.append('imagen', form.value.imagen);
    }

    try {
        await api.post('/perezas', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        // Limpiar form y recargar
        form.value = { actividad: '', horas: '', imagen: null };
        document.getElementById('fileInput').value = ''; // Limpiar input file visual
        alert("¡Confesión subida!");
        cargarDatos(); // Refrescar muro sin recargar página
    } catch (error) {
        alert("Error al subir. ¿Estás logueado?");
    }
};

// Capturar el archivo cuando cambia el input
const handleFileUpload = (event) => {
    form.value.imagen = event.target.files[0];
};

// 3. Cerrar Sesión
const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
};

// Arrancar motor al montar componente
onMounted(() => {
    cargarDatos();
});
</script>

<template>
    <div>
        <nav class="navbar navbar-dark bg-primary mb-4 rounded px-3 d-flex justify-content-between">
            <span class="navbar-brand mb-0 h1"> EL face pa´  huevones!!!</span>
            <button @click="logout" class="btn btn-danger btn-sm">Salir</button>
        </nav>

        <div class="row">
            <div class="col-md-8">
                
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Nueva Pereza</h5>
                        <form @submit.prevent="publicar">
                            <div class="row">
                                <div class="col-md-6 mb-2">
                                    <input v-model="form.actividad" type="text" class="form-control" placeholder="¿Qué ignoraste hacer?" required>
                                </div>
                                <div class="col-md-3 mb-2">
                                    <input v-model="form.horas" type="number" class="form-control" placeholder="Horas" required>
                                </div>
                                <div class="col-md-3 mb-2">
                                    <input @change="handleFileUpload" id="fileInput" type="file" class="form-control" accept="image/*">
                                </div>
                            </div>
                            <button type="submit" class="btn btn-success w-100">Publicar Confesión</button>
                        </form>
                    </div>
                </div>

                <div v-if="loading" class="text-center py-5">Cargando perezas...</div>
                
                <div v-else class="d-flex flex-column gap-3">
                    <div v-for="post in perezas" :key="post.id" class="card shadow-sm">
                        <img v-if="post.imagen_url" :src="post.imagen_url" class="card-img-top" style="max-height: 300px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">@{{ post.autor }}</h5>
                            <p class="card-text fs-5">{{ post.actividad_ignorada }}</p>
                            <p class="text-muted small">Perdió <strong>{{ post.horas }} horas</strong></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card shadow sticky-top" style="top: 20px;">
                    <div class="card-header bg-warning fw-bold"> Top Flojos</div>
                    <ul class="list-group list-group-flush">
                        <li v-for="(user, index) in ranking" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                                <span v-if="index === 0"></span>
                                <span v-else class="badge bg-secondary me-2">#{{ index + 1 }}</span>
                                <strong>{{ user.autor }}</strong>
                            </span>
                            <span class="badge bg-primary rounded-pill">{{ user.total_horas }}h</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>