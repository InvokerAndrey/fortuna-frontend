import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Accordion, ListGroup } from 'react-bootstrap'

import PlayerService from '../services/PlayerService'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {

    const playerService = new PlayerService()

    const dispatch = useDispatch()

    const { id } = useParams()

    const navigate = useNavigate()

    const playerDetails = useSelector(state => state.playerDetails)
    const {loading, error, player} = playerDetails

    const listGroupStyles = {
        maxHeight: '500px',
        marginBottom: '10px',
        overflowY: 'auto',
    }

    useEffect(() => {
        dispatch(playerService.getPlayerDetails(id))
    }, [dispatch])

    return (
        <div>
            <Button className='btn btn-dark my-3' onClick={() => navigate(-1)}>
                Back
            </Button>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :
                            <div>
                                <Row>
                                    <h2>{player.user.full_name}</h2>
                                    <p>Email: {player.user.email}</p>
                                    <p>Rate: {player.rate}%</p>
                                </Row>
                                <Accordion className='my-2' alwaysOpen flush>
                                    <Accordion.Item eventKey='0'>
                                        <Accordion.Header>Rooms</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup as='div' variant='flush' style={listGroupStyles}>
                                                {
                                                    player.rooms.map(room => (
                                                        <ListGroup.Item key={room.id}>
                                                            <strong>{room.info.name}</strong>
                                                            <p>Nickname: <strong>{room.nickname}</strong></p>
                                                            <p>Balance: <strong>${room.balance}</strong></p>
                                                        </ListGroup.Item>
                                                    ))
                                                }
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey='1'>
                                        <Accordion.Header>Room Transactions</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant='flush' style={listGroupStyles}>
                                                {
                                                    player.room_transactions.map(transaction => (
                                                        <ListGroup.Item key={transaction.id}>
                                                            <strong>{transaction.type}</strong>
                                                            <p>${transaction.amount}</p>
                                                            <small>{transaction.created_at}</small>
                                                        </ListGroup.Item>
                                                    ))
                                                }
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey='2'>
                                        <Accordion.Header>Player Transactions</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant='flush' style={listGroupStyles}>
                                                {
                                                    player.room_transactions.map(transaction => (
                                                        <ListGroup.Item key={transaction.id}>
                                                            <strong>{transaction.type}</strong>
                                                            <p>${transaction.amount}</p>
                                                            <small>{transaction.created_at}</small>
                                                        </ListGroup.Item>
                                                    ))
                                                }
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
            }
            <Button className='btn btn-dark my-3' onClick={() => navigate(`/players/${id}/edit`)}>
                Edit
            </Button>
        </div>
    )
}
