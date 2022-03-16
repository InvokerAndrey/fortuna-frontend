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
} from '../constants/sessionConstants'


export default class SessionService {
    BASE_URL = 'api/sessions/'
    SESSION_LIST_URL = this.BASE_URL + 'list/'
    SESSION_DETAILS_URL = this.BASE_URL
    SESSION_CREATE_URL = this.BASE_URL + 'create/'

    listPlayerSessions = (params={}) => async (dispatch, getState) => {
        try {
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
                this.SESSION_LIST_URL,
                config,
            )

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
                this.SESSION_DETAILS_URL + `${id}/`,
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

    createSession = (session={}) => async (dispatch, getState) => {
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
                this.SESSION_CREATE_URL,
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
}
