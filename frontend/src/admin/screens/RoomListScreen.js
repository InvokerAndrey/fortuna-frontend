import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import RoomService from '../services/RoomService'
import Rooms from '../components/Rooms'

import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {

    const roomService = new RoomService()

    const dispatch = useDispatch()

    const roomList = useSelector(state => state.roomList)   
    const {loading, error, rooms} = roomList 

    useEffect(() => {
        dispatch(roomService.listRooms())
    }, [dispatch])

    const deleteHandler = (id, name) => {
        if(window.confirm(`Are you sure you want to delete ${name}?`)){
            // dispatch(deleteRoom(id))
            console.log(id)
        }
    }

    return (
        <div>
            <Row>
                <Col>
                    <h1>Rooms</h1>
                </Col>
                <Col style={{textAlign: "right"}}>
                    <LinkContainer to={'/register/player'}>
                        <Button variant='dark'>Add new room</Button>
                    </LinkContainer>
                </Col>
            </Row>
            {
                loading ? <h2><Loader /></h2>
                    : error ? <Message variant='danger'>{error}</Message> 
                        :
                        <Rooms rooms={rooms} />
            }
        </div>
    )
}