import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import TransactionService from '../services/TransactionService'
import PlayerTransactions from '../components/PlayerTransactions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Pagination from '../../components/Pagination'


export default () => {

    const transactionService = new TransactionService()

    const dispatch = useDispatch()

    const playerTransactionList = useSelector(state => state.playerTransactionList)
    const {loading, error, playerTransactions, page, num_pages} = playerTransactionList

    useEffect(() => {
        dispatch(transactionService.listPlayerPlayerTransactions())
    }, [dispatch])

    return (
        <div>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <>
                                <h1>Player transactions</h1>
                                <PlayerTransactions transactions={playerTransactions} />
                            </>
                        )
            }
            <Pagination num_pages={num_pages} callback={transactionService.listPlayerPlayerTransactions} />
        </div>
    )
}
