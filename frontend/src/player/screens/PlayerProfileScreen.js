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
                        :
                            <>
                                <Row className='my-4'>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <h1>{profile.user.full_name}</h1>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>{profile.user.email}</Col>
                                        </Row>
                                    </Col>
                                    
                                    <Col style={{fontWeight: 'bold'}}>
                                        <Row>
                                            <Col md={6} title='Profit share'>RATE:</Col>
                                            <Col>{profile.rate}%</Col>
                                        </Row>
                                        <Row>
                                            <Col md={6} title='Money that is not in the game'>BALANCE:</Col>
                                            <Col>{profile.balance}$</Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>TOTAL IN ROOMS:</Col>
                                            <Col>{profile.total_rooms_balance}$</Col>
                                        </Row>
                                        <Row>
                                            <Col md={6} title='How much you owe admin'>DUTY:</Col>
                                            <Col>{profile.duty}$</Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>ALL TIME PROFIT:</Col>
                                            <Col>{profile.all_time_profit}$</Col>
                                        </Row>
                                        <Row>
                                            <Col md={6} title='How much profit you owe admin'>ADMIN'S PROFIT SHARE:</Col>
                                            <Col>{profile.admin_profit_share}$</Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>PLAYER'S PROFIT SHARE:</Col>
                                            <Col>{profile.self_profit_share}$</Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>PLAYER'S SALARY:</Col>
                                            <Col>{profile.salary}$</Col>
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
