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


const reducer = combineReducers({
    playerList: playerListReducer,
    playerDetails: playerDetailsReducer,
    roomList: roomListReducer,
    roomDetails: roomDetailsReducer,
    roomPlayers: roomPlayersReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
