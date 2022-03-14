import React from 'react'

import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import moment from 'moment'

import { GrView } from 'react-icons/gr'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { FcPlus } from 'react-icons/fc'


export default ({sessions}) => (
    <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
        <thead>
            <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>RESULT</th>
                <th>DETAILS</th>
            </tr>
        </thead>
        <tbody>
            {sessions.map(session => (
                <tr key={session.id}>
                    <td>{session.id}</td>
                    <td>{moment(session.date).format('DD.MM.YYYY')}</td>
                    {
                        session.result >= 0
                            ?
                                <td>
                                    <span style={{color: 'green'}}>
                                        {session.result}$ {' '} <AiOutlineArrowUp />
                                    </span>
                                </td>
                            :
                                <td>
                                    <span style={{color: 'red'}}>
                                        {session.result}$ {' '} <AiOutlineArrowDown />
                                    </span>
                                </td>
                    }
                    <td>
                        <LinkContainer to={`${session.id}`}>
                            <Button variant='white' title='Details'><GrView /></Button>
                        </LinkContainer>
                    </td>
                </tr>
            ))}
            <LinkContainer to={`/add/session/`}>
                <tr title='Add new Session'>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><FcPlus /></td>
                </tr>
            </LinkContainer>
        </tbody>
    </Table>
)
