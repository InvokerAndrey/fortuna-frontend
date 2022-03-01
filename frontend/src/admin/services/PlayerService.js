import axios from 'axios'
import {
    PLAYER_LIST_REQUEST,
    PLAYER_LIST_SUCCESS,
    PLAYER_LIST_FAIL,

    PLAYER_DETAILS_REQUEST,
    PLAYER_DETAILS_SUCCESS,
    PLAYER_DETAILS_FAIL,
} from '../constants/playerConstants'


export default class PlayerService {
    BASE_URL = 'api/users/player/'
    LIST_URL = this.BASE_URL + 'list/'

    listPlayers = () => async (dispatch) => {
        try {
            dispatch({
                type: PLAYER_LIST_REQUEST,
            })

            const {data} = await axios.get(this.LIST_URL)

            dispatch({
                type: PLAYER_LIST_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PLAYER_LIST_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                        : error.message,
            })
        }
    }

    getPlayerDetails = (id) => async (dispatch) => {
        try {
            dispatch({
                type: PLAYER_DETAILS_REQUEST,
            })

            const {data} = await axios.get(this.BASE_URL + `${id}`)

            dispatch({
                type: PLAYER_DETAILS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PLAYER_DETAILS_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                        : error.message,
            })
        }
    }
}