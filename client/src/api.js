import axios from 'axios'

import { logout } from './shared/utils'

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000
})

apiClient.interceptors.request.use(config => {
    const userDetails = localStorage.getItem("user")
    if (userDetails) {
        const token = JSON.parse(userDetails).token
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, err => Promise.reject(err))

export const login = async data => {
    return await apiClient.post('/auth/login', data).catch(e => ({ error: true, exception: e }))
}

export const register = async data => {
    return await apiClient.post('/auth/register', data).catch(e => ({ error: true, exception: e }))
}

// secure routes
export const sendInvitation = async data => {
    return await apiClient.post('/users/invite', data).catch(e => {
        checkResponseCode(e)
        return { error: true, exception: e }
    })
}

export const invitationAction = async data => {
    return await apiClient.put('/users/invite', data).catch(e => {
        checkResponseCode(e)
        return { error: true, exception: e }
    })
}

export const fetchChatHistory = async ({ senderId, receiverId, pageSize, pageNumber }) => {
    return await apiClient.get('/communications/messages', { params: {
        senderId,
        receiverId,
        pageSize,
        pageNumber
    }})
    .catch(e => {
        checkResponseCode(e)
        return { error: true, exception: e }
    })
}

const checkResponseCode = exception => {
    const responseCode = exception.response.status
    if (responseCode && (responseCode === 401 || responseCode === 403)) {
        logout()
    }
}