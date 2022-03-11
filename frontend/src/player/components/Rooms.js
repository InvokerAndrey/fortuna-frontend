import React from 'react'

import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { AiOutlineFundView } from 'react-icons/ai'
import { FaUserEdit } from 'react-icons/fa'


export default ({ rooms }) => (
    <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
        <thead>
            <tr>
                <th>№</th>
                <th>NAME</th>
                <th>NICKNAME</th>
                <th>BALANCE</th>
                <th>EDIT</th>
                <th>STATISTICS</th>
            </tr>
        </thead>
        <tbody>
            {rooms.map((room, index) => (
                <tr key={room.id}>
                    <td>{index + 1}</td>
                    <td>{room.info.name}</td>
                    <td>{room.nickname}</td>
                    <td>${room.balance}</td>
                    <td>
                        <LinkContainer to={`${room.id}`}>
                            <Button variant='white' title='Edit'><FaUserEdit /></Button>
                        </LinkContainer>
                    </td>
                    <td>
                        <LinkContainer to={`${room.id}`}>
                            <Button variant='white' title='Statistics'><AiOutlineFundView /></Button>
                        </LinkContainer>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
)
