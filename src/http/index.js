import axios from 'axios'
import store from '@/store'

const http = axios.create({
    // baseURL: 'https://trainingquizzes.com',
	baseURL: 'http://localhost:8080',
    headers: {
        'Accept': 'application/json',
        'Content': 'application/json'
    }
})

http.interceptors.request.use(function(config) {
    const token = store.state.token
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, function(error) {
    return Promise.reject(error)
})

export default http