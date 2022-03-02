import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    playerListReducer,
    playerDetailsReducer,
} from './admin/reducers/playerReducers'
import {
    roomListReducer,
    roomDetailsReducer,
    roomPlayersReducer,
} from './admin/reducers/roomReducers'
import { 
    userLoginReducer,
 } from './reducers/userReducers'


const reducer = combineReducers({
    playerList: playerListReducer,
    playerDetails: playerDetailsReducer,
    roomList: roomListReducer,
    roomDetails: roomDetailsReducer,
    roomPlayers: roomPlayersReducer,
    userLogin: userLoginReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
