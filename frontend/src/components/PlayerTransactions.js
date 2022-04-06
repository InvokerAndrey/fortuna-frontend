import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FcPlus } from 'react-icons/fc'

import moment from 'moment'

import { PlayerTransactionTypeEnum } from '../constants/enums'

import TransactionService from '../player/services/TransactionService'
import Pagination from './Pagination'
import Loader from './Loader'
import Message from './Message'
import PlayerTransactionFilter from './PlayerTransactionFilter'


export default ({userID, showAdd}) => {

    const transactionService = new TransactionService()

    const dispatch = useDispatch()

    const [filterParams, setFilterParams] = useState({
        start_date: null,
        end_date: null,
        order: '-created_at',
        type: 0
    })

    const playerTransactionList = useSelector(state => state.playerTransactionList)
    const {loading, error, playerTransactions, num_pages} = playerTransactionList

    useEffect(() => {
        if (userID) {
            dispatch(transactionService.listPlayerPlayerTransactions(userID))
        }
    }, [dispatch, userID])

    const filterHandler = (startDate, endDate, order, type) => {
        const params = {
            start_date: startDate,
            end_date: endDate,
            order: order,
            type: type,
        }
        
        setFilterParams(params)
        dispatch(transactionService.listPlayerPlayerTransactions(userID, params))
    }

    return (
        <>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <>
                                <Row>
                                    <Col md={2}>
                                        <PlayerTransactionFilter filterHandler={filterHandler} filterParams={filterParams} />
                                    </Col>
                                    <Col>
                                        <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>TYPE</th>
                                                    <th>AMOUNT</th>
                                                    <th>ADMIN</th>
                                                    <th>DATE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    showAdd ?
                                                        <LinkContainer to={`add/player-transaction/`}>
                                                            <tr title='Add new Player Transaction'>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td><FcPlus /></td>
                                                            </tr>
                                                        </LinkContainer>
                                                        : <></>
                                                }
                                                {playerTransactions.map(transaction => (
                                                    <tr key={transaction.id}>
                                                        <td>{transaction.id}</td>
                                                        <td>{PlayerTransactionTypeEnum.getVerboseById(transaction.type)}</td>
                                                        {
                                                            transaction.type === PlayerTransactionTypeEnum.PLAYER_TO_ADMIN_PROFIT ?
                                                                <td>{transaction.admin_share}/{transaction.player_share}$</td>
                                                                : <td>${transaction.amount}</td>
                                                        }
                                                        <td>{transaction.admin}</td>
                                                        <td>{moment(transaction.created_at).format('DD.MM.YYYY')}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                
                            </>
                        )
            }
            <Pagination num_pages={num_pages} callback={transactionService.listPlayerPlayerTransactions} args={[userID]} params={filterParams} />
        </>
        
    )
}
