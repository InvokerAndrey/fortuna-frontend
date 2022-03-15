import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import TransactionService from '../services/TransactionService'
import RoomTransactions from '../components/RoomTransactions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Pagination from '../../components/Pagination'


export default () => {

    const transactionService = new TransactionService()

    const dispatch = useDispatch()

    const roomTransactionList = useSelector(state => state.roomTransactionList)
    const {loading, error, roomTransactions, page, num_pages} = roomTransactionList

    useEffect(() => {
        dispatch(transactionService.listPlayerRoomTransactions())
    }, [dispatch])

    return (
        <div>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : <RoomTransactions transactions={roomTransactions} />
            }
            <Pagination num_pages={num_pages} callback={transactionService.listPlayerRoomTransactions} />
        </div>
    )
}
