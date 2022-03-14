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

    ROOM_ADD_REQUEST,
    ROOM_ADD_SUCCESS,
    ROOM_ADD_FAIL,

    ROOM_DELETE_REQUEST,
    ROOM_DELETE_SUCCESS,
    ROOM_DELETE_FAIL,
} from '../constants/roomConstants'


export default class RoomService {
    BASE_URL = 'api/rooms/'
    LIST_URL = this.BASE_URL + 'list/'
    PLAYERS_URL = 'players/'
    ADD_URL = this.BASE_URL + 'add/'
    DELETE_URL = 'delete/'

    listRooms = (params={}) => async (dispatch, getState) => {
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
                },
                params
            }

            const {data} = await axios.get(this.LIST_URL, config)

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

    getRoomPlayers = (id, params={}) => async (dispatch, getState) => {
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
                },
                params
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

    addRoom = (name, description, website) => async (dispatch, getState) => {
        try {
            dispatch({
                type: ROOM_ADD_REQUEST,
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

            const {data} = await axios.post(this.ADD_URL,
                {
                    name,
                    description,
                    website
                }, 
                config)

            dispatch({
                type: ROOM_ADD_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: ROOM_ADD_FAIL,
                payload: error.response && error.response.data.details
                    ? error.response.data.details
                        : error.message,
            })
        }
    }

    deleteRoom = (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: ROOM_DELETE_REQUEST,
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

            const {data} = await axios.delete(this.BASE_URL + `${id}/` + this.DELETE_URL, config)

            dispatch({
                type: ROOM_DELETE_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: ROOM_DELETE_FAIL,
                payload: error.response && error.response.data.details
                    ? error.response.data.details
                        : error.message,
            })
        }
    }
}
