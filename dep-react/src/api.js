import axios from 'axios';

// Crear la instancia de axios
// const api = axios.create({
//   baseURL: 'http://localhost:8092/api'
// });

//export const base = 'http://192.168.1.1:8092';
//export const base = 'http://172.22.80.1:8092';
//export const base = 'http://192.168.4.34';
export const base = 'http://168.176.155.32';
//export const base = 'http://192.168.1.24';


const api = axios.create({
  baseURL: base + '/api'
});



// Interceptor para añadir el token a las solicitudes no GET
api.interceptors.request.use(
  (config) => {
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');
    
    // Si el token existe y la solicitud no es de tipo GET, añadirlo a los encabezados de autorización
    if (token && config.method !== 'get') {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
// Exportar las funciones que utilizan la instancia de axios

export const getDocentes = () => api.get('/docentes');
export const getModeloPermisos = () => api.get('/modeloPermisos');
export const createPermiso = (permiso) => api.post('/permisos', permiso);
export const createPermisoConModeloDocente = (docenteId, modeloId, permiso) => api.post(`/permisos/nuevoPermiso/${docenteId}/${modeloId}`, permiso);
