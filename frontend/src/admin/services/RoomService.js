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

    listRooms = () => async (dispatch) => {
        try {
            dispatch({
                type: ROOM_LIST_REQUEST,
            })

            const {data} = await axios.get(this.BASE_URL + this.LIST_URL)

            dispatch({
                type: ROOM_LIST_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: ROOM_LIST_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                        : error.message,
            })
        }
    }

    getRoomDetails = (id) => async (dispatch) => {
        try {
            dispatch({
                type: ROOM_DETAILS_REQUEST,
            })

            const {data} = await axios.get(this.BASE_URL + `${id}`)

            dispatch({
                type: ROOM_DETAILS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: ROOM_DETAILS_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                        : error.message,
            })
        }
    }

    getRoomPlayers = (id) => async (dispatch) => {
        try {
            dispatch({
                type: ROOM_PLAYERS_REQUEST,
            })

            const {data} = await axios.get(this.BASE_URL + `${id}/` + this.PLAYERS_URL)

            dispatch({
                type: ROOM_PLAYERS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: ROOM_PLAYERS_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                        : error.message,
            })
        }
    }
}