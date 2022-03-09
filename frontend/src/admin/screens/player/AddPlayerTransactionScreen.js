import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

import { PLAYER_ADD_TRANSACTION_RESET, PlayerTransactionTypeEnum } from '../../constants/playerConstants'

import PlayerService from '../../services/PlayerService'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import FormContainer from '../../../components/FormContainer'


export default () => {
    const playerService = new PlayerService()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { player_id } = useParams()

    const redirect = Location.search ? Location.search.split('=')[1] : '/'

    const [type, setType] = useState(0)
    const [amount, setAmount] = useState(0)
    const [message, setMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const playerAddTransaction = useSelector(state => state.playerAddTransaction)
    const {loading: loadingTransaction, error: errorTransaction, success: successTransaction} = playerAddTransaction

    useEffect(() => {
        if (!userInfo.is_staff) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    useEffect(() => {
        if (successTransaction) {
            navigate(`/admin/players/${player_id}`)
            dispatch({type: PLAYER_ADD_TRANSACTION_RESET})
        }
    }, [dispatch, successTransaction, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (amount <= 0) {
            setMessage('Invalid amount')
        } else {
            dispatch(playerService.addPlayerTransaction(player_id, type, amount))
        }
    }

    return (
        
        <FormContainer>
            <h1>Register New Player</h1>
            {errorRegister && <Message variant='danger'>{errorRegister}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loadingRegister && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='type' className='my-4'>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        required
                        as='select'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        {
                            (PlayerTransactionTypeEnum.getIdList().concat('')).map((x) => (
                                <option key={x} value={x}>
                                    {TypeEnum.getVerboseById(x)}
                                </option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='amount' className='my-4'>
                    <Form.Label>Amount</Form.Label>
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
