import axios, { AxiosInstance } from "axios";

const taskApi:AxiosInstance = axios.create({
    baseURL: "http://localhost:3500/tasks",
    headers: {
        'Content-Type': "application/json"
    }
})

export default taskApi;