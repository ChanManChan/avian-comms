import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import './Auth.css'
import AuthContainer from '../../shared/components/authContainer/AuthContainer'
import Input from '../../shared/components/input/Input'
import Button from '../../shared/components/button/Button'
import Link from '../../shared/components/link/Link'
import { validateLoginForm, entityToChar } from '../../shared/utils'
import { getActions } from '../../store/actions/auth'

const LoginPage = ({ login }) => {
    const navigate = useNavigate()
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [isFormValid, setIsFormValid] = useState(false)
    
    useEffect(() => {
        setIsFormValid(validateLoginForm(mail, password))
    }, [mail, password])

    const handleLogin = () => {
        const userDetails = { mail, password }
        login(userDetails, navigate)
    }

    return (
        <AuthContainer>
            <h2>Login</h2>
            <div className='inputFormFields'>
                <Input value={mail} onChange={setMail} placeholder="Enter your email here" label='Mail address' />
                <Input value={password} onChange={setPassword} placeholder="Enter your password here" label='Password' type='password' />
            </div>
            <div className='loginFooter'>
                <p>Need an account? <Link text="Create an account" onClick={() => navigate('/register')} /></p>
                <Button 
                 text="Login" 
                 onClick={handleLogin} 
                 disabled={!isFormValid} 
                 disabledText={entityToChar("Login functionality is disabled due to: &#10;1> Incorrect email address format &#10;2> Invalid password length (must be between 6-12 characters)")} />
            </div>
        </AuthContainer>
    )
}

const mapActionsToProps = dispatch => ({
    ...getActions(dispatch)
})

export default connect(null, mapActionsToProps)(LoginPage)