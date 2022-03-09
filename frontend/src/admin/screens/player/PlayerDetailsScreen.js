import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { Row, Col, Button, Tabs, Tab } from 'react-bootstrap'

import { PLAYER_DELETE_RESET } from '../../constants/playerConstants'

import PlayerService from '../../services/PlayerService'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import PlayerRooms from '../../components/PlayerRooms'
import RoomTransactions from '../../components/RoomTransactions'
import PlayerTransactions from '../../components/PlayerTransactions'


export default () => {

    const playerService = new PlayerService()

    const dispatch = useDispatch()

    const { id } = useParams()

    const navigate = useNavigate()

    const playerDetails = useSelector(state => state.playerDetails)
    const {loading, error, player} = playerDetails

    const playerDelete = useSelector(state => state.playerDelete)
    const {success: successDelete} = playerDelete

    useEffect(() => {
        dispatch(playerService.getPlayerDetails(id))
        if (successDelete) {
            dispatch({type: PLAYER_DELETE_RESET})
            navigate('/admin/players')
        }
    }, [dispatch, successDelete])

    const deleteHandler = (id, full_name) => {
        if(window.confirm(`Are you sure you want to delete ${full_name}?`)){
            dispatch(playerService.delete(id))
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
                    <Button className='btn btn-dark my-3' onClick={() => navigate(`/players/${id}/edit`)}>
                        Edit
                    </Button>
                </Col>
                <Col>
                    <Button
                        className='btn btn-dark my-3'
                        onClick={() => deleteHandler(player.id, player.user.full_name)}
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
                                            <Col md={2}>RATE:</Col>
                                            <Col>{player.rate}%</Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Tabs defaultActiveKey='rooms' id='player-details' className='mb-3'>
                                    <Tab eventKey='rooms' title='Rooms'>
                                        <PlayerRooms player={player}/>
                                    </Tab>
                                    <Tab eventKey='room_transactions' title='Room Transactions'>
                                        <RoomTransactions player={player} />
                                    </Tab>
                                    <Tab eventKey='player_transactions' title='Player Transactions'>
                                        <PlayerTransactions player={player} />
                                    </Tab>
                                </Tabs>
                            </>
            }
        </div>
    )
}
