import axios from 'axios'

import { logout } from './shared/utils'

const SERVERS = {
    FILE_SERVER: 'http://localhost:8080',
    SOCKET_REST_SERVER: 'http://localhost:5000/api'
}

const setToken = config => {
    const userDetails = localStorage.getItem("user")
    if (userDetails) {
        const token = JSON.parse(userDetails).token
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}

// axios.defaults.headers.common['Authorization'] = fetchToken()

const apiClient = axios.create({
    baseURL: SERVERS.SOCKET_REST_SERVER,
    timeout: 1000
})

const fileServerClient = axios.create({
    baseURL: SERVERS.FILE_SERVER,
    timeout: 1000
})

apiClient.interceptors.request.use(config => setToken(config), err => Promise.reject(err))
fileServerClient.interceptors.request.use(config => setToken(config), err => Promise.reject(err))

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

export const fetchChatHistory = async ({ conversationId, pageSize, pageNumber }) => {
    return await apiClient.get('/communications/messages', { params: { conversationId, pageSize, pageNumber }})
    .catch(e => {
        checkResponseCode(e)
        return { error: true, exception: e }
    })
}

export const updateProfile = async data => {
    return await apiClient.patch('/users/update', data).catch(e => {
        checkResponseCode(e)
        return { error: true, exception: e }
    })
}

export const uploadFiles = async (formData, endpoint) => {
    return await fileServerClient.post(`/${endpoint}`, formData).catch(e => {
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