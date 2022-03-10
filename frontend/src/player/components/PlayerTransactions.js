import React from 'react'

import { Table } from 'react-bootstrap'

import { PlayerTransactionTypeEnum } from '../../constants/enums'


export default ({transactions}) => (
    <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
        <thead>
            <tr>
                <th>№</th>
                <th>TYPE</th>
                <th>AMOUNT</th>
                <th>ADMIN</th>
                <th>DATE</th>
            </tr>
        </thead>
        <tbody>
            {transactions.map((transaction, index) => (
                <tr key={transaction.id}>
                    <td>{index + 1}</td>
                    <td>{PlayerTransactionTypeEnum.getVerboseById(transaction.type)}</td>
                    <td>${transaction.amount}</td>
                    <td>{transaction.admin}</td>
                    <td>{transaction.created_at}</td>
                </tr>
            ))}
        </tbody>
    </Table>
)
