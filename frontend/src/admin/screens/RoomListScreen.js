import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import RoomService from "../services/RoomService";
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Room from '../components/Room'


export default () => {

    const roomService = new RoomService()

    const dispatch = useDispatch()

    const roomList = useSelector(state => state.roomList)   
    const {loading, error, rooms} = roomList 

    useEffect(() => {
        dispatch(roomService.listRooms())
    }, [dispatch])

    return (
        <div>
            <h1>Rooms</h1>
            {
                loading ? <h2><Loader /></h2>
                    : error ? <Message variant='danger'>{error}</Message> 
                        :
                        <Row>
                            {rooms.map(room => (
                                <Col sm={12} md={6} lg={4} xl={3} key={room.id}>
                                    <Room room={room} />
                                </Col>
                            ))}
                        </Row>
            }
        </div>
    )
}