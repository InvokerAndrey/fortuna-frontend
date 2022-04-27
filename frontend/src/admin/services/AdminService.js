import axios from 'axios'
import {
    ADMIN_LIST_REQUEST,
    ADMIN_LIST_SUCCESS,
    ADMIN_LIST_FAIL,

    ADMIN_DETAILS_REQUEST,
    ADMIN_DETAILS_SUCCESS,
    ADMIN_DETAILS_FAIL,

    ADMIN_REGISTER_REQUEST,
    ADMIN_REGISTER_SUCCESS,
    ADMIN_REGISTER_FAIL,
} from '../constants/adminConstants'


export default class AdminService {
    BASE_URL = 'api/users/admin/'
    LIST_URL = this.BASE_URL + 'list/'
    REGISTER_URL = this.BASE_URL + 'register/'

    listAdmins = (params={}) => async (dispatch, getState) => {
        try {
            dispatch({
                type: ADMIN_LIST_REQUEST,
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
                type: ADMIN_LIST_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: ADMIN_LIST_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    getAdminDetails = (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: ADMIN_DETAILS_REQUEST,
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

            const {data} = await axios.get(this.BASE_URL + `${id}/profile/`, config)

            dispatch({
                type: ADMIN_DETAILS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: ADMIN_DETAILS_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }

    register = (email, firstName, lastName, rate, password) => async (dispatch, getState) => {
        try {
            dispatch({
                type: ADMIN_REGISTER_REQUEST,
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

            await axios.post(
                this.REGISTER_URL,
                {
                    'email': email,
                    'first_name': firstName,
                    'last_name': lastName,
                    'rate': rate,
                    'password': password,
                },
                config
            )

            dispatch({
                type: ADMIN_REGISTER_SUCCESS
            })
        } catch (error) {
            dispatch({
                type: ADMIN_REGISTER_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                        : error.message,
            })
        }
    }
}
