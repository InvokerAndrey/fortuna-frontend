import {
    SESSION_LIST_REQUEST,
    SESSION_LIST_SUCCESS,
    SESSION_LIST_FAIL,

    SESSION_DETAILS_REQUEST,
    SESSION_DETAILS_SUCCESS,
    SESSION_DETAILS_FAIL,
} from '../constants/sessionConstants'


export const sessionListReducer = (state={sessions:[]}, action) => {
    switch(action.type) {
        case SESSION_LIST_REQUEST:
            return {loading: true, sessions:[]}
        case SESSION_LIST_SUCCESS:
            return {loading: false, sessions: action.payload}
        case SESSION_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const sessionDetailsReducer = (state={session:{player:{}, room_sessions:[]}}, action) => {
    switch(action.type) {
        case SESSION_DETAILS_REQUEST:
            return {loading: true, session:{}}
        case SESSION_DETAILS_SUCCESS:
            return {loading: false, session: action.payload}
        case SESSION_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}