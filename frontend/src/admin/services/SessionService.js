import axios from 'axios'
import {
    SESSIONS_STATISTICS_REQUEST,
    SESSIONS_STATISTICS_SUCCESS,
    SESSIONS_STATISTICS_FAIL,
} from '../../player/constants/sessionConstants'


export default class SessionService {
    BASE_URL = 'api/sessions/'

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
                this.BASE_URL + `${id}/statistics/`,
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