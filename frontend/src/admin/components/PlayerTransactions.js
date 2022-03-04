import React from 'react'

import { Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { FcPlus } from 'react-icons/fc'


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
                {player.player_transactions.map((transaction, index) => (
                    <tr key={transaction.id}>
                        <td>{index + 1}</td>
                        <td>{transaction.type}</td>
                        <td>{transaction.amount}</td>
                        <td>${transaction.created_at}</td>
                    </tr>
                ))}
                <LinkContainer to={`/add/player-transaction/${player.id}`}>
                    <tr title='Add new Player Transaction'>
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