import React from 'react'

import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { FaTrash } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { FcPlus } from 'react-icons/fc'


export default ({ player }) => {

    const deleteHandler = (id, name) => {
        if(window.confirm(`Are you sure you want to delete ${name}?`)){
            // dispatch(deleteUser(id))
            console.log(id)
        }
    }

    return (
        <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>NAME</th>
                    <th>NICKNAME</th>
                    <th>BALANCE</th>
                    <th>DETAILS</th>
                    <th>DELETE</th>
                </tr>
            </thead>
            <tbody>
                {player.rooms.map((room, index) => (
                    <tr key={room.id}>
                        <td>{index + 1}</td>
                        <td>{room.info.name}</td>
                        <td>{room.nickname}</td>
                        <td>${room.balance}</td>
                        <td>
                            <LinkContainer to={`${room.id}`}>
                                <Button variant='white' title='Details'><ImProfile /></Button>
                            </LinkContainer>
                        </td>
                        <td>
                            <Button 
                                variant='white'
                                style={{color: 'red'}}
                                onClick={() => deleteHandler(room.id, room.info.name)}
                                title='Delete'
                            >
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
                <LinkContainer to={`/add/player-room/${player.id}`}>
                    <tr title='Add new Player Room'>
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
}
