import {
    FUND_DETAILS_REQUEST,
    FUND_DETAILS_SUCCESS,
    FUND_DETAILS_FAIL,
} from '../constants/fundConstants'


export const fundDetailsReducer = (state={fund:{admins:[]}}, action) => {
    switch(action.type) {
        case FUND_DETAILS_REQUEST:
            return {loading: true}
        case FUND_DETAILS_SUCCESS:
            return {loading: false, fund: action.payload}
        case FUND_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
