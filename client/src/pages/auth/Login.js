import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Auth.css'
import AuthContainer from '../../shared/components/authContainer/AuthContainer'
import Input from '../../shared/components/input/Input'
import Button from '../../shared/components/button/Button'
import Link from '../../shared/components/link/Link'
import { validateLoginForm, entityToChar } from '../../shared/utils'

const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        setIsFormValid(validateLoginForm(email, password))
    }, [email, password])

    return (
        <AuthContainer>
            <div className='inputFormFields'>
                <Input value={email} onChange={setEmail} placeholder="Enter your email here" label='Mail address' />
                <Input value={password} onChange={setPassword} placeholder="Enter your password here" label='Password' type='password' />
            </div>
            <div className='loginFooter'>
                <p>Need an account? <Link text="Create an account" onClick={() => navigate('/register')} /></p>
                <Button 
                 text="Login" 
                 onClick={() => console.log(email, password)} 
                 disabled={!isFormValid} 
                 disabledText={entityToChar("Login functionality is disabled due to: &#10;1> Incorrect email address format &#10;2> Invalid password length (must be between 6-12 characters)")} />
            </div>
        </AuthContainer>
    )
}

export default LoginPage