import React from 'react'

import { Table } from 'react-bootstrap'

import moment from 'moment'

import { PlayerTransactionTypeEnum } from '../../constants/enums'


export default ({transactions}) => (
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
            {transactions.map(transaction => (
                <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{PlayerTransactionTypeEnum.getVerboseById(transaction.type)}</td>
                    <td>${transaction.amount}</td>
                    <td>{transaction.admin}</td>
                    <td>{moment(transaction.created_at).format('DD.MM.YYYY')}</td>
                </tr>
            ))}
        </tbody>
    </Table>
)
