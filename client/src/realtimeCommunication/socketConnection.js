import io from 'socket.io-client'

import store from '../store/store'
import { addInvitation, addUser, setPendingInvitations, setUsers, updateOnlineStatus } from '../store/actions/users'
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

    socket.on('initial-sync', ({ users, pendingInvitations }) => {
        store.dispatch(setPendingInvitations(pendingInvitations))
        store.dispatch(setUsers(users))
    })

    socket.on('invitation', data => {
        store.dispatch(addInvitation(data))
    })

    socket.on('add-user', data => {
        store.dispatch(addUser(data))
    })

    socket.on('advertise-presence', ({ userId, advertisementType }) => {
        if (advertisementType === 'pulseOut') {
            socket.emit('acknowledge-presence', { ackFrom: store.getState().auth.userDetails._id, ackTo: userId })
        }
        store.dispatch(updateOnlineStatus(userId, true))
    })

    socket.on('advertise-absence', data => {
        store.dispatch(updateOnlineStatus(data, false))
    })
}