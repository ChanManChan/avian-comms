import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './reducers/auth'
import alertReducer from './reducers/alert'
import usersReducer from './reducers/users'
import chatReducer from './reducers/chat'
import roomReducer from './reducers/room'

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    users: usersReducer,
    chat: chatReducer,
    room: roomReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store