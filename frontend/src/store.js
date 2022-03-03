import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    playerListReducer,
    playerDetailsReducer,
    playerUpdateReducer,
} from './admin/reducers/playerReducers'
import {
    roomListReducer,
    roomDetailsReducer,
    roomPlayersReducer,
} from './admin/reducers/roomReducers'
import { 
    userLoginReducer,
} from './reducers/userReducers'

import {
    adminListReducer,
    adminDetailsReducer
} from './admin/reducers/adminReducers'


const reducer = combineReducers({
    playerList: playerListReducer,
    playerDetails: playerDetailsReducer,
    playerUpdate: playerUpdateReducer,
    roomList: roomListReducer,
    roomDetails: roomDetailsReducer,
    roomPlayers: roomPlayersReducer,
    userLogin: userLoginReducer,
    adminList: adminListReducer,
    adminDetails: adminDetailsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
