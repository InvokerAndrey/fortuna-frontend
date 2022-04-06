import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Form, Button, InputGroup } from 'react-bootstrap'

import { FUND_ADD_TRANSACTION_RESET } from '../../constants/fundConstants'

import { FundTransactionTypeEnum } from '../../../constants/enums'
import TransactionService from '../../services/TransactionService'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import FormContainer from '../../../components/FormContainer'


export default () => {
    const transactionService = new TransactionService()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const redirect = Location.search ? Location.search.split('=')[1] : '/'

    const [type, setType] = useState(0)
    const [amount, setAmount] = useState(0)
    const [message, setMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const fundAddTransaction = useSelector(state => state.fundAddTransaction)
    const {loading: loadingTransaction, error: errorTransaction, success: successTransaction} = fundAddTransaction

    useEffect(() => {
        if (!userInfo.is_staff) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    useEffect(() => {
        if (successTransaction) {
            dispatch({type: FUND_ADD_TRANSACTION_RESET})
            navigate(`/admin/fund`)
        }
    }, [dispatch, successTransaction, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (amount <= 0) {
            setMessage('Invalid amount')
        } else {
            dispatch(transactionService.addFundTransaction(type, amount))
        }
    }

    return (
        <>
        <Button className='btn btn-dark my-3' onClick={() => navigate(-1)}>
                Back
        </Button>
        <FormContainer>
            <h1>Add Fund Transaction</h1>
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
                            [...FundTransactionTypeEnum.getIdList()].map((x) => (
                                <option key={x} value={x}>
                                    {FundTransactionTypeEnum.getVerboseById(x)}
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
        </>
    )
}
