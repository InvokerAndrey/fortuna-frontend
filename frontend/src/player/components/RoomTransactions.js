import React from 'react'

import { Table, Tooltip } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import moment from 'moment'

import { FcPlus } from 'react-icons/fc'

import { RoomTransactionTypeEnum } from '../../constants/enums'


export default ({transactions, sortHandler}) => {
    const thStyle = {
        cursor: 'pointer'
    }

    return (
        <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
            <thead>
                <tr>
                    <th style={thStyle} onClick={() => sortHandler('id')}>ID</th>
                    <th style={thStyle} onClick={() => sortHandler('type')}>TYPE</th>
                    <th style={thStyle} onClick={() => sortHandler('amount')}>AMOUNT</th>
                    <th style={thStyle} onClick={() => sortHandler('room')}>ROOM</th>
                    <th style={thStyle} onClick={() => sortHandler('created_at')}>DATE</th>
                </tr>
            </thead>
            <tbody>
                <LinkContainer to={`/add/room-transaction/`}>
                    <tr title='Add new Room Transaction'>
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