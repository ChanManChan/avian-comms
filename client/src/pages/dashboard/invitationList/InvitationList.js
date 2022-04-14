import React from 'react'

import FlatButton from '../../../shared/components/flatButton/FlatButton'
import TextAvatar from '../../../shared/components/textAvatar/TextAvatar'
import './InvitationList.css'

const InvitationList = () => {
    const DUMMY_INVITATIONS = [
        {
            id: 1,
            sender: {
                username: 'testing something out in the trojan horse',
                mail: 'nandu@test.com'
            }
        },
        {
            id: 2,
            sender: {
                username: 'Chan',
                mail: 'chan@test.com'
            }
        },
        {
            id: 3,
            sender: {
                username: 'Vega',
                mail: 'vega@test.com'
            }
        }
    ]

    const handleInviteAccept = sender => {
        console.log(sender)
    }

    const handleInviteReject = sender => {
        console.log(sender)
    }

    return (
        <section className='invitationListContainer'>
            {DUMMY_INVITATIONS.map(({ id, sender }) => (
                <FlatButton key={id} text={sender.username} disabled>
                    <TextAvatar text={sender.username} />
                    <aside style={{ whiteSpace: 'nowrap' }}>
                        <span className='singleActionButton' onClick={() => handleInviteAccept(sender)}>
                            <i className="fa-solid fa-check"></i>
                        </span>
                        <span className='singleActionButton' onClick={() => handleInviteReject(sender)}>
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                    </aside>
                </FlatButton>
            ))}
        </section>
    )
}

export default InvitationList