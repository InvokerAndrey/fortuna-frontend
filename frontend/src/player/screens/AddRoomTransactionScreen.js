import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Form, Button, InputGroup } from 'react-bootstrap'

import { ROOM_TRANSACTION_ADD_RESET } from '../constants/transactionConstants'
import { RoomTransactionTypeEnum } from '../../constants/enums'
import TransactionService from '../services/TransactionService'
import RoomService from '../services/RoomService'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'


export default () => {
    const transactionService = new TransactionService()
    const roomService = new RoomService()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [type, setType] = useState()
    const [amount, setAmount] = useState(0)
    const [roomId, setRoomId] = useState()
    const [message, setMessage] = useState('')


    const redirect = Location.search ? Location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const roomTransactionAdd = useSelector(state => state.roomTransactionAdd)
    const {loading: loadingTransaction, error: errorTransaction, success: successTransaction} = roomTransactionAdd

    const playerRoomList = useSelector(state => state.playerRoomList)
    const {loading: loadingRooms, error: errorRooms, rooms} = playerRoomList

    useEffect(() => {
        if (!userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    useEffect(() => {
        dispatch(roomService.listPlayerRooms())
        if (successTransaction) {
            dispatch({type: ROOM_TRANSACTION_ADD_RESET})
            navigate(`/player/room-transactions`)
        }
    }, [dispatch, successTransaction, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('id:', roomId, 'type:', type)
        if (amount <= 0) {
            setMessage('Invalid amount')
        } else {
            dispatch(transactionService.addRoomTransaction(roomId, type, amount))
        }
    }

    return (
        
        <FormContainer>
            <h1>Add Room Transaction</h1>
            {errorTransaction && <Message variant='danger'>{errorTransaction}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loadingTransaction && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='type' className='my-4'>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        required
                        as='select'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value={''}>{}</option>
                        {
                            [...RoomTransactionTypeEnum.getIdList()].map((x) => (
                                <option key={x} value={x}>
                                    {RoomTransactionTypeEnum.getVerboseById(x)}
                                </option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>

                {
                    loadingRooms ? <Loader />
                        : errorRooms ? <Message variant='danger'>{errorRooms}</Message>
                            :
                                <>
                                    <Form.Label>Room</Form.Label>
                                    <Form.Group controlId='room'>   
                                        <Form.Control
                                            required
                                            as='select'
                                            value={roomId}
                                            onChange={(e) => setRoomId(e.target.value)}
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
                                </>
                }

                <Form.Label className='mt-4'>Amount</Form.Label>
                <Form.Group controlId='amount' className='input-group'>   
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                        required
                        type='number'
                        placeholder='$'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button className='btn btn-block mt-3' type='submit' variant='dark'>Add</Button>
            </Form>
        </FormContainer>
    )
}
