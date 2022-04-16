import React from 'react'
import { connect } from 'react-redux'

import { getActions } from '../../../store/actions/users'
import FlatButton from '../../../shared/components/flatButton/FlatButton'
import TextAvatar from '../../../shared/components/textAvatar/TextAvatar'
import './InvitationList.css'

const InvitationList = ({ users, pendingInvitations, onlineUsers, invitationAction }) => {

    const handleInviteAccept = invitationId => {
        invitationAction({ action: 'accept', invitationId })
    }

    const handleInviteReject = invitationId => {
        invitationAction({ action: 'reject', invitationId })
    }

    return (
        <section className='invitationListContainer'>
            {pendingInvitations.map(({ _id, senderId }) => (
                <FlatButton key={senderId._id} text={senderId.username}>
                    <TextAvatar text={senderId.username} />
                    <aside style={{ whiteSpace: 'nowrap' }}>
                        <span className='singleActionButton' onClick={() => handleInviteAccept(_id)}>
                            <i className="fa-solid fa-check"></i>
                        </span>
                        <span className='singleActionButton' onClick={() => handleInviteReject(_id)}>
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                    </aside>
                </FlatButton>
            ))}
        </section>
    )
}

const mapStateToProps = state => ({ ...state.users })
const mapActionsToProps = dispatch => ({ ...getActions(dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(InvitationList)