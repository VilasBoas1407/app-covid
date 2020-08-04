import axios from 'axios';

const api = axios.create({
    baseURL: 'http://api-stopcovidabrasel.com.br/'
});

export default api;