import { 
    PROFILE_DETAILS_REQUEST,
    PROFILE_DETAILS_SUCCESS,
    PROFILE_DETAILS_FAIL,
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
