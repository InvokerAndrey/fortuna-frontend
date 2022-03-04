import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import PlayerService from '../services/PlayerService'
import Players from '../components/Players'

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

    const deleteHandler = (id, full_name) => {
        if (window.confirm(`Are you sure you want to delete ${full_name}?`)){
            dispatch(playerService.delete(id))
        }
    }

    return (
        <div>
            <Row>
                <Col>
                    <h1>Players</h1>
                </Col>
                <Col style={{textAlign: "right"}}>
                    <LinkContainer to={'/register/player'}>
                        <Button variant='dark'>Register new Player</Button>
                    </LinkContainer>
                </Col>
            </Row>
            {
                loading ? <h2><Loader /></h2>
                    : error ? <Message variant='danger'>{error}</Message> 
                        :
                        <Players players={players} deleteHandler={deleteHandler} />
            }
        </div>
    )
}
