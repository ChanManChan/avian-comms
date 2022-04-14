import React, { useState, useEffect } from 'react'

import { validateMail } from '../../../shared/utils'
import Input from '../../../shared/components/input/Input'
import Button from '../../../shared/components/button/Button'
import './SendInvitationForm.css'

const SendInvitationForm = ({ open = false }) => {
    const [mail, setMail] = useState('')
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        if (!open) {
            setIsFormValid(false)
            setMail('')
            return
        }
        setIsFormValid(validateMail(mail))
    }, [mail, open])

    const handleSendInvitation = () => {
        console.log(mail)
    }

    return (
        <div className='sendInvitationContainer'>
            <Input placeholder='Enter recipients mail address' value={mail} onChange={setMail} label="Mail Address" />
            <Button text="Send" onClick={handleSendInvitation} disabled={!isFormValid} disabledText="Enter valid email address" />
        </div>
    )
}

export default SendInvitationForm