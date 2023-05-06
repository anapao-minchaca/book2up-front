import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backend-b2up.onrender.com/'
});

instance.interceptors.request.use(
    async (config) => {
        const token = JSON.parse(window.localStorage.getItem('token'));
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;
