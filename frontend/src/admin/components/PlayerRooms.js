import React from 'react'

import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { FaTrash } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { FcPlus } from 'react-icons/fc'

import RoomService from '../services/RoomService'


export default ({ player, deleteHandler }) => {

    const roomService = new RoomService()

    return (
        <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>NICKNAME</th>
                    <th>BALANCE</th>
                    <th>DETAILS</th>
                    <th>DELETE</th>
                </tr>
            </thead>
            <tbody>
                {player.rooms.map(room => (
                    <tr key={room.id}>
                        <td>{room.id}</td>
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
                                onClick={() => deleteHandler(room.id, room.info.name, roomService.deletePlayerRoom)}
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
