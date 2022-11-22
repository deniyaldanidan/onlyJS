import axios from 'axios';

const baseURL = 'http://localhost:3500';

export const basicApi = axios.create({
    baseURL
})

export const privateApi = axios.create({
    baseURL,
    headers: { 'Content-Type': "application/json" },
    withCredentials: true
})