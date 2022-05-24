import React, { useState } from 'react'
import { connect } from 'react-redux'

import { CHAT_TYPES } from '../../../store/actions/chat'
import { getActions } from '../../../store/actions/communication'
import FlatButton from '../../../shared/components/flatButton/FlatButton'
import TextAvatar from '../../../shared/components/textAvatar/TextAvatar'
import Modal from '../../../shared/components/modal/Modal'
import './InvitationList.css'

const InvitationList = ({ pendingDirectInvitations, pendingGroupInvitations, chatType, invitationAction }) => {
    const [open, setOpen] = useState(false)
    const [invitation, setInvitation] = useState({})

    const handleInviteAccept = (invitationId, senderId) => {
        invitationAction({ action: 'accept', invitationId, senderId })
    }

    const handleInviteReject = (invitationId, senderId) => {
        invitationAction({ action: 'reject', invitationId, senderId })
    }

    return (
        <section className='invitationListContainer'>
            {(chatType === CHAT_TYPES.DIRECT ? pendingDirectInvitations : pendingGroupInvitations).map(({ _id, senderId, recipients }) => (
                <FlatButton key={_id} text={senderId.username} onClick={() => {setOpen(true); setInvitation({ _id, senderId, recipients })}}>
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
            <Modal open={open} onClose={() => setOpen(false)}>
                {!!Object.keys(invitation).length && (
                    <div className='invitationDetails'>
                        <strong className='invitationHeader'>Sender: </strong>
                        <p><strong>{invitation.senderId.username}</strong> [<small>{invitation.senderId.mail}</small>]</p>
                        <br />
                        <strong className='invitationHeader'>Recipients: </strong>
                        <ul className='recipientList'>
                            {invitation.recipients.map(({ recipient, status }) => (
                                <li key={recipient._id}>
                                   <p><strong>{recipient.username}</strong> [<small>{recipient.mail}</small>]</p>
                                   <hr />
                                   <small>{status}</small>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Modal>
        </section>
    )
}

const mapStateToProps = state => ({ ...state.communication, chatType: state.chat.chatType })
const mapActionsToProps = dispatch => ({ ...getActions(dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(InvitationList)