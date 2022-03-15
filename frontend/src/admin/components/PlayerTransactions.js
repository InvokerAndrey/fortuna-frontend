import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import moment from 'moment'

import { Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { FcPlus } from 'react-icons/fc'

import { PlayerTransactionTypeEnum } from '../../constants/enums'

import TransactionService from '../services/TransactionService'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Pagination from '../../components/Pagination'


export default ({ player }) => {

    const dispatch = useDispatch()

    const transactionService = new TransactionService()

    const playerListPlayerTransactions = useSelector(state => state.playerListPlayerTransactions)
    const {loading, error, transactions, num_pages} = playerListPlayerTransactions

    useEffect(() => {
        dispatch(transactionService.listPLayerTransactions(player.id))
    }, [dispatch])

    return (
        <>
        {
            loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>TYPE</th>
                                    <th>AMOUNT</th>
                                    <th>WITH ADMIN</th>
                                    <th>DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transaction => (
                                    <tr key={transaction.id}>
                                        <td>{transaction.id}</td>
                                        <td>{PlayerTransactionTypeEnum.getVerboseById(transaction.type)}</td>
                                        <td>${transaction.amount}</td>
                                        <td>{transaction.admin_name}</td>
                                        <td>{moment(transaction.created_at).format('DD.MM.YYYY')}</td>
                                    </tr>
                                ))}
                                <LinkContainer to={`/add/player-transaction/${player.id}`}>
                                    <tr title='Add new Player Transaction'>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><FcPlus /></td>
                                    </tr>
                                </LinkContainer>
                            </tbody>
                        </Table>
                    )
        }
        <Pagination num_pages={num_pages} callback={transactionService.listPLayerTransactions} args={[player.id]} />
        </>
    )
}
