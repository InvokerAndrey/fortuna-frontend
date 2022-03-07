import React from 'react'

import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { FaTrash, FaUserEdit } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { FcPlus } from 'react-icons/fc'


export default ({ players, deleteHandler }) => (
    <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
        <thead>
            <tr>
                <th>№</th>
                <th>FULL NAME</th>
                <th>EMAIL</th>
                <th>RATE (%)</th>
                <th>DETAILS</th>
                <th>EDIT</th>
                <th>DELETE</th>
            </tr>
        </thead>
        <tbody>
            {players.map((player, index) => (
                <tr key={player.id}>
                    <td>{index + 1}</td>
                    <td>{player.user.full_name}</td>
                    <td>{player.user.email}</td>
                    <td>{player.rate}</td>
                    <td>
                        <LinkContainer to={`${player.id}`}>
                            <Button variant='white' title='Details'><ImProfile /></Button>
                        </LinkContainer>
                    </td>
                    <td>
                        <LinkContainer to={`${player.id}/edit`}>
                            <Button variant='white' title='Edit'><FaUserEdit /></Button>
                        </LinkContainer>
                    </td>
                    <td>
                        <Button 
                            variant='white'
                            style={{color: 'red'}}
                            onClick={() => deleteHandler(player.id, player.user.full_name)}
                            title='Delete'
                        >
                            <FaTrash />
                        </Button>
                    </td>
                </tr>
            ))}
            <LinkContainer to={'/register/player'}>
                <tr title='Register new Player'>
                    <td></td>
                    <td></td>
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
