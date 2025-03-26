import axios from 'axios';
import {toast} from "sonner";

const baseURL = import.meta.env.VITE_API_URL || 'https://royal-backend-488976335959.asia-southeast1.run.app';

export const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const currentUrl = window.location.href;
        if (error.response?.status === 401) {
            if (!currentUrl.includes('/login')) {
                localStorage.removeItem('access_token');
                window.location.href = '/login';
                toast.error('Session timeout.');
            }
        }
        return Promise.reject(error);
    }
);