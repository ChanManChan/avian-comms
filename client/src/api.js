import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000
})

export const login = async data => {
    return await apiClient.post('/auth/login', data).catch(e => ({ error: true, exception: e }))
}

export const register = async data => {
    return await apiClient.post('/auth/register', data).catch(e => ({ error: true, exception: e }))
}