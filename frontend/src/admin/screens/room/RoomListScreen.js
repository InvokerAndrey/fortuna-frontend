import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import RoomService from '../../services/RoomService'
import Rooms from '../../components/Rooms'

import Loader from '../../../components/Loader'
import Message from '../../../components/Message'


export default () => {

    const roomService = new RoomService()

    const dispatch = useDispatch()

    const roomList = useSelector(state => state.roomList)   
    const {loading, error, rooms, count} = roomList

    const roomDelete = useSelector(state => state.roomDelete)
    const {success: successDelete} = roomDelete

    useEffect(() => {
        dispatch(roomService.listRooms())
    }, [dispatch, successDelete])

    const deleteHandler = (id, name) => {
        if(window.confirm(`Are you sure you want to delete ${name}?`)){
            dispatch(roomService.deleteRoom(id))
        }
    }

    return (
        <div>
            <Row>
                <Col>
                    <h1>{count} Rooms</h1>
                </Col>
                <Col style={{textAlign: "right"}}>
                    <LinkContainer to={'/add/room'}>
                        <Button variant='dark'>Add new room</Button>
                    </LinkContainer>
                </Col>
            </Row>
            {
                loading ? <h2><Loader /></h2>
                    : error ? <Message variant='danger'>{error}</Message> 
                        :
                        <Rooms rooms={rooms} deleteHandler={deleteHandler} />
            }
        </div>
    )
}
