import {
    FUND_DETAILS_REQUEST,
    FUND_DETAILS_SUCCESS,
    FUND_DETAILS_FAIL,

    FUND_LIST_TRANSACTIONS_REQUEST,
    FUND_LIST_TRANSACTIONS_SUCCESS,
    FUND_LIST_TRANSACTIONS_FAIL,

    FUND_ADD_TRANSACTION_REQUEST,
    FUND_ADD_TRANSACTION_SUCCESS,
    FUND_ADD_TRANSACTION_FAIL,
    FUND_ADD_TRANSACTION_RESET,
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


export const fundTransactionListReducer = (state={transactions: []}, action) => {
    switch(action.type) {
        case FUND_LIST_TRANSACTIONS_REQUEST:
            return {loading: true, transactions: []}
        case FUND_LIST_TRANSACTIONS_SUCCESS:
            return {
                loading: false,
                transactions: action.payload.results,
                page: action.payload.page,
                previous: action.payload.previous,
                next: action.payload.next,
                count: action.payload.count,
                num_pages: action.payload.num_pages,
            }
        case FUND_LIST_TRANSACTIONS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const fundAddTransactionReducer = (state={}, action) => {
    switch(action.type) {
        case FUND_ADD_TRANSACTION_REQUEST:
            return {loading: true}
        case FUND_ADD_TRANSACTION_SUCCESS:
            return {loading: false, success: true}
        case FUND_ADD_TRANSACTION_FAIL:
            return {loading: false, error: action.payload}
        case FUND_ADD_TRANSACTION_RESET:
            return {}
        default:
            return state
    }
}
