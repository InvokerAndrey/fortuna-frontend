import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

import { ROOM_ADD_RESET } from '../../constants/roomConstants'

import RoomService from '../../services/RoomService'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import FormContainer from '../../../components/FormContainer'


export default () => {
    const roomService = new RoomService()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const redirect = Location.search ? Location.search.split('=')[1] : '/'

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [website, setWebsite] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const roomAdd = useSelector(state => state.roomAdd)
    const {loading, error, success} = roomAdd

    useEffect(() => {
        if (!userInfo.is_staff) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    useEffect(() => {
        if (success) {
            dispatch({type: ROOM_ADD_RESET})
            navigate('/admin/rooms')
        }
    }, [success, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(roomService.addRoom(name, description, website))
    }

    return (
        <FormContainer>
            <h1>Add New Room</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-4'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='description' className='my-4'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        as='textarea'
                        placeholder='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='website' className='my-4'>
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='website'
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button className='btn btn-block mt-3' type='submit' variant='dark'>Add</Button>
            </Form>
        </FormContainer>
    )
}
