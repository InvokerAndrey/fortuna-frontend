import axios from 'axios'
import { 
    PLAYER_ROOM_LIST_REQUEST,
    PLAYER_ROOM_LIST_SUCCESS,
    PLAYER_ROOM_LIST_FAIL,
} from '../constants/roomConstants'


export default class RoomService {
    BASE_URL = 'api/rooms/player/room/'
    PLAYER_ROOM_LIST_URL = this.BASE_URL + 'list/'

    listPlayerRooms = () => async (dispatch, getState) => {
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
                this.PLAYER_ROOM_LIST_URL,
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
}
