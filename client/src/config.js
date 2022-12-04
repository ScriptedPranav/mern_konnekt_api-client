import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : "https://konnekt-social.onrender.com/api/"
})