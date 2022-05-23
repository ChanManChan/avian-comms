import React from 'react'
import { connect } from 'react-redux'

import { CHAT_TYPES } from '../../../store/actions/chat'
import { getActions } from '../../../store/actions/communication'
import FlatButton from '../../../shared/components/flatButton/FlatButton'
import TextAvatar from '../../../shared/components/textAvatar/TextAvatar'
import './InvitationList.css'

const InvitationList = ({ pendingDirectInvitations, pendingGroupInvitations, chatType, invitationAction }) => {

    const handleInviteAccept = (invitationId, senderId) => {
        invitationAction({ action: 'accept', invitationId, senderId })
    }

    const handleInviteReject = (invitationId, senderId) => {
        invitationAction({ action: 'reject', invitationId, senderId })
    }

    return (
        <section className='invitationListContainer'>
            {(chatType === CHAT_TYPES.DIRECT ? pendingDirectInvitations : pendingGroupInvitations).map(({ _id, senderId }) => (
                <FlatButton key={_id} text={senderId.username}>
                    <TextAvatar text={senderId.username} />
                    <aside style={{ whiteSpace: 'nowrap' }}>
                        <span className='singleActionButton' onClick={() => handleInviteAccept(_id, senderId)}>
                            <i className="fa-solid fa-check"></i>
                        </span>
                        <span className='singleActionButton' onClick={() => handleInviteReject(_id, senderId)}>
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                    </aside>
                </FlatButton>
            ))}
        </section>
    )
}

const mapStateToProps = state => ({ ...state.communication, chatType: state.chat.chatType })
const mapActionsToProps = dispatch => ({ ...getActions(dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(InvitationList)