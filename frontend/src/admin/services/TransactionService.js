import axios from 'axios'
import {
    PLAYER_ADD_TRANSACTION_REQUEST,
    PLAYER_ADD_TRANSACTION_SUCCESS,
    PLAYER_ADD_TRANSACTION_FAIL,

    PLAYER_LIST_PLAYER_TRANSACTIONS_REQUEST,
    PLAYER_LIST_PLAYER_TRANSACTIONS_SUCCESS,
    PLAYER_LIST_PLAYER_TRANSACTIONS_FAIL,

    PLAYER_LIST_ROOM_TRANSACTIONS_REQUEST,
    PLAYER_LIST_ROOM_TRANSACTIONS_SUCCESS,
    PLAYER_LIST_ROOM_TRANSACTIONS_FAIL,
} from '../constants/playerConstants'
import {
    FUND_LIST_TRANSACTIONS_REQUEST,
    FUND_LIST_TRANSACTIONS_SUCCESS,
    FUND_LIST_TRANSACTIONS_FAIL,

    FUND_ADD_TRANSACTION_REQUEST,
    FUND_ADD_TRANSACTION_SUCCESS,
    FUND_ADD_TRANSACTION_FAIL,
} from '../constants/fundConstants'


export default class TransactionService {
    BASE_URL = 'api/transactions/'
    ADD_PLAYER_TRANSACTION_URL = this.BASE_URL + 'add/player-transaction/'
    LIST_PLAYER_TRANSACTIONS_URL = 'player-transactions/'
    LIST_ROOM_TRANSACTIONS_URL = 'room-transactions/'

    addPlayerTransaction = (playerId, type, amount) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PLAYER_ADD_TRANSACTION_REQUEST,
            })

            const {
                userLogin: {userInfo}
            } = getState()

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            await axios.post(
                this.ADD_PLAYER_TRANSACTION_URL,
                {
                    'player_id': playerId,
                    'type': +type,
                    'amount': +amount,
                },
                config
            )

            dispatch({
                type: PLAYER_ADD_TRANSACTION_SUCCESS
            })
        } catch (error) {
            dispatch({
                type: PLAYER_ADD_TRANSACTION_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    listPLayerTransactions = (id, params={}) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PLAYER_LIST_PLAYER_TRANSACTIONS_REQUEST,
            })

            const {
                userLogin: {userInfo}
            } = getState()

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                params
            }

            const {data} = await axios.get(
                this.BASE_URL + `player/${id}/` + this.LIST_PLAYER_TRANSACTIONS_URL,
                config
            )

            dispatch({
                type: PLAYER_LIST_PLAYER_TRANSACTIONS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PLAYER_LIST_PLAYER_TRANSACTIONS_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    listRoomTransactions = (id, params={}) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PLAYER_LIST_ROOM_TRANSACTIONS_REQUEST,
            })

            const {
                userLogin: {userInfo}
            } = getState()

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                params
            }

            const {data} = await axios.get(
                this.BASE_URL + `player/${id}/` + this.LIST_ROOM_TRANSACTIONS_URL,
                config
            )

            dispatch({
                type: PLAYER_LIST_ROOM_TRANSACTIONS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PLAYER_LIST_ROOM_TRANSACTIONS_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    listFundTransactions = (params={}) => async (dispatch, getState) => {
        try {
            dispatch({
                type: FUND_LIST_TRANSACTIONS_REQUEST,
            })

            const {
                userLogin: {userInfo}
            } = getState()

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                params
            }

            const {data} = await axios.get(
                this.BASE_URL + 'fund-transactions/',
                config
            )

            dispatch({
                type: FUND_LIST_TRANSACTIONS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: FUND_LIST_TRANSACTIONS_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    addFundTransaction = (type, amount) => async (dispatch, getState) => {
        try {
            dispatch({
                type: FUND_ADD_TRANSACTION_REQUEST,
            })

            const {
                userLogin: {userInfo}
            } = getState()

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            await axios.post(
                this.BASE_URL + 'add/fund-transaction/',
                {
                    'type': +type,
                    'amount': +amount,
                },
                config
            )

            dispatch({
                type: FUND_ADD_TRANSACTION_SUCCESS
            })
        } catch (error) {
            dispatch({
                type: FUND_ADD_TRANSACTION_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }
}
