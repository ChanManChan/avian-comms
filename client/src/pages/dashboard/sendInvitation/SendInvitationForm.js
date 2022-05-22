import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { validateMail } from '../../../shared/utils'
import Input from '../../../shared/components/input/Input'
import Button from '../../../shared/components/button/Button'
import { getActions } from '../../../store/actions/communication'
import './SendInvitationForm.css'

const SendInvitationForm = ({ open = false, onClose, sendInvitation }) => {
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
        sendInvitation({ recipients: [mail] }, onClose)
    }

    return (
        <div className='sendInvitationContainer'>
            <Input placeholder='Enter recipients mail address' value={mail} onChange={setMail} label="Mail Address" />
            <Button text="Send" onClick={handleSendInvitation} disabled={!isFormValid} disabledText="Enter valid email address" />
        </div>
    )
}

const mapActionsToProps = dispatch => ({ ...getActions(dispatch) })

export default connect(null, mapActionsToProps)(SendInvitationForm)