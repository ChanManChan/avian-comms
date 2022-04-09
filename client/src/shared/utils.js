export const generateUUID = characters => {
    const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ'
    const uuid = []
    for (let i = 0; i < characters; i++) {
        uuid.push(str[Math.floor(Math.random() * str.length)])
    }
    return uuid.join('')
}

export const entityToChar = text => {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = text
    return textarea.value
}

export const validateLoginForm = (email, password) => {
    const isMailValid = validateMail(email)
    const isPasswordValid = validatePassword(password)
    return isMailValid && isPasswordValid
}

export const validateRegisterForm = (email, password, username) => {
    const isMailValid = validateMail(email)
    const isPasswordValid = validatePassword(password)
    const isUsernameValid = validateUsername(username)
    return isMailValid && isPasswordValid && isUsernameValid
}

const validateMail = email => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
const validatePassword = ({ length }) => length >= 6 && length <= 12
const validateUsername = ({ length }) => length >= 3 && length <= 12

export const logout = () => {
    localStorage.clear()
    window.location.href = '/login'
}