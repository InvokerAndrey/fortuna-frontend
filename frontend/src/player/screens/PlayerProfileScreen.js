import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'react-bootstrap'

import ProfileService from '../services/ProfileService'
import RoomService from '../services/RoomService'
import Rooms from '../components/Rooms'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {
    const profileService = new ProfileService()
    const roomService = new RoomService()

    const dispatch = useDispatch()

    const playerProfileDetails = useSelector(state => state.playerProfileDetails)
    const {loading: loadingProfile, error: errorProfile, profile} = playerProfileDetails

    const playerRoomList = useSelector(state => state.playerRoomList)
    const {loading: loadingRooms, error: errorRooms, rooms} = playerRoomList

    useEffect(() => {
        dispatch(profileService.getProfileDetails())
        dispatch(roomService.listPlayerRooms())
    }, [dispatch])

    return (
        <div>
            {
                loadingProfile ? <Loader />
                    : errorProfile ? <Message variant='danger'>{errorProfile}</Message>
                        :
                            <>
                                <Row className='my-4'>
                                    <Col>
                                        <h1>{profile.user.full_name}</h1>
                                    </Col>
                                    <Col style={{fontWeight: 'bold'}}>
                                        <Row>
                                            <Col md={2}>EMAIL:</Col>
                                            <Col>{profile.user.email}</Col>
                                        </Row>
                                        <Row>
                                            <Col md={2}>RATE:</Col>
                                            <Col>{profile.rate}%</Col>
                                        </Row>
                                        <Row>
                                            <Col md={2}>BALANCE:</Col>
                                            <Col>${profile.balance}</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </>
            }
            {
                loadingRooms ? <Loader />
                    : errorRooms ? <Message variant='danger'>{errorRooms}</Message>
                        : 
                            <>
                                <Row>
                                    <h3 className='mt-4'>{rooms.length} Rooms</h3>
                                    <Rooms rooms={rooms}/>
                                </Row>
                            </>
            }
        </div>
    )
}
