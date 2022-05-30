import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Modal from '../../../shared/components/modal/Modal'
import Input from '../../../shared/components/input/Input'
import Button from '../../../shared/components/button/Button'
import { CHAT_ACTIONS, CHAT_TYPES } from '../../../store/actions/chat'
import { updateProfile, uploadFile } from '../../../api'
import { validatePassword, validateUsername, entityToChar } from '../../../shared/utils'
import './GroupSidebar.css'

const GroupSidebar = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [file, setFile] = useState(null)
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {

        if (!open) {
            setIsFormValid(false)
            setUsername('')
            setPassword('')
            setConfirmPassword('')
            setFile(null)
            return
        }

        if (password === '' && confirmPassword === '' && username === '' && file === null) {
            setIsFormValid(false)
            return
        }

        const validPassword = (password === '' && confirmPassword === '') || (password === confirmPassword && validatePassword(password))
        const validFile = file !== null
        const validUsername = username === '' || validateUsername(username)

        if ((validPassword && validUsername) || (validFile && validPassword && validUsername)) {
            setIsFormValid(true)
            return
        }

        setIsFormValid(false)
    }, [password, confirmPassword, file, username, open])

    const DirectConversationButton = () => {
        return (
            <button className='sidebarButton' onClick={() => dispatch({ type: CHAT_ACTIONS.SET_CHAT_TYPE, chatType: CHAT_TYPES.DIRECT })}>
                <i className='fa-solid fa-person'></i>
            </button>
        )
    }

    const GroupConversationButton = () => {
        return (
            <button className='sidebarButton' onClick={() => dispatch({ type: CHAT_ACTIONS.SET_CHAT_TYPE, chatType: CHAT_TYPES.GROUP })}>
                <i className='fa-solid fa-people-group'></i>
            </button>
        )
    }

    const SettingsButton = () => {
        return (
            <button className='sidebarButton' onClick={() => setOpen(true)}>
                <i className='fa-solid fa-gear'></i>
            </button>
        )
    }

    const handleProfileUpdate = async () => {
        if (isFormValid) {
            let path = ''
            if (file) {
                const formData = new FormData()
                formData.append('file', file)
                const response = await uploadFile(formData)
                if (!response.error) {
                    path = response.data.path
                }
            }
            const data = {}
            Object.assign(data, username && { username })
            Object.assign(data, password && { password })
            Object.assign(data, path && { profilePicture: path })
            await updateProfile(data)
        }
    }

    return (
        <aside className='groupSidebarContainer'>
            <DirectConversationButton />
            <GroupConversationButton />
            <SettingsButton />
            <Modal open={open} onClose={() => setOpen(false)}>
                <h2>Update profile</h2>
                <Input label='Username' type="text" placeholder='Enter new username (optional)' value={username} onChange={setUsername} />
                <Input label='Password' type="password" placeholder='Enter new password (optional)' value={password} onChange={setPassword} />
                <Input label='Confirm Password' type="password" placeholder='Confirm new password (optional)' value={confirmPassword} onChange={setConfirmPassword} />
                <input type="file" onChange={e => setFile(e.target.files[0].type.startsWith('image') ? e.target.files[0] : (e.target.value = '', null))} accept="image/*" />
                <Button 
                 text="Update" 
                 className='updateBtn' 
                 onClick={handleProfileUpdate} 
                 disabled={!isFormValid} 
                 disabledText={entityToChar(
                    'Profile update functionality is disabled due to:' +
                    '&#10;1> Password and confirm password mismatch' +
                    '&#10;2> Invalid password length (must be between 6-12 characters)' +
                    '&#10;3> Invalid username length (must be between 3-12 characters)' + 
                    '&#10;4> Form being empty'
                )} />
            </Modal>
        </aside>
    )
}

export default GroupSidebar