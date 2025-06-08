import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance with base configuration
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor for logging
axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Request:', {
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data
        });
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for logging
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response:', {
            status: response.status,
            data: response.data,
            headers: response.headers
        });
        return response;
    },
    (error) => {
        console.error('Response Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        return Promise.reject(error);
    }
);

export const handleApiError = (error: any) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Only remove token if it's not a login request
        if (!error.config?.url?.includes('/auth/login')) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        return;
    }
    throw error;
};

export const fetchWithAuth = async (endpoint: string, options: any = {}) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        window.location.href = '/';
        return;
    }

    try {
        const response = await axiosInstance({
            url: endpoint,
            method: options.method || 'GET',
            data: options.body,
            headers: {
                'Authorization': `Bearer ${token}`,
                ...options.headers
            }
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            // Only remove token if it's not a login request
            if (!error.config?.url?.includes('/auth/login')) {
                localStorage.removeItem('token');
                window.location.href = '/';
            }
            return;
        }
        throw error;
    }
};

export const fetchWithoutAuth = async (endpoint: string, options: any = {}) => {
    try {
        const response = await axiosInstance({
            url: endpoint,
            method: options.method || 'GET',
            data: options.body,
            headers: options.headers
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Something went wrong');
        }
        throw error;
    }
}; 