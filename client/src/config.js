import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : "https://konnekt-social.herokuapp.com/api/"
})