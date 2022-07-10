import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { sendMessage, createNewRoom, leaveRoom } from '../../../realtimeCommunication/socketConnection'
import Button from '../../../shared/components/button/Button'
import Input from "../../../shared/components/input/Input"
import { getActions } from '../../../store/actions/alert'
import { getActions as roomActions } from '../../../store/actions/room'
import { imageFormats, videoFormats } from '../../../shared/utils'
import Modal from "../../../shared/components/modal/Modal";
import './MessageCompose.css'

const MessageCompose = ({ chosenChatDetails, showAlertMessage, setOpenRoom, destroyRoom, isRoomMinimized, roomDetails, isUserInRoom, toggleWindowResize }) => {
    const [message, setMessage] = useState('')
    const [files, setFiles] = useState([])
    const [isFormValid, setIsFormValid] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (message.trim().length > 0 || files.length > 0) {
            setIsFormValid(true)
            return
        }
        setIsFormValid(false)
    }, [message, files])

    const handleSendMessage = () => {
        if (isFormValid) {
            const data = { conversationId: chosenChatDetails.conversationId }
            Object.assign(data, message.trim().length > 0 && { content: message.trim() })
            Object.assign(data, files.length > 0 && { media: files.map(x => x.file) })
            sendMessage(data)
            setMessage('')
            setFiles([])
        }
    }

    const handleKeyDown = event => {
        if (event.key === "Enter") {
            handleSendMessage()
        }
    }

    const handleAttachment = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.multiple = true
        input.accept = 'image/*,video/*'
        const reader = new FileReader()
        
        input.onchange = async e => {
            const filePromise = file => new Promise((resolve, reject) => {
                reader.readAsDataURL(file)
                reader.onload = () => {
                    resolve(reader.result)
                }
            })

            const files = e.target.files
            const filesWithObjectUrls = []
            const maxAllowedFileSize = 10 * 1024 * 1024

            if (files.length) {
                for (const file of files) {
                    if ((file.type.startsWith('image') || file.type.startsWith('video')) && file.size <= maxAllowedFileSize) {
                        const objectUrl = await filePromise(file)
                        filesWithObjectUrls.push({
                            objectUrl,
                            file
                        })
                    } else {
                        showAlertMessage("Invalid file type or file size exceeded 10MB")
                    }
                }
            }

            setFiles(x => [...x, ...filesWithObjectUrls])
        }

        input.click()
    }

    const handleFileRemoval = index => {
        const localFiles = [...files]
        localFiles.splice(index, 1)
        setFiles(localFiles)
    }

    const handleRoomOperations = () => {
        if (roomDetails === null) {
            setOpenRoom(true, true)
            createNewRoom(chosenChatDetails.conversationId)
        } else {
            if (roomDetails.roomId !== chosenChatDetails.conversationId) {
                setOpen(true)
            } else if (isUserInRoom && isRoomMinimized) {
                toggleWindowResize()
            }
        }
    }

    const handleLeaveRoom = () => {
        leaveRoom(roomDetails.roomId)
        destroyRoom()
    }

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)} className='messageComposeModal'>
                <h2>Would you like to leave the current call and make a new call?</h2>
                <div>
                    <Button text="Leave" onClick={() => {
                        handleLeaveRoom()
                        handleRoomOperations()
                    }}></Button>
                    <Button text="Stay" secondary onClick={() => setOpen(false)}></Button>
                </div>
            </Modal>
            {files.length > 0 && (
                <div className='uploadedFilesContainer'>
                    {files.map(({ objectUrl, file }, index) => {
                        const extension = file.type.split('/')[1]
                        return (
                            <div className='imagePreviewContainer' key={file.lastModified + file.name}>
                                <button onClick={() => handleFileRemoval(index)}>
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                                {imageFormats.includes(extension) ? (
                                    <img src={objectUrl} alt='selected-file'  />
                                ) : (
                                    videoFormats.includes(extension) ? <video src={objectUrl} /> : null
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
            <div className="messageComposeContainer">
                <Input
                    autoFocus
                    value={message}
                    onChange={setMessage}
                    placeholder={`Write message to ${chosenChatDetails.username}`}
                    handleKeyDown={handleKeyDown} />
                    <Button onClick={handleRoomOperations}>
                        {roomDetails?.roomId === chosenChatDetails?.conversationId && isRoomMinimized ? <i className="fa-solid fa-phone-volume"></i> : <i className="fa-solid fa-phone"></i>}
                    </Button>
                    <Button onClick={handleAttachment}>
                        <i className="fa-solid fa-paperclip"></i>
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!isFormValid} disabledText="Add a message" >
                        <i className="fa-solid fa-paper-plane"></i>
                    </Button>
            </div>
        </>
    )
}

const mapStateToProps = store => ({ ...store.chat, ...store.room })
const mapActionsToProps = dispatch => ({ ...getActions(dispatch), ...roomActions(dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(MessageCompose)