import io from 'socket.io-client'

import store from '../store/store'
import { addInvitation, setPendingInvitations } from '../store/actions/users'
let socket = null

export const connectWithSocketServer = user => {
    socket = io('http://localhost:5000', {
        auth: {
            token: user.token
        }
    })

    socket.on('connect', () => {
        console.log('successfully connected with socket.io server ', socket.id)
    })

    socket.on('initial-sync', ({ pendingInvitations }) => {
        store.dispatch(setPendingInvitations(pendingInvitations))
    })

    socket.on('invitation', data => {
        store.dispatch(addInvitation(data))
    })
}