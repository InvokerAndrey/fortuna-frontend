import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'react-bootstrap'

import TransactionService from '../services/TransactionService'
import PlayerTransactions from '../components/PlayerTransactions'
import PlayerTransactionFilter from '../components/PlayerTransactionFilter'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Pagination from '../../components/Pagination'


export default () => {

    const transactionService = new TransactionService()

    const dispatch = useDispatch()

    const [filterParams, setFilterParams] = useState({
        start_date: null,
        end_date: null,
        order: '-created_at',
        type: 0
    })

    const playerTransactionList = useSelector(state => state.playerTransactionList)
    const {loading, error, playerTransactions, page, num_pages} = playerTransactionList

    useEffect(() => {
        dispatch(transactionService.listPlayerPlayerTransactions())
    }, [dispatch])

    const filterHandler = (startDate, endDate, order, type) => {
        const params = {
            start_date: startDate,
            end_date: endDate,
            order: order,
            type: type,
        }
        
        setFilterParams(params)
        dispatch(transactionService.listPlayerPlayerTransactions(params))
    }

    return (
        <div>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <>
                                <h1>Player transactions</h1>
                                <Row>
                                    <Col md={2}>
                                        <PlayerTransactionFilter filterHandler={filterHandler} filterParams={filterParams} />
                                    </Col>
                                    <Col>
                                        <PlayerTransactions transactions={playerTransactions} />
                                    </Col>
                                </Row>
                                
                            </>
                        )
            }
            <Pagination num_pages={num_pages} callback={transactionService.listPlayerPlayerTransactions} params={filterParams} />
        </div>
    )
}
