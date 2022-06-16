import axios from 'axios';

const peopleApi = axios.create({
    baseURL: 'http://localhost:3501/peoples/'
})

export default peopleApi;