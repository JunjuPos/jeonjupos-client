import axios from "axios";

const axiosInstance = async (path) => {
    return axios.create({
        baseURL: 'http://52.78.45.79' + path,
        headers: {apiKey: "7dIVa9SdEw3BVB6qZKBC+67jcznkRCzD79Ejxq47LiM="},
        timeout: 1000
    })
}

export default axiosInstance;