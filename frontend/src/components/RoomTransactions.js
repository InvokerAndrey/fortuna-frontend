import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import moment from 'moment'

import { FcPlus } from 'react-icons/fc'

import { RoomTransactionTypeEnum } from '../constants/enums'

import TransactionService from '../player/services/TransactionService'
import Pagination from './Pagination'
import Loader from './Loader'
import Message from './Message'
import RoomTransactionFilter from './RoomTransactionFilter'


export default ({userID, showAdd}) => {

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
        if (userID) {
            dispatch(transactionService.listPlayerRoomTransactions(userID))
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
        dispatch(transactionService.listPlayerRoomTransactions(userID, params))
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
                                        <RoomTransactionFilter filterHandler={filterHandler} filterParams={filterParams} />
                                    </Col>
                                    <Col>
                                        <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>TYPE</th>
                                                    <th>AMOUNT</th>
                                                    <th>ROOM</th>
                                                    <th>DATE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    showAdd ?
                                                        <LinkContainer to={`/add/room-transaction/`}>
                                                            <tr title='Add new Room Transaction'>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td><FcPlus /></td>
                                                            </tr>
                                                        </LinkContainer>
                                                        : <></>
                                                }
                                                
                                                {roomTransactions.map(transaction => (
                                                    <tr key={transaction.id}>
                                                        <td>{transaction.id}</td>
                                                        <td>{RoomTransactionTypeEnum.getVerboseById(transaction.type)}</td>
                                                        <td>${transaction.amount}</td>
                                                        <td>{transaction.room_name}</td>
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
            <Pagination num_pages={num_pages} callback={transactionService.listPlayerRoomTransactions} args={[userID]} params={filterParams} />
        </>
    )
}