import React, { useState } from 'react'
import { connect } from 'react-redux'

import { sendMessage } from '../../../realtimeCommunication/socketConnection'
import Button from '../../../shared/components/button/Button'
import Input from "../../../shared/components/input/Input"
import './MessageCompose.css'

const MessageCompose = ({ chosenChatDetails }) => {
    const [message, setMessage] = useState('')
    const [files, setFiles] = useState([])

    const handleSendMessage = () => {
        if (message.trim().length > 0 || files.length > 0) {
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
        
        input.onchange = async e => {
            const filePromise = file => new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    resolve(reader.result)
                }
            })

            const files = e.target.files
            const filesWithObjectUrls = []

            if (files.length) {
                for (const file of files) {
                    if (file.type.startsWith('image') || file.type.startsWith('video')) {
                        const objectUrl = await filePromise(file)
                        filesWithObjectUrls.push({
                            objectUrl,
                            file
                        })
                    }
                }
            }

            setFiles(filesWithObjectUrls)
        }
        input.click()
    }

    const handleFileRemoval = index => {
        const localFiles = [...files]
        localFiles.splice(index, 1)
        setFiles(localFiles)
    }

    return (
        <>
            {files.length > 0 && (
                <div className='uploadedFilesContainer'>
                    {files.map(({ objectUrl, file }, index) => (
                        <div className='imagePreviewContainer' key={file.lastModified + file.name}>
                            <button onClick={() => handleFileRemoval(index)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            <img src={objectUrl} alt='selected-file'  />
                        </div>
                    ))}
                </div>
            )}
            <div className="messageComposeContainer">
            <Input
                autoFocus
                value={message} 
                onChange={setMessage} 
                placeholder={`Write message to ${chosenChatDetails.username}`}
                handleKeyDown={handleKeyDown} />
                <Button onClick={handleAttachment}>
                    <i className="fa-solid fa-paperclip"></i>
                </Button>
                <Button onClick={handleSendMessage}>
                    <i className="fa-solid fa-paper-plane"></i>
                </Button>
            </div>
        </>
    )
}

const mapStateToProps = store => ({ ...store.chat })

export default connect(mapStateToProps, null)(MessageCompose)