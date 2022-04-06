import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FcPlus } from 'react-icons/fc'

import moment from 'moment'

import { FundTransactionTypeEnum } from '../../constants/enums'

import TransactionService from '../services/TransactionService'
import Pagination from '../../components/Pagination'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FundTransactionFilter from './FundTransactionFilter'


export default () => {

    const transactionService = new TransactionService()

    const dispatch = useDispatch()

    const [filterParams, setFilterParams] = useState({
        start_date: null,
        end_date: null,
        order: '-created_at',
        type: 0
    })

    const fundTransactionList = useSelector(state => state.fundTransactionList)
    const {loading, error, transactions, num_pages} = fundTransactionList

    useEffect(() => {
        dispatch(transactionService.listFundTransactions())
    }, [dispatch])

    const filterHandler = (startDate, endDate, order, type) => {
        const params = {
            start_date: startDate,
            end_date: endDate,
            order: order,
            type: type,
        }

        setFilterParams(params)
        dispatch(transactionService.listFundTransactions(params))
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
                                        <FundTransactionFilter filterHandler={filterHandler} filterParams={filterParams} />
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
                                                <LinkContainer to={`add/fund-transaction/`}>
                                                    <tr title='Add new Fund Transaction'>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td><FcPlus /></td>
                                                    </tr>
                                                </LinkContainer>
                                                {transactions.map(transaction => (
                                                    <tr key={transaction.id}>
                                                        <td>{transaction.id}</td>
                                                        <td>{FundTransactionTypeEnum.getVerboseById(transaction.type)}</td>
                                                        <td>${transaction.amount}</td>
                                                        <td>{transaction.admin_name}</td>
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
            <Pagination num_pages={num_pages} callback={transactionService.listFundTransactions} params={filterParams} />
        </>
    )
}
