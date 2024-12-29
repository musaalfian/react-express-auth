import axios from 'axios';
import useRefreshToken from './useRefreshToken';

const baseApiUrl =
   import.meta.env.VITE_NODE_ENV === 'development' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL;

const API_CALL = axios.create({
   baseURL: baseApiUrl,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
});

API_CALL.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('myToken');
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => Promise.reject(error)
);

API_CALL.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error?.config;

      // handle infinit loop
      if (originalRequest.url.includes('/refresh-token')) {
         return Promise.reject(error);
      }

      if (error.response?.status === 403 && !originalRequest._retry) {
         originalRequest._retry = true;
         try {
            const { data } = await useRefreshToken();
            localStorage.setItem('myToken', data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return API_CALL(originalRequest);
         } catch (refreshError) {
            console.error('Refresh token failed:', refreshError);
            localStorage.removeItem('myToken');
            return Promise.reject(refreshError);
         }
      }

      return Promise.reject(error);
   }
);

export default API_CALL;
