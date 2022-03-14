import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap'

import { SESSION_CREATE_RESET } from '../constants/sessionConstants'
import SessionService from '../services/SessionService'
import RoomService from '../services/RoomService'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'


export default () => {
    const sessionService = new SessionService()
    const roomService = new RoomService()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [roomSessions, setRoomSessions] = useState([{
        room_id: null,
        result: null
    }])

    const redirect = Location.search ? Location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const sessionCreate = useSelector(state => state.sessionCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate} = sessionCreate

    const playerRoomList = useSelector(state => state.playerRoomList)
    const {loading: loadingRooms, error: errorRooms, rooms} = playerRoomList

    useEffect(() => {
        if (!userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    useEffect(() => {
        dispatch(roomService.listPlayerRooms())
        if (successCreate) {
            dispatch({type: SESSION_CREATE_RESET})
            navigate(`/player/sessions`)
        }
    }, [dispatch, successCreate, navigate])

    const addRoomSessionHandler = () => {
        const values = [...roomSessions];
        values.push({
            room_id: null,
            result: null
        });
        setRoomSessions(values);
    }

    const removeRoomSessionHandler = index => {
        const values = [...roomSessions];
        values.splice(index, 1);
        setRoomSessions(values);
    }

    const inputChangeHandler = (index, event) => {
        console.log(index, event)
        const values = [...roomSessions];
        const updatedValue = event.target.name;
        values[index][updatedValue] = +event.target.value;
        setRoomSessions(values);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const sessionObject = {
            'room_sessions': roomSessions
        }
        dispatch(sessionService.createSession(sessionObject))
    }

    return (
        <>
            <FormContainer>
                <h1>Add Session</h1>
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                {loadingCreate && <Loader />}
                <Form onSubmit={submitHandler}>
                    {
                        loadingRooms ? <Loader />
                            : errorRooms ? <Message variant='danger'>{errorRooms}</Message>
                                :
                                    roomSessions.length > 0 && (
                                        <>
                                            {
                                                roomSessions.map((field, index) => (
                                                    <div>
                                                        <Form.Label>Room</Form.Label>
                                                        <Form.Group controlId='room'>   
                                                            <Form.Control
                                                                required
                                                                as='select'
                                                                name='room_id'
                                                                value={field.room_id}
                                                                onChange={(event) => inputChangeHandler(index, event)}
                                                            >
                                                                <option value={''}>{}</option>
                                                                {
                                                                    rooms.map(room => (
                                                                        <option key={room.id} value={room.id}>
                                                                            {room.info.name}
                                                                        </option>
                                                                    ))
                                                                }
                                                                </Form.Control>
                                                        </Form.Group>

                                                        <Form.Label className='mt-4'>Result</Form.Label>
                                                        <Form.Group controlId='result' className='input-group'>   
                                                            <InputGroup.Text>$</InputGroup.Text>
                                                            <Form.Control
                                                                required
                                                                type='number'
                                                                name='result'
                                                                placeholder='$'
                                                                value={field.result}
                                                                onChange={(event) => inputChangeHandler(index, event)}
                                                            >
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Row className='my-4'>
                                                            <Col md={10}></Col>
                                                            <Col md={2}>
                                                                <Button
                                                                    variant="danger"
                                                                    onClick={() => removeRoomSessionHandler(index)}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                        
                                                    </div>
                                                ))
                                            }
                                            
                                        </>
                                    )
                    }
                    <Row>
                        <Col md={10}>
                            <Button
                                className='btn btn-block mt-3'
                                type='submit' variant='dark'
                            >
                                Submit
                            </Button>
                        </Col>
                        <Col md={2} className="d-grid gap-2">
                            <Button
                                className='btn btn-block mt-3'
                                variant='success'
                                onClick={() => addRoomSessionHandler()}
                            >
                                Add
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </FormContainer>
        </>
    )
}
