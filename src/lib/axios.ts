import axios from 'axios';
import { signOut } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de respuestas
api.interceptors.response.use(
  // Si la respuesta es exitosa (2xx), simplemente la retornamos
  (response) => response,
  // Si hay un error en la respuesta
  async (error) => {
    // Verificamos si el error es por un token vencido (401)
    if (error.response && error.response.status === 401) {
      // Cerramos la sesión del usuario y lo redirigimos al login
      await signOut({ redirect: true, callbackUrl: '/login' });
    }
    // Rechazamos la promesa para que el error pueda ser manejado por el .catch() de la llamada original
    return Promise.reject(error);
  }
);

export default api;

