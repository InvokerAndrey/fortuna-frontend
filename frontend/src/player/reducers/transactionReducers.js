import { 
    ROOM_TRANSACTION_LIST_REQUEST,
    ROOM_TRANSACTION_LIST_SUCCESS,
    ROOM_TRANSACTION_LIST_FAIL,

    PLAYER_TRANSACTION_LIST_REQUEST,
    PLAYER_TRANSACTION_LIST_SUCCESS,
    PLAYER_TRANSACTION_LIST_FAIL,

    ROOM_TRANSACTION_ADD_REQUEST,
    ROOM_TRANSACTION_ADD_SUCCESS,
    ROOM_TRANSACTION_ADD_FAIL,
    ROOM_TRANSACTION_ADD_RESET,
} from '../constants/transactionConstants'


export const roomTransactionListReducer = (state={roomTransactions: []}, action) => {
    switch(action.type) {
        case ROOM_TRANSACTION_LIST_REQUEST:
            return {loading: true, roomTransactions: []}
        case ROOM_TRANSACTION_LIST_SUCCESS:
            return {loading: false, roomTransactions: action.payload}
        case ROOM_TRANSACTION_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const playerTransactionListReducer = (state={playerTransactions: []}, action) => {
    switch(action.type) {
        case PLAYER_TRANSACTION_LIST_REQUEST:
            return {loading: true, playerTransactions: []}
        case PLAYER_TRANSACTION_LIST_SUCCESS:
            return {loading: false, playerTransactions: action.payload}
        case PLAYER_TRANSACTION_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const roomTransactionAddReducer = (state={}, action) => {
    switch(action.type) {
        case ROOM_TRANSACTION_ADD_REQUEST:
            return {loading: true}
        case ROOM_TRANSACTION_ADD_SUCCESS:
            return {loading: false, success: true}
        case ROOM_TRANSACTION_ADD_FAIL:
            return {loading: false, error: action.payload}
        case ROOM_TRANSACTION_ADD_RESET:
            return {}
        default:
            return state
    }
}
