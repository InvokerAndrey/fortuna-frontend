import axios from 'axios'
import {
    FUND_DETAILS_REQUEST,
    FUND_DETAILS_SUCCESS,
    FUND_DETAILS_FAIL,
} from '../constants/fundConstants'



export default class FundService {
    BASE_URL = 'api/users/fund/'

    getFundDetails = () => async (dispatch, getState) => {
        try {
            dispatch({
                type: FUND_DETAILS_REQUEST,
            })

            const {
                userLogin: {userInfo}
            } = getState()

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
            }

            const {data} = await axios.get(
                this.BASE_URL + 'details/',
                config
            )

            dispatch({
                type: FUND_DETAILS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: FUND_DETAILS_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }
}
