import React, {useState} from 'react'
import { connect } from 'react-redux'

import Button from "../../../shared/components/button/Button"
import { getActions } from "../../../store/actions/room"
import ConferenceContainer from "../conferenceContainer/ConferenceContainer"
import {leaveRoom} from "../../../realtimeCommunication/socketConnection";
import './Room.css'

const Room = ({ toggleWindowResize, isRoomMinimized, destroyRoom, roomDetails }) => {
    const [cameraEnabled, setCameraEnabled] = useState(false)
    const [microphoneEnabled, setMicrophoneEnabled] = useState(false)
    const [screenShareEnabled, setScreenShareEnabled] = useState(false)

    const handleCameraToggle = () => {
        setCameraEnabled(x => !x)
    }

    const handleMicrophoneEnabled = () => {
        setMicrophoneEnabled(x => !x)
    }

    const handleScreenShareEnabled = () => {
        setScreenShareEnabled(x => !x)
    }

    const handleLeaveRoom = () => {
        leaveRoom(roomDetails.roomId)
        destroyRoom()
    }

    return (
        <div className={`roomContainer${isRoomMinimized ? ' minimized' : ''}`}>
            <div className="windowButtonContainer">
                <Button onClick={toggleWindowResize} secondary>
                    <i className="fa-solid fa-window-minimize"></i>
                </Button>
                <Button onClick={handleLeaveRoom}>
                    <i className="fa-solid fa-xmark"></i>
                </Button>
            </div>
            <ConferenceContainer />
            <div className="buttonContainer">
                <Button onClick={handleMicrophoneEnabled}>
                    {microphoneEnabled ? <i className="fa-solid fa-microphone"></i> : <i className="fa-solid fa-microphone-slash"></i>}
                </Button>
                <Button onClick={handleCameraToggle}>
                    {cameraEnabled ? <i className="fa-solid fa-video"></i> : <i className="fa-solid fa-video-slash"></i>}
                </Button>
                <Button onClick={handleScreenShareEnabled}>
                    {screenShareEnabled ? <i className="fa-brands fa-chromecast"></i> : <i className="fa-solid fa-display"></i> }
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ ...state.room })

const mapActionsToProps = dispatch => ({ ...getActions(dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(Room)