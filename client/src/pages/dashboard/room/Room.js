import React from 'react'
import { connect } from 'react-redux'

import Button from "../../../shared/components/button/Button"
import { getActions } from "../../../store/actions/room"
import ConferenceContainer from "../conferenceContainer/ConferenceContainer"
import './Room.css'

const Room = ({ toggleWindowResize, isRoomMinimized, destroyRoom }) => {
    return (
        <div className={`roomContainer${isRoomMinimized ? ' minimized' : ''}`}>
            <div className="windowButtonContainer">
                <Button onClick={toggleWindowResize} secondary>
                    <i className="fa-solid fa-window-minimize"></i>
                </Button>
                <Button onClick={destroyRoom}>
                    <i className="fa-solid fa-xmark"></i>
                </Button>
            </div>
            <ConferenceContainer />
            <div className="buttonContainer">
                <Button><i className="fa-solid fa-microphone"></i></Button>
                <Button><i className="fa-solid fa-video"></i></Button>
                <Button><i className="fa-solid fa-display"></i></Button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ ...state.room })

const mapActionsToProps = dispatch => ({ ...getActions(dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(Room)