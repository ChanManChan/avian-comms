import * as api from '../../api'

export const AUTH_ACTIONS = {
    SET_USER_DETAILS: 'AUTH.SET_USER_DETAILS'
}

export const getActions = dispatch => {
    return {
        login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
        register: (userDetails, navigate) => dispatch(register(userDetails, navigate))
    }
}

const setUserDetails = userDetails => {
    return {
        type: AUTH_ACTIONS.SET_USER_DETAILS,
        userDetails
    }
}

const login = (userDetails, navigate) => async dispatch => {
    const response = await api.login(userDetails)
    if (response.error) {

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

    } else {
        const userDetails = response.data
        localStorage.setItem('user', JSON.stringify(userDetails))
        dispatch(setUserDetails(userDetails))
        navigate('/dashboard')
    }
}