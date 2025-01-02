import axios from 'axios';
import { SERVER_URL } from '@/constants/server-url';

const axiosInstance = axios.create({
    baseURL: `${SERVER_URL}/api/players`, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;