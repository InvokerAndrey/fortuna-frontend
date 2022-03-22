import axios from 'axios'
import {
    PROFILE_DETAILS_REQUEST,
    PROFILE_DETAILS_SUCCESS,
    PROFILE_DETAILS_FAIL,
} from '../constants/profileConstants'


export default class PlayerService {
    BASE_URL = 'api/users/player/'

    getProfileDetails = (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PROFILE_DETAILS_REQUEST,
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
                this.BASE_URL + `user/${id}/profile/`,
                config
            )

            dispatch({
                type: PROFILE_DETAILS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PROFILE_DETAILS_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }
}
