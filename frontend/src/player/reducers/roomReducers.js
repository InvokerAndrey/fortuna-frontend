import {
    PLAYER_ROOM_LIST_REQUEST,
    PLAYER_ROOM_LIST_SUCCESS,
    PLAYER_ROOM_LIST_FAIL,
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
