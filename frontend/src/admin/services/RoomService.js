import axios from 'axios'
import {
    ROOM_LIST_REQUEST,
    ROOM_LIST_SUCCESS,
    ROOM_LIST_FAIL,

    ROOM_DETAILS_REQUEST,
    ROOM_DETAILS_SUCCESS,
    ROOM_DETAILS_FAIL,

    ROOM_PLAYERS_REQUEST,
    ROOM_PLAYERS_SUCCESS,
    ROOM_PLAYERS_FAIL,
} from '../constants/roomConstants'


export default class RoomService {
    BASE_URL = 'api/rooms/'
    LIST_URL = 'list/'
    PLAYERS_URL = 'players/'

    listRooms = () => async (dispatch, getState) => {
        try {
            dispatch({
                type: ROOM_LIST_REQUEST,
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

            const {data} = await axios.get(this.BASE_URL + this.LIST_URL, config)

            dispatch({
                type: ROOM_LIST_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: ROOM_LIST_FAIL,
                payload: error.response && error.response.data.details
                    ? error.response.data.details
                        : error.message,
            })
        }
    }

    getRoomDetails = (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: ROOM_DETAILS_REQUEST,
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
                type: ROOM_DETAILS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: ROOM_DETAILS_FAIL,
                payload: error.response && error.response.data.details
                    ? error.response.data.details
                        : error.message,
            })
        }
    }

    getRoomPlayers = (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: ROOM_PLAYERS_REQUEST,
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

            const {data} = await axios.get(this.BASE_URL + `${id}/` + this.PLAYERS_URL, config)

            dispatch({
                type: ROOM_PLAYERS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: ROOM_PLAYERS_FAIL,
                payload: error.response && error.response.data.details
                    ? error.response.data.details
                        : error.message,
            })
        }
    }
}
