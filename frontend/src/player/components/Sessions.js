import React from 'react'

import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { GrView } from 'react-icons/gr'


export default ({sessions}) => (
    <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
        <thead>
            <tr>
                <th>№</th>
                <th>DATE</th>
                <th>RESULT</th>
                <th>DETAILS</th>
            </tr>
        </thead>
        <tbody>
            {sessions.map((session, index) => (
                <tr key={session.id}>
                    <td>{index + 1}</td>
                    <td>{session.date}</td>
                    <td>{}</td>
                    <td>
                        <LinkContainer to={`${session.id}`}>
                            <Button variant='white' title='Details'><GrView /></Button>
                        </LinkContainer>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
)
