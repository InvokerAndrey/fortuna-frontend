import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    playerListReducer,
    playerDetailsReducer,
    playerUpdateReducer,
    playerRegisterReducer,
    playerDeleteReducer,
    playerAddTransactionReducer,
    playerListPlayerTransactionsReducer,
    playerListRoomTransactionsReducer,
} from './admin/reducers/playerReducers'
import {
    roomListReducer,
    roomDetailsReducer,
    roomPlayersReducer,
    roomAddReducer,
    roomDeleteReducer,
    playerRoomAddReducer,
    availableRoomListReducer,
    playerRoomDeleteReducer,
} from './admin/reducers/roomReducers'
import { 
    userLoginReducer,
} from './reducers/userReducers'
import {
    adminListReducer,
    adminDetailsReducer,
    adminRegisterReducer,
} from './admin/reducers/adminReducers'
import {
    playerProfileDetailsReducer,
    playerChangePasswordReducer,
} from './player/reducers/profileReducers'
import {
    playerRoomListReducer,
    playerRoomDetailsReducer,
    playerRoomUpdateReducer,
} from './player/reducers/roomReducers'
import {
    roomTransactionListReducer,
    roomTransactionAddReducer,
    playerTransactionListReducer,
} from './player/reducers/transactionReducers'
import {
    sessionListReducer,
    sessionDetailsReducer,
    sessionCreateReducer,
    roomSessionsStatisticsReducer,
    sessionsStatisticsReducer,
} from './player/reducers/sessionReducers'
import {
    fundDetailsReducer,
    fundTransactionListReducer,
    fundAddTransactionReducer,
} from './admin/reducers/fundReducers'


const reducer = combineReducers({
    playerList: playerListReducer,
    playerDetails: playerDetailsReducer,
    playerUpdate: playerUpdateReducer,
    playerRegister: playerRegisterReducer,
    playerDelete: playerDeleteReducer,
    playerAddTransaction: playerAddTransactionReducer,
    playerListPlayerTransactions: playerListPlayerTransactionsReducer,
    playerListRoomTransactions: playerListRoomTransactionsReducer,

    roomList: roomListReducer,
    roomDetails: roomDetailsReducer,
    roomPlayers: roomPlayersReducer,
    roomDelete: roomDeleteReducer,
    roomAdd: roomAddReducer,
    playerRoomAdd: playerRoomAddReducer,
    availableRoomList: availableRoomListReducer,
    playerRoomDelete: playerRoomDeleteReducer,

    userLogin: userLoginReducer,
    adminList: adminListReducer,
    adminDetails: adminDetailsReducer,
    adminRegister: adminRegisterReducer,

    playerProfileDetails: playerProfileDetailsReducer,
    playerRoomList: playerRoomListReducer,
    roomTransactionList: roomTransactionListReducer,
    roomTransactionAdd: roomTransactionAddReducer,
    playerTransactionList: playerTransactionListReducer,
    playerRoomUpdate: playerRoomUpdateReducer,
    playerRoomDetails: playerRoomDetailsReducer,
    playerChangePassword: playerChangePasswordReducer,

    sessionList: sessionListReducer,
    sessionDetails: sessionDetailsReducer,
    sessionCreate: sessionCreateReducer,
    roomSessionsStatistics: roomSessionsStatisticsReducer,
    sessionsStatistics: sessionsStatisticsReducer,

    fundDetails: fundDetailsReducer,
    fundTransactionList: fundTransactionListReducer,
    fundAddTransaction: fundAddTransactionReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
