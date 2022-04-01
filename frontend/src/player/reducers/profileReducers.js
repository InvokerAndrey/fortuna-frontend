import { 
    PROFILE_DETAILS_REQUEST,
    PROFILE_DETAILS_SUCCESS,
    PROFILE_DETAILS_FAIL,

    PROFILE_CHANGE_PASSWORD_REQUEST,
    PROFILE_CHANGE_PASSWORD_SUCCESS,
    PROFILE_CHANGE_PASSWORD_FAIL,
    PROFILE_CHANGE_PASSWORD_RESET,
} from '../constants/profileConstants'


export const playerProfileDetailsReducer = (state={profile:{user:{}, rooms:[], player_transactions:[], room_transactions:[]}}, action) => {
    switch (action.type) {
        case PROFILE_DETAILS_REQUEST:
            return {loading: true, ...state}
        case PROFILE_DETAILS_SUCCESS:
            return {loading: false, profile: action.payload}
        case PROFILE_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const playerChangePasswordReducer = (state={}, action) => {
    switch (action.type) {
        case PROFILE_CHANGE_PASSWORD_REQUEST:
            return {loading: true}
        case PROFILE_CHANGE_PASSWORD_SUCCESS:
            return {loading: false, success: true}
        case PROFILE_CHANGE_PASSWORD_FAIL:
            return {loading: false, success: false, error: action.payload}
        case PROFILE_CHANGE_PASSWORD_RESET:
            return {}
        default:
            return state
    }
}
