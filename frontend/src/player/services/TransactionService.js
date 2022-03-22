import axios from 'axios'
import { 
    ROOM_TRANSACTION_LIST_REQUEST,
    ROOM_TRANSACTION_LIST_SUCCESS,
    ROOM_TRANSACTION_LIST_FAIL,

    PLAYER_TRANSACTION_LIST_REQUEST,
    PLAYER_TRANSACTION_LIST_SUCCESS,
    PLAYER_TRANSACTION_LIST_FAIL,

    ROOM_TRANSACTION_ADD_REQUEST,
    ROOM_TRANSACTION_ADD_SUCCESS,
    ROOM_TRANSACTION_ADD_FAIL,
} from '../constants/transactionConstants'


export default class TransactionService {
    BASE_URL = 'api/transactions/player/'
    ROOM_TRANSACTION_ADD_URL = this.BASE_URL + 'room-transaction/add/'

    listPlayerRoomTransactions = (id, params={}) => async (dispatch, getState) => {
        try {
            dispatch({
                type: ROOM_TRANSACTION_LIST_REQUEST,
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
                this.BASE_URL + `user/${id}/room-transaction/list/`,
                config
            )

            dispatch({
                type: ROOM_TRANSACTION_LIST_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: ROOM_TRANSACTION_LIST_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    listPlayerPlayerTransactions = (id, params={}) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PLAYER_TRANSACTION_LIST_REQUEST,
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
                this.BASE_URL + `user/${id}/player-transaction/list/`,
                config
            )

            dispatch({
                type: PLAYER_TRANSACTION_LIST_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PLAYER_TRANSACTION_LIST_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    addRoomTransaction = (playerRoomId, type, amount) => async (dispatch, getState) => {
        try {
            dispatch({
                type: ROOM_TRANSACTION_ADD_REQUEST,
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
                this.ROOM_TRANSACTION_ADD_URL,
                {
                    'player_room_id': +playerRoomId,
                    'type': +type,
                    'amount': +amount,
                },
                config
            )

            dispatch({
                type: ROOM_TRANSACTION_ADD_SUCCESS
            })
        } catch (error) {
            dispatch({
                type: ROOM_TRANSACTION_ADD_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }
}
