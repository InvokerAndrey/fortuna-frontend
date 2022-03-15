import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import moment from 'moment'

import { Table } from 'react-bootstrap'

import { RoomTransactionTypeEnum } from '../../constants/enums'

import TransactionService from '../services/TransactionService'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Pagination from '../../components/Pagination'


export default ({ player }) => {

    const dispatch = useDispatch()

    const transactionService = new TransactionService()

    const playerListRoomTransactions = useSelector(state => state.playerListRoomTransactions)
    const {loading, error, transactions, num_pages} = playerListRoomTransactions

    useEffect(() => {
        dispatch(transactionService.listRoomTransactions(player.id))
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
                                        <th>ROOM</th>
                                        <th>DATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map(transaction => (
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
                        )
            }
            <Pagination num_pages={num_pages} callback={transactionService.listRoomTransactions} args={[player.id]} />
        </>
    )
}