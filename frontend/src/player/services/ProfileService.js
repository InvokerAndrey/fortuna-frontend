import axios from 'axios'
import {
    PROFILE_DETAILS_REQUEST,
    PROFILE_DETAILS_SUCCESS,
    PROFILE_DETAILS_FAIL,
} from '../constants/profileConstants'


export default class PlayerService {
    BASE_URL = 'api/users/player/'
    PLAYER_PROFILE_DETAILS_URL = this.BASE_URL + 'profile/'

    getProfileDetails = () => async (dispatch, getState) => {
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

            const {data} = await axios.get(this.PLAYER_PROFILE_DETAILS_URL, config)

            dispatch({
                type: PROFILE_DETAILS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PROFILE_DETAILS_FAIL,
                payload: error.response && error.response.data.details.non_field_errors
                    ? error.response.data.details.non_field_errors.join('. ')
                        : error.message,
            })
        }
    }
}
