import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Form, Button, InputGroup } from 'react-bootstrap'

import { PLAYER_ADD_TRANSACTION_RESET } from '../../constants/playerConstants'

import { PlayerTransactionTypeEnum } from '../../../constants/enums'
import TransactionService from '../../services/TransactionService'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import FormContainer from '../../../components/FormContainer'


export default () => {
    const transactionService = new TransactionService()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { id } = useParams()

    const player_id = id

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
            dispatch({type: PLAYER_ADD_TRANSACTION_RESET})
            navigate(`/admin/players/${player_id}`)
        }
    }, [dispatch, successTransaction, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (amount <= 0) {
            setMessage('Invalid amount')
        } else {
            console.log(player_id, type, amount)
            dispatch(transactionService.addPlayerTransaction(player_id, type, amount))
        }
    }

    return (
        
        <FormContainer>
            <h1>Add Player Transaction</h1>
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
                        <option value={''}></option>
                        {
                            [...PlayerTransactionTypeEnum.getIdList()].map((x) => (
                                <option key={x} value={x}>
                                    {PlayerTransactionTypeEnum.getVerboseById(x)}
                                </option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Label>Amount</Form.Label>
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
