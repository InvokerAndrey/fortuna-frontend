import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { Row, Col, Button, Tabs, Tab } from 'react-bootstrap'

import { PLAYER_DELETE_RESET, PLAYER_DETAILS_RESET } from '../../constants/playerConstants'
import { PLAYER_ROOM_DELETE_RESET } from '../../constants/roomConstants'

import SessionService from '../../../player/services/SessionService'
import PlayerService from '../../services/PlayerService'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import PlayerRooms from '../../components/PlayerRooms'
import RoomTransactions from '../../../components/RoomTransactions'
import PlayerTransactions from '../../../components/PlayerTransactions'
import Sessions from '../../../components/Sessions'
import SessionChart from '../../../components/SessionChart'


export default () => {
    
    const playerService = new PlayerService()
    const sessionService = new SessionService()

    const dispatch = useDispatch()

    const { id } = useParams()

    const navigate = useNavigate()

    const playerDetails = useSelector(state => state.playerDetails)
    const {loading, error, player} = playerDetails

    const playerDelete = useSelector(state => state.playerDelete)
    const {success: successDelete} = playerDelete

    const playerRoomDelete = useSelector(state => state.playerRoomDelete)
    const {success: successPlayerRoomDelete} = playerRoomDelete

    const sessionsStatistics = useSelector(state => state.sessionsStatistics)
    const {loading: loadingStats, error: errorStats, statistics} = sessionsStatistics

    useEffect(() => {
        if (successDelete) {
            dispatch({type: PLAYER_DELETE_RESET})
            navigate('/admin/players')
        }
        if (successPlayerRoomDelete) {
            dispatch({type: PLAYER_ROOM_DELETE_RESET})
        }
    }, [dispatch, successDelete, successPlayerRoomDelete])

    useEffect(() => {
        if (id) {
            dispatch(playerService.getPlayerDetails(id))
        }
        return () => {
            dispatch({type: PLAYER_DETAILS_RESET})
        }
    }, [dispatch, id])

    useEffect(() => {
        if (player.user.id) {
            dispatch(sessionService.getSessionStatistics(player.user.id))
        }
    }, [dispatch, player])

    const deleteHandler = (id, name, callback) => {
        if(window.confirm(`Are you sure you want to delete ${name}?`)){
            dispatch(callback(id))
        }
    }

    return (
        <div>
            <Row>
                <Col md={10}>
                    <Button className='btn btn-dark my-3' onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Col>
                <Col>
                    <Button className='btn btn-dark my-3' onClick={() => navigate(`/admin/players/${id}/edit`)}>
                        Edit
                    </Button>
                </Col>
                <Col>
                    <Button
                        className='btn btn-dark my-3'
                        onClick={() => deleteHandler(player.id, player.user.full_name, playerService.delete)}
                        style={{color: 'red'}}
                    >
                        Delete
                    </Button>
                </Col>
            </Row>
            
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :
                            <>
                                <Row className='my-4'>
                                    <Col>
                                        <h1>{player.user.full_name}</h1>
                                    </Col>
                                    <Col style={{fontWeight: 'bold'}}>
                                        <Row>
                                            <Col md={2}>EMAIL:</Col>
                                            <Col>{player.user.email}</Col>
                                        </Row>
                                        <Row>
                                            <Col md={2} title='Profit share'>RATE:</Col>
                                            <Col>{player.rate}%</Col>
                                        </Row>
                                        <Row>
                                            <Col md={2} title='Money that is not in the game'>BALANCE:</Col>
                                            <Col>${player.balance}</Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Tabs defaultActiveKey='rooms' id='player-details' className='mb-3'>
                                    <Tab eventKey='rooms' title='Rooms'>
                                        <PlayerRooms player={player} deleteHandler={deleteHandler}/>
                                    </Tab>
                                    <Tab eventKey='sessions' title='Sessions'>
                                        <Sessions userID={player.user.id} showAdd={false} />
                                        {
                                            loadingStats ? <Loader />
                                                : errorStats ? <Message variant='danger'>{errorStats}</Message>
                                                    :
                                                        <Row className='my-4'>
                                                            <SessionChart statistics={statistics} />
                                                        </Row>
                                        }
                                    </Tab>
                                    <Tab eventKey='room_transactions' title='Room Transactions'>
                                        <RoomTransactions userID={player.user.id} showAdd={false} />
                                    </Tab>
                                    <Tab eventKey='player_transactions' title='Player Transactions'>
                                        <PlayerTransactions userID={player.user.id} showAdd={true} />
                                    </Tab>
                                </Tabs>
                            </>
            }
        </div>
    )
}
