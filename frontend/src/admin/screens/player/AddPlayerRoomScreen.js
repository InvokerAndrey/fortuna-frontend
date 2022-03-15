import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

import { PLAYER_ROOM_ADD_RESET } from '../../constants/roomConstants'

import RoomService from '../../services/RoomService'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import FormContainer from '../../../components/FormContainer'


export default () => {
    const roomService = new RoomService()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { id } = useParams()

    const player_id = id

    const redirect = Location.search ? Location.search.split('=')[1] : '/'

    const [roomName, setRoomName] = useState()
    const [nickname, setNickname] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const playerRoomAdd = useSelector(state => state.playerRoomAdd)
    const {loading: loadingPlayerRoom, error: errorPlayerRoom, success: successPlayerRoom} = playerRoomAdd

    const availableRoomList = useSelector(state => state.availableRoomList)
    const {loading: loadingAvailable, error: errorAvailable, availableRooms} = availableRoomList

    useEffect(() => {
        if (!userInfo.is_staff) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    useEffect(() => {
        dispatch(roomService.listAvailableRooms(player_id))
        if (successPlayerRoom) {
            dispatch({type: PLAYER_ROOM_ADD_RESET})
            navigate(`/admin/players/${player_id}`)
        }
    }, [dispatch, successPlayerRoom, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(roomService.addPlayerRoom(player_id, roomName, nickname))
    }

    return (
        
        <FormContainer>
            <h1>Add Player Room</h1>
            {errorPlayerRoom && <Message variant='danger'>{errorPlayerRoom}</Message>}
            {loadingPlayerRoom && <Loader />}
            {errorAvailable && <Message variant='danger'>{errorAvailable}</Message>}
            {loadingAvailable && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='roomName' className='my-4'>
                    <Form.Label>Room</Form.Label>
                    <Form.Control
                        required
                        as='select'
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    >
                        <option value={''}></option>
                        {
                            availableRooms.map(availableRoom => (
                                <option key={availableRoom.id} value={availableRoom.name}>
                                    {availableRoom.name}
                                </option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Label>Nickname</Form.Label>
                <Form.Group controlId='nickname' className='input-group'>
                    <Form.Control
                        required
                        type='text'
                        placeholder='nickname'
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button className='btn btn-block mt-3' type='submit' variant='dark'>Add</Button>
            </Form>
        </FormContainer>
    )
}
