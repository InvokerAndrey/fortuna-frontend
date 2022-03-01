import {
    PLAYER_LIST_REQUEST,
    PLAYER_LIST_SUCCESS,
    PLAYER_LIST_FAIL,

    PLAYER_DETAILS_REQUEST,
    PLAYER_DETAILS_SUCCESS,
    PLAYER_DETAILS_FAIL,
} from '../constants/playerConstants'


export const playerListReducer = (state={players:[]}, action) => {
    switch(action.type) {
        case PLAYER_LIST_REQUEST:
            return {loading: true, players: []}
        case PLAYER_LIST_SUCCESS:
            return {loading: false, players: action.payload}
        case PLAYER_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const playerDetailsReducer = (state={player:{user:{}, rooms:[], room_transactions:[], player_transactions:[]}}, action) => {
    switch(action.type) {
        case PLAYER_DETAILS_REQUEST:
            return {loading: true, ...state}
        case PLAYER_DETAILS_SUCCESS:
            return {loading: false, player: action.payload}
        case PLAYER_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}