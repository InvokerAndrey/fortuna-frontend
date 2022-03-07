import React from 'react'

import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { FaTrash, FaUserEdit } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { FcPlus } from 'react-icons/fc'


export default ({ rooms, deleteHandler }) => (
    <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
        <thead>
            <tr>
                <th>№</th>
                <th>NAME</th>
                <th>WEBSITE</th>
                <th>DETAILS</th>
                <th>EDIT</th>
                <th>DELETE</th>
            </tr>
        </thead>
        <tbody>
            {rooms.map((room, index) => (
                <tr key={room.id}>
                    <td>{index + 1}</td>
                    <td>{room.name}</td>
                    <td><a href={room.website} rel='noreferrer' target='_blank'>{room.website}</a></td>
                    <td>
                        <LinkContainer to={`${room.id}`}>
                            <Button variant='white' title='Details'><ImProfile /></Button>
                        </LinkContainer>
                    </td>
                    <td>
                        <LinkContainer to={`${room.id}/edit`}>
                            <Button variant='white' title='Edit'><FaUserEdit /></Button>
                        </LinkContainer>
                    </td>
                    <td>
                        <Button 
                            variant='white'
                            style={{color: 'red'}}
                            onClick={() => deleteHandler(room.id, room.name)}
                            title='Delete'
                        >
                            <FaTrash />
                        </Button>
                    </td>
                </tr>
            ))}
            <LinkContainer to={'/add/room'}>
                <tr title='Add new Room'>
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
