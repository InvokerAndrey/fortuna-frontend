import React from 'react'

import { Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { FcPlus } from 'react-icons/fc'

import { RoomTransactionTypeEnum } from '../../constants/enums'


export default ({transactions}) => (
    <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>TYPE</th>
                    <th>AMOUNT</th>
                    <th>ROOM</th>
                    <th>DATE</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={transaction.id}>
                        <td>{index + 1}</td>
                        <td>{RoomTransactionTypeEnum.getVerboseById(transaction.type)}</td>
                        <td>${transaction.amount}</td>
                        <td>{transaction.room_name}</td>
                        <td>{transaction.created_at}</td>
                    </tr>
                ))}
                <LinkContainer to={`/add/room-transaction/`}>
                    <tr title='Add new Room Transaction'>
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