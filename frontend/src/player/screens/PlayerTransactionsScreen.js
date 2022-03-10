import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import TransactionService from '../services/TransactionService'
import PlayerTransactions from '../components/PlayerTransactions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {

    const transactionService = new TransactionService()

    const dispatch = useDispatch()

    const playerTransactionList = useSelector(state => state.playerTransactionList)
    const {loading, error, playerTransactions} = playerTransactionList

    useEffect(() => {
        dispatch(transactionService.listPlayerPlayerTransactions())
    }, [dispatch])

    return (
        <div>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : <PlayerTransactions transactions={playerTransactions} />
            }
        </div>
    )
}
