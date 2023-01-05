import axios from 'axios';

export const client1 = axios.create({
    baseURL: "http://localhost:3500",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain'
    },
    timeout: 10 * 1000,
    timeoutErrorMessage: "Connection to server failed",
    withCredentials: true
})