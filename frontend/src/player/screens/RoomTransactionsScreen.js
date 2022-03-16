import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'react-bootstrap'

import TransactionService from '../services/TransactionService'
import RoomTransactions from '../components/RoomTransactions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Pagination from '../../components/Pagination'
import RoomTransactionFilter from '../components/RoomTransactionFilter'


export default () => {

    const transactionService = new TransactionService()

    const dispatch = useDispatch()

    const [sort, setSort] = useState(false)

    const roomTransactionList = useSelector(state => state.roomTransactionList)
    const {loading, error, roomTransactions, num_pages} = roomTransactionList

    useEffect(() => {
        dispatch(transactionService.listPlayerRoomTransactions())
    }, [dispatch, sortHandler])

    const sortHandler = (field) => {
        setSort(!sort)
        if (sort) dispatch(transactionService.listPlayerRoomTransactions({'sort': field}))
        else dispatch(transactionService.listPlayerRoomTransactions())
    }

    return (
        <div>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <>
                                <h1>Room transactions</h1>
                                <Row>
                                    <Col md={2}>
                                        <RoomTransactionFilter />
                                    </Col>
                                    <Col>
                                        <RoomTransactions transactions={roomTransactions} sortHandler={sortHandler} />
                                    </Col>
                                </Row>
                            </>
                        )
            }
            <Pagination num_pages={num_pages} callback={transactionService.listPlayerRoomTransactions} />
        </div>
    )
}
