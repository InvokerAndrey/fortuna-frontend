import {
    ADMIN_LIST_REQUEST,
    ADMIN_LIST_SUCCESS,
    ADMIN_LIST_FAIL,

    ADMIN_DETAILS_REQUEST,
    ADMIN_DETAILS_SUCCESS,
    ADMIN_DETAILS_FAIL,

    ADMIN_REGISTER_REQUEST,
    ADMIN_REGISTER_SUCCESS,
    ADMIN_REGISTER_FAIL,
    ADMIN_REGISTER_RESET,
} from '../constants/adminConstants'


export const adminListReducer = (state={admins:[]}, action) => {
    switch(action.type) {
        case ADMIN_LIST_REQUEST:
            return {loading: true, admins: []}
        case ADMIN_LIST_SUCCESS:
            return {loading: false, admins: action.payload}
        case ADMIN_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const adminDetailsReducer = (state={admin:{user:{}, fund:{}}}, action) => {
    switch(action.type) {
        case ADMIN_DETAILS_REQUEST:
            return {loading: true, ...state}
        case ADMIN_DETAILS_SUCCESS:
            return {loading: false, admin: action.payload}
        case ADMIN_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const adminRegisterReducer = (state={}, action) => {
    switch(action.type) {
        case ADMIN_REGISTER_REQUEST:
            return {loading: true}
        case ADMIN_REGISTER_SUCCESS:
            return {loading: false, success: true}
        case ADMIN_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        case ADMIN_REGISTER_RESET:
            return {}
        default:
            return state
    }
}
