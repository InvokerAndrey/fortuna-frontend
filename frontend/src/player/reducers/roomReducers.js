import {
    PLAYER_ROOM_LIST_REQUEST,
    PLAYER_ROOM_LIST_SUCCESS,
    PLAYER_ROOM_LIST_FAIL,

    PLAYER_ROOM_DETAILS_REQUEST,
    PLAYER_ROOM_DETAILS_SUCCESS,
    PLAYER_ROOM_DETAILS_FAIL,

    PLAYER_ROOM_UPDATE_REQUEST,
    PLAYER_ROOM_UPDATE_SUCCESS,
    PLAYER_ROOM_UPDATE_FAIL,
    PLAYER_ROOM_UPDATE_RESET,
} from '../constants/roomConstants'


export const playerRoomListReducer = (state={rooms:[]}, action) => {
    switch(action.type) {
        case PLAYER_ROOM_LIST_REQUEST:
            return {loading: true, rooms:[]}
        case PLAYER_ROOM_LIST_SUCCESS:
            return {loading: false, rooms: action.payload}
        case PLAYER_ROOM_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const playerRoomDetailsReducer = (state={playerRoom:{}}, action) => {
    switch(action.type) {
        case PLAYER_ROOM_DETAILS_REQUEST:
            return {loading: true, playerRoom:{}}
        case PLAYER_ROOM_DETAILS_SUCCESS:
            return {loading: false, playerRoom: action.payload}
        case PLAYER_ROOM_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const playerRoomUpdateReducer = (state={playerRoom:{}}, action) => {
    switch(action.type) {
        case PLAYER_ROOM_UPDATE_REQUEST:
            return {loading: true}
        case PLAYER_ROOM_UPDATE_SUCCESS:
            return {loading: false, success:true, playerRoom: action.payload}
        case PLAYER_ROOM_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case PLAYER_ROOM_UPDATE_RESET:
            return {player_room: {}}
        default:
            return state
    }
}
