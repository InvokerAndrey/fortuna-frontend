import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    playerListReducer,
    playerDetailsReducer,
    playerUpdateReducer,
    playerRegisterReducer,
    playerDeleteReducer,
} from './admin/reducers/playerReducers'
import {
    roomListReducer,
    roomDetailsReducer,
    roomPlayersReducer,
    roomAddReducer,
    roomDeleteReducer,
} from './admin/reducers/roomReducers'
import { 
    userLoginReducer,
} from './reducers/userReducers'
import {
    adminListReducer,
    adminDetailsReducer,
    adminRegisterReducer,
} from './admin/reducers/adminReducers'


const reducer = combineReducers({
    playerList: playerListReducer,
    playerDetails: playerDetailsReducer,
    playerUpdate: playerUpdateReducer,
    playerRegister: playerRegisterReducer,
    playerDelete: playerDeleteReducer,

    roomList: roomListReducer,
    roomDetails: roomDetailsReducer,
    roomPlayers: roomPlayersReducer,
    roomDelete: roomDeleteReducer,
    roomAdd: roomAddReducer,

    userLogin: userLoginReducer,
    adminList: adminListReducer,
    adminDetails: adminDetailsReducer,
    adminRegister: adminRegisterReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
