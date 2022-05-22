import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { validateMail } from '../../../shared/utils'
import Input from '../../../shared/components/input/Input'
import Button from '../../../shared/components/button/Button'
import { getActions } from '../../../store/actions/communication'
import Chip from '../../../shared/components/chip/Chip'
import './SendGroupInvitationForm.css'

const SendGroupInvitationForm = ({ open = false, onClose, sendInvitation }) => {
    const [mail, setMail] = useState('')
    const [recipients, setRecipients] = useState([])
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        if (!open) {
            setIsFormValid(false)
            setMail('')
            setRecipients([])
            return
        }
        if (mail === '' && recipients.length > 0) {
            setIsFormValid(true)
            return
        }
        setIsFormValid(validateMail(mail))
    }, [mail, recipients, open])

    const handleSendInvitation = () => {
        sendInvitation({ recipients }, onClose)
    }

    const handleKeyDown = event => {
        if (event.key === "Enter" && isFormValid) {
            setRecipients(x => [...new Set([...x, mail])])
            setMail('')
        }
    }

    const handleChipClose = recipient => {
        setRecipients(x => x.filter(y => y !== recipient))
    }

    return (
        <div className='sendGroupInvitationContainer'>
            <Input placeholder='Add recipients one by one' handleKeyDown={handleKeyDown} value={mail} onChange={setMail} label="Mail Address" />
            <div className='recipientsChipGroup'>
                {recipients.map(recipient => (
                    <Chip key={recipient} text={recipient} handleClose={() => handleChipClose(recipient)} />
                ))}
            </div>
            <Button text="Send" onClick={handleSendInvitation} disabled={!isFormValid} disabledText="Enter valid email address" />
        </div>
    )
}

const mapActionsToProps = dispatch => ({ ...getActions(dispatch) })

export default connect(null, mapActionsToProps)(SendGroupInvitationForm)