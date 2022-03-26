import axios from 'axios'
import { 
    SESSION_LIST_REQUEST,
    SESSION_LIST_SUCCESS,
    SESSION_LIST_FAIL,

    SESSION_DETAILS_REQUEST,
    SESSION_DETAILS_SUCCESS,
    SESSION_DETAILS_FAIL,

    SESSION_CREATE_REQUEST,
    SESSION_CREATE_SUCCESS,
    SESSION_CREATE_FAIL,

    ROOM_SESSIONS_STATISTICS_REQUEST,
    ROOM_SESSIONS_STATISTICS_SUCCESS,
    ROOM_SESSIONS_STATISTICS_FAIL,

    SESSIONS_STATISTICS_REQUEST,
    SESSIONS_STATISTICS_SUCCESS,
    SESSIONS_STATISTICS_FAIL,
} from '../constants/sessionConstants'


export default class SessionService {
    BASE_URL = 'api/sessions/'

    listPlayerSessions = (id, params={}) => async (dispatch, getState) => {
        try {
            console.log('ID:', id)
            dispatch({
                type: SESSION_LIST_REQUEST,
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
                this.BASE_URL + `user/${id}/list/`,
                config,
            )

            console.log('data:', data)

            dispatch({
                type: SESSION_LIST_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: SESSION_LIST_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    getPlayerSession = (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: SESSION_DETAILS_REQUEST,
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
                type: SESSION_DETAILS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: SESSION_DETAILS_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    createSession = (id, session={}) => async (dispatch, getState) => {
        try {
            dispatch({
                type: SESSION_CREATE_REQUEST,
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

            const {data} = await axios.post(
                this.BASE_URL + `user/${id}/create/`,
                session,
                config
            )

            dispatch({
                type: SESSION_CREATE_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: SESSION_CREATE_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    getRoomSessionStatistics = (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: ROOM_SESSIONS_STATISTICS_REQUEST,
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
                this.BASE_URL + `player-room/${id}/statistics/`,
                config
            )

            dispatch({
                type: ROOM_SESSIONS_STATISTICS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: ROOM_SESSIONS_STATISTICS_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    getSessionStatistics = (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: SESSIONS_STATISTICS_REQUEST,
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
                this.BASE_URL + `user/${id}/statistics/`,
                config
            )

            dispatch({
                type: SESSIONS_STATISTICS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: SESSIONS_STATISTICS_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }
}
