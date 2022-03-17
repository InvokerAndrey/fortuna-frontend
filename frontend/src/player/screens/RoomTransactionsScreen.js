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

    const [filterParams, setFilterParams] = useState({
        start_date: null,
        end_date: null,
        order: '-created_at',
        type: 0
    })

    const roomTransactionList = useSelector(state => state.roomTransactionList)
    const {loading, error, roomTransactions, num_pages} = roomTransactionList

    useEffect(() => {
        dispatch(transactionService.listPlayerRoomTransactions())
    }, [dispatch, filterHandler, setFilterParams])

    const filterHandler = (startDate, endDate, order, type) => {
        const params = {
            start_date: startDate,
            end_date: endDate,
            order: order,
            type: type,
        }
        
        setFilterParams(params)
        dispatch(transactionService.listPlayerRoomTransactions(params))
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
                                        <RoomTransactionFilter filterHandler={filterHandler} filterParams={filterParams} />
                                    </Col>
                                    <Col>
                                        <RoomTransactions transactions={roomTransactions} />
                                    </Col>
                                </Row>
                            </>
                        )
            }
            <Pagination num_pages={num_pages} callback={transactionService.listPlayerRoomTransactions} params={filterParams} />
        </div>
    )
}
