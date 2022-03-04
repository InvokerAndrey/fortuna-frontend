import React from 'react'

import { Table } from 'react-bootstrap'


export default ({ player }) => {
    return (
        <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>TYPE</th>
                    <th>AMOUNT</th>
                    <th>DATE</th>
                </tr>
            </thead>
            <tbody>
                {player.room_transactions.map((transaction, index) => (
                    <tr key={transaction.id}>
                        <td>{index + 1}</td>
                        <td>{transaction.type}</td>
                        <td>{transaction.amount}</td>
                        <td>${transaction.created_at}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}