import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Row } from 'react-bootstrap'

import ProfileService from '../services/ProfileService'
import RoomService from '../services/RoomService'
import Rooms from '../components/Rooms'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import PlayerInfo from '../../components/PlayerInfo'


export default () => {
    const profileService = new ProfileService()
    const roomService = new RoomService()

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const playerProfileDetails = useSelector(state => state.playerProfileDetails)
    const {loading: loadingProfile, error: errorProfile, profile} = playerProfileDetails

    const playerRoomList = useSelector(state => state.playerRoomList)
    const {loading: loadingRooms, error: errorRooms, rooms} = playerRoomList

    useEffect(() => {
        dispatch(profileService.getProfileDetails(userInfo.id))
        dispatch(roomService.listPlayerRooms(userInfo.id))
    }, [dispatch])

    return (
        <div>
            {
                loadingProfile ? <Loader />
                    : errorProfile ? <Message variant='danger'>{errorProfile}</Message>
                        : <PlayerInfo profile={profile} />
            }
            {
                loadingRooms ? <Loader />
                    : errorRooms ? <Message variant='danger'>{errorRooms}</Message>
                        : profile.id ?
                            <>
                                <Row>
                                    <h3 className='mt-4'>{rooms.length} Rooms</h3>
                                    <Rooms rooms={rooms} playerId={profile.id} />
                                </Row>
                            </>
                            : <></>
            }
        </div>
    )
}
