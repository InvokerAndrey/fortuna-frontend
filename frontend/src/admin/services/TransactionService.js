import axios from 'axios'
import {
    PLAYER_ADD_TRANSACTION_REQUEST,
    PLAYER_ADD_TRANSACTION_SUCCESS,
    PLAYER_ADD_TRANSACTION_FAIL,
} from '../constants/playerConstants'


export default class TransactionService {
    BASE_URL = 'api/transactions/'
    ADD_PLAYER_TRANSACTION_URL = this.BASE_URL + 'add/player-transaction/'

    addPlayerTransaction = (player_id, type, amount) => async (dispatch, getState) => {
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
                this.ADD_PLAYER_TRANSACTION_URL + `${player_id}/`,
                {
                    'type': type,
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
                payload: error.response && error.response.data.details
                    ? error.response.data.details
                        : error.message,
            })
        }
    }
}
