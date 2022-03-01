import React, { useEffect } from "react";
import { Row, Col } from 'react-bootstrap'
import Player from '../components/Player'
import PlayerService from "../services/PlayerService";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {
    
    const playerService = new PlayerService()

    const dispatch = useDispatch()

    const playerList = useSelector(state => state.playerList)   
    const {loading, error, players} = playerList 

    useEffect(() => {
        dispatch(playerService.listPlayers())
    }, [dispatch])

    return (
        <div>
            <h1>Players</h1>
            {
                loading ? <h2><Loader /></h2>
                    : error ? <Message variant='danger'>{error}</Message> 
                        :
                        <Row>
                            {players.map(player => (
                                <Col sm={12} md={6} lg={4} xl={3} key={player.id}>
                                    <Player player={player} />
                                </Col>
                            ))}
                        </Row>
            }
            
        </div>
    )
}
