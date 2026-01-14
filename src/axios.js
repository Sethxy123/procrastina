import axios from 'axios';

const api = axios.create({
  baseURL: 'https://unwhipt-wilford-transcontinentally.ngrok-free.dev/api', // Tu URL (ya está bien)
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true' // <--- ¡AGREGA ESTA LÍNEA MÁGICA! ✨
  }
});

// Interceptor para agregar el token automáticamente
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;