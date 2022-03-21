import {
    SESSION_LIST_REQUEST,
    SESSION_LIST_SUCCESS,
    SESSION_LIST_FAIL,

    SESSION_DETAILS_REQUEST,
    SESSION_DETAILS_SUCCESS,
    SESSION_DETAILS_FAIL,

    SESSION_CREATE_REQUEST,
    SESSION_CREATE_SUCCESS,
    SESSION_CREATE_FAIL,
    SESSION_CREATE_RESET,

    ROOM_SESSIONS_STATISTICS_REQUEST,
    ROOM_SESSIONS_STATISTICS_SUCCESS,
    ROOM_SESSIONS_STATISTICS_FAIL,

    SESSIONS_STATISTICS_REQUEST,
    SESSIONS_STATISTICS_SUCCESS,
    SESSIONS_STATISTICS_FAIL,
} from '../constants/sessionConstants'


export const sessionListReducer = (state={sessions:[]}, action) => {
    switch(action.type) {
        case SESSION_LIST_REQUEST:
            return {loading: true, sessions:[]}
        case SESSION_LIST_SUCCESS:
            return {
                loading: false,
                sessions: action.payload.results,
                page: action.payload.page,
                previous: action.payload.previous,
                next: action.payload.next,
                count: action.payload.count,
                num_pages: action.payload.num_pages
            }
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


export const sessionCreateReducer = (state={}, action) => {
    switch(action.type) {
        case SESSION_CREATE_REQUEST:
            return {loading: true}
        case SESSION_CREATE_SUCCESS:
            return {loading: false, success: true}
        case SESSION_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case SESSION_CREATE_RESET:
            return {}
        default:
            return state
    }
}


export const roomSessionsStatisticsReducer = (state={statistics:[]}, action) => {
    switch(action.type) {
        case ROOM_SESSIONS_STATISTICS_REQUEST:
            return {loading: true, statistics:[]}
        case ROOM_SESSIONS_STATISTICS_SUCCESS:
            return {loading: false, statistics: action.payload}
        case ROOM_SESSIONS_STATISTICS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const sessionsStatisticsReducer = (state={statistics:[]}, action) => {
    switch(action.type) {
        case SESSIONS_STATISTICS_REQUEST:
            return {loading: true, statistics:[]}
        case SESSIONS_STATISTICS_SUCCESS:
            return {loading: false, statistics: action.payload}
        case SESSIONS_STATISTICS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
