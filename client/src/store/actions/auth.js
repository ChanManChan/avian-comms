import * as api from '../../api'
import { showAlertMessage } from './alert'

export const AUTH_ACTIONS = {
    SET_USER_DETAILS: 'AUTH.SET_USER_DETAILS',
    UPDATE_USER_DETAILS: 'AUTH.UPDATE_USER_DETAILS'
}

export const getActions = dispatch => {
    return {
        login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
        register: (userDetails, navigate) => dispatch(register(userDetails, navigate)),
        setUserDetails: userDetails => dispatch(setUserDetails(userDetails)),
        updateProfile: (username, password, file, closeModal) => dispatch(updateProfile(username, password, file, closeModal))
    }
}

const setUserDetails = userDetails => {
    return {
        type: AUTH_ACTIONS.SET_USER_DETAILS,
        userDetails
    }
}

const updateUserData = updatedUserData => {
    return {
        type: AUTH_ACTIONS.UPDATE_USER_DETAILS,
        updatedUserData
    }
}

const login = (userDetails, navigate) => async dispatch => {
    const response = await api.login(userDetails)
    if (response.error) {
        dispatch(showAlertMessage(response.exception.response.data))
    } else {
        const userDetails = response.data
        localStorage.setItem('user', JSON.stringify(userDetails))
        dispatch(setUserDetails(userDetails))
        navigate('/dashboard')
    }
}

const register = (userDetails, navigate) => async dispatch => {
    const response = await api.register(userDetails)
    if (response.error) {
        dispatch(showAlertMessage(response.exception.response.data))
    } else {
        const userDetails = response.data
        localStorage.setItem('user', JSON.stringify(userDetails))
        dispatch(setUserDetails(userDetails))
        navigate('/dashboard')
    }
}

const updateProfile = (username, password, file, closeModal) => async dispatch => {
    let path = ''
    if (file) {
        const formData = new FormData()
        formData.append('file', file)
        const response = await api.uploadFiles(formData, 'profile-picture')
        if (!response.error) {
            path = response.data.path
        }
    }
    const data = {}
    Object.assign(data, username && { username })
    Object.assign(data, password && { password })
    Object.assign(data, path && { profilePicture: path })

    const response = await api.updateProfile(data)
    if (response.error) {
        dispatch(showAlertMessage(response.exception.response.data))
    } else {
        const updatedUserData = response.data
        dispatch(updateUserData(updatedUserData))
        dispatch(showAlertMessage("Profile updated successfully"))
        closeModal()
    }
}