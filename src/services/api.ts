import axios from 'axios';

const api = axios.create({
    baseURL: 'http://stopcovidabrasel-com-br.umbler.net/'
});

export default api;