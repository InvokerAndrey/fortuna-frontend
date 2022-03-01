import {
    ROOM_LIST_REQUEST,
    ROOM_LIST_SUCCESS,
    ROOM_LIST_FAIL,

    ROOM_DETAILS_REQUEST,
    ROOM_DETAILS_SUCCESS,
    ROOM_DETAILS_FAIL,

    ROOM_PLAYERS_REQUEST,
    ROOM_PLAYERS_SUCCESS,
    ROOM_PLAYERS_FAIL,
} from '../constants/roomConstants'


export const roomListReducer = (state={rooms:[]}, action) => {
    switch(action.type) {
        case ROOM_LIST_REQUEST:
            return {loading: true, rooms: []}
        case ROOM_LIST_SUCCESS:
            return {loading: false, rooms: action.payload}
        case ROOM_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const roomDetailsReducer = (state={room:{}}, action) => {
    switch(action.type) {
        case ROOM_DETAILS_REQUEST:
            return {loading: true, ...state}
        case ROOM_DETAILS_SUCCESS:
            return {loading: false, room: action.payload}
        case ROOM_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const roomPlayersReducer = (state={players:[]}, action) => {
    switch(action.type) {
        case ROOM_PLAYERS_REQUEST:
            return {loading: true, players: []}
        case ROOM_PLAYERS_SUCCESS:
            return {loading: false, players: action.payload}
        case ROOM_PLAYERS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
