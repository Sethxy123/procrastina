import axios from 'axios';

const api = axios.create({
    baseURL: 'https://unwhipt-wilford-transcontinentally.ngrok-free.dev/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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