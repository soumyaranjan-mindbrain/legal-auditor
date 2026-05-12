import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005/api',
    withCredentials: true,
});

// Request interceptor to attach token from localStorage
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors and token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL || 'http://localhost:5005/api'}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    // Retry the original request with the new token
                    originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error('Refresh token failed', refreshError);
                // Clear local token
                localStorage.removeItem('token');
                
                // Only redirect if NOT already on login page to avoid infinite loops
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
