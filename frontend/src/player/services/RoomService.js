import axios from 'axios'
import { 
    PLAYER_ROOM_LIST_REQUEST,
    PLAYER_ROOM_LIST_SUCCESS,
    PLAYER_ROOM_LIST_FAIL,

    PLAYER_ROOM_DETAILS_REQUEST,
    PLAYER_ROOM_DETAILS_SUCCESS,
    PLAYER_ROOM_DETAILS_FAIL,

    PLAYER_ROOM_UPDATE_REQUEST,
    PLAYER_ROOM_UPDATE_SUCCESS,
    PLAYER_ROOM_UPDATE_FAIL,
} from '../constants/roomConstants'


export default class RoomService {
    BASE_URL = 'api/rooms/player/room/'
    PLAYER_ROOM_UPDATE_URL = 'api/rooms/player-room/'

    listPlayerRooms = (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PLAYER_ROOM_LIST_REQUEST,
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

            const {data} = await axios.get(
                this.BASE_URL + `user/${id}/list/`,
                config
            )

            dispatch({
                type: PLAYER_ROOM_LIST_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PLAYER_ROOM_LIST_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    getPlayerRoomDetails = (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PLAYER_ROOM_DETAILS_REQUEST,
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

            const {data} = await axios.get(
                this.BASE_URL + `${id}/`,
                config
            )

            dispatch({
                type: PLAYER_ROOM_DETAILS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PLAYER_ROOM_DETAILS_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    updatePlayerRoom = (playerRoom) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PLAYER_ROOM_UPDATE_REQUEST,
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

            const {data} = await axios.put(
                this.PLAYER_ROOM_UPDATE_URL + `${playerRoom.id}/` + 'update/',
                playerRoom,
                config
            )

            dispatch({
                type: PLAYER_ROOM_UPDATE_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PLAYER_ROOM_UPDATE_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }
}
