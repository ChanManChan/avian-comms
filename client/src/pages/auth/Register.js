import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import './Auth.css'
import AuthContainer from '../../shared/components/authContainer/AuthContainer'
import Input from '../../shared/components/input/Input'
import Button from '../../shared/components/button/Button'
import Link from '../../shared/components/link/Link'
import { entityToChar, validateRegisterForm } from '../../shared/utils'
import { getActions } from '../../store/actions/auth'

const RegisterPage = ({ register }) => {
    const navigate = useNavigate()
    const [mail, setMail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        setIsFormValid(validateRegisterForm(mail, password, username))
    }, [mail, password, username])

    const handleRegister = () => {
        const userDetails = { mail, password, username }
        register(userDetails, navigate)
    }

    return (
        <AuthContainer>
            <h2>Register</h2>
            <div className='inputFormFields'>
                <Input value={mail} onChange={setMail} placeholder="Enter your email here" label='Mail address' />
                <Input value={username} onChange={setUsername} placeholder="Enter your username here" label='Username' />      
                <Input value={password} onChange={setPassword} placeholder="Enter your password here" label='Password' type='password' />      
            </div>
            <div className='registerFooter'>
                <p>Already have an account? <Link text="Login instead" onClick={() => navigate('/login')} /></p>
                <Button 
                 text="Register" 
                 onClick={handleRegister} 
                 disabled={!isFormValid} 
                 disabledText={entityToChar("Register functionality is disabled due to: &#10;1> Incorrect email address format &#10;2> Invalid password length (must be between 6-12 characters) &#10;3> Invalid username length (must be between 3-12 characters)")} />
            </div>
        </AuthContainer>
    )
}

const mapActionsToProps = dispatch => ({
    ...getActions(dispatch)
})

export default connect(null, mapActionsToProps)(RegisterPage)