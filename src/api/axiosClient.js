import axios from "axios";

const axiosClient = axios.create({
        // baseURL: 'http://52.78.45.79',
        baseURL: 'http://127.0.0.1:8000',
        // headers: {apiKey: 'JQ6RRVC-0FA4TVX-P4N57FR-CVM5T4R'},
        timeout: 10000
})

export default axiosClient;