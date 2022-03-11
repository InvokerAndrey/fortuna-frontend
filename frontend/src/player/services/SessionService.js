import axios from 'axios'
import { 
    SESSION_LIST_REQUEST,
    SESSION_LIST_SUCCESS,
    SESSION_LIST_FAIL,

    SESSION_DETAILS_REQUEST,
    SESSION_DETAILS_SUCCESS,
    SESSION_DETAILS_FAIL,
} from '../constants/sessionConstants'


export default class SessionService {
    BASE_URL = 'api/sessions/'
    SESSION_LIST_URL = this.BASE_URL + 'list/'
    SESSION_DETAILS_URL = this.BASE_URL

    listPlayerSessions = () => async (dispatch, getState) => {
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
                }
            }

            const {data} = await axios.get(
                this.SESSION_LIST_URL,
                config
            )

            dispatch({
                type: SESSION_LIST_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: SESSION_LIST_FAIL,
                payload: error.response && error.response.data.details
                    ? error.response.data.details
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
                this.SESSION_DETAILS_URL + `${id}`,
                config
            )

            dispatch({
                type: SESSION_DETAILS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: SESSION_LIST_FAIL,
                payload: error.response && error.response.data.details
                    ? error.response.data.details
                        : error.message,
            })
        }
    }
}
