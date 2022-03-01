import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Button, Accordion, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import RoomService from '../services/RoomService'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {

    const roomService = new RoomService()

    const dispatch = useDispatch()

    const { id } = useParams()

    const navigate = useNavigate()

    const roomDetails = useSelector(state => state.roomDetails)
    const {loading, error, room} = roomDetails

    const roomPlayers = useSelector(state => state.roomPlayers)
    const {loading: playersLoading, error: playersError, players} = roomPlayers

    const listGroupStyles = {
        maxHeight: '500px',
        marginBottom: '10px',
        overflowY: 'auto',
    }

    useEffect(() => {
        dispatch(roomService.getRoomDetails(id))
        dispatch(roomService.getRoomPlayers(id))
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
                                    <h1>{room.name}</h1>
                                    <h4>{room.description}</h4>
                                    <h4>
                                        <a href={room.website} rel='noreferrer' target='_blank'>
                                            {room.website}
                                        </a>
                                    </h4>
                                    <Accordion className='my-2' alwaysOpen flush>
                                        <Accordion.Item eventKey='0'>
                                            <Accordion.Header>Players</Accordion.Header>
                                            <Accordion.Body>
                                                <ListGroup as='div' variant='flush' style={listGroupStyles}>
                                                    {
                                                        players.map(player => (
                                                            <ListGroup.Item key={player.id}>
                                                                <Link to={`/players/${player.id}`}>
                                                                    {player.user.full_name}
                                                                </Link>
                                                            </ListGroup.Item>
                                                        ))
                                                    }
                                                </ListGroup>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Row>
                            </div>
            }
        </div>
    )
}
