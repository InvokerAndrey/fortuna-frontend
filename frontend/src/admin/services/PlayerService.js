import axios from 'axios'
import {
    PLAYER_LIST_REQUEST,
    PLAYER_LIST_SUCCESS,
    PLAYER_LIST_FAIL,

    PLAYER_DETAILS_REQUEST,
    PLAYER_DETAILS_SUCCESS,
    PLAYER_DETAILS_FAIL,

    PLAYER_REGISTER_REQUEST,
    PLAYER_REGISTER_SUCCESS,
    PLAYER_REGISTER_FAIL,

    PLAYER_DELETE_REQUEST,
    PLAYER_DELETE_SUCCESS,
    PLAYER_DELETE_FAIL,
} from '../constants/playerConstants'


export default class PlayerService {
    BASE_URL = 'api/users/player/'
    LIST_URL = this.BASE_URL + 'list/'
    REGISTER_URL = this.BASE_URL + 'register/'
    DELETE_URL = 'delete/'
    ADD_TRANSACTION_URL = 'add/player-transaction/'

    listPlayers = () => async (dispatch, getState) => {
        try {
            dispatch({
                type: PLAYER_LIST_REQUEST,
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

            const {data} = await axios.get(this.LIST_URL, config)

            dispatch({
                type: PLAYER_LIST_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PLAYER_LIST_FAIL,
                payload: error.response && error.response.data.details
                    ? error.response.data.details
                        : error.message,
            })
        }
    }

    getPlayerDetails = (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PLAYER_DETAILS_REQUEST,
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

            const {data} = await axios.get(this.BASE_URL + `${id}`, config)

            dispatch({
                type: PLAYER_DETAILS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PLAYER_DETAILS_FAIL,
                payload: error.response && error.response.data.details
                    ? error.response.data.details
                        : error.message,
            })
        }
    }

    register = (email, firstName, lastName, rate, password) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PLAYER_REGISTER_REQUEST,
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
                this.REGISTER_URL,
                {
                    'email': email,
                    'first_name': firstName,
                    'last_name': lastName,
                    'rate': rate,
                    'password': password,
                },
                config
            )

            dispatch({
                type: PLAYER_REGISTER_SUCCESS
            })
        } catch (error) {
            dispatch({
                type: PLAYER_REGISTER_FAIL,
                payload: error.response && error.response.data.details
                    ? error.response.data.details
                        : error.message,
            })
        }
    }

    delete = (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PLAYER_DELETE_REQUEST,
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

            await axios.delete(
                this.BASE_URL + `${id}/` + this.DELETE_URL,
                config
            )

            dispatch({
                type: PLAYER_DELETE_SUCCESS
            })
        } catch (error) {
            dispatch({
                type: PLAYER_DELETE_FAIL,
                payload: error.response && error.response.data.details
                    ? error.response.data.details
                        : error.message,
            })
        }
    }
}
