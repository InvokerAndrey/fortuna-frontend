import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { Row, Col, Button } from 'react-bootstrap'
import SessionChart from '../../components/SessionChart'

import SessionService from '../services/SessionService'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {

    const sessionService = new SessionService()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {player_id, room_id} = useParams()

    const roomSessionsStatistics = useSelector(state => state.roomSessionsStatistics)
    const {loading, error, data} = roomSessionsStatistics

    useEffect(() => {
        dispatch(sessionService.getRoomSessionStatistics(player_id, room_id))
    }, [dispatch])
    
    if (loading) {
        return <Loader />
    } else if (error) {
        return <Message variant='danger'>{error}</Message>
    }

    return (
        <>
            <Row>
                <Col md={2}>
                    <Button className='btn btn-dark my-3' onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>{data.full_name} : {data.room_name}</h1>
                </Col>
            </Row>
            <Row>
                <SessionChart statistics={data.statistics} />
            </Row>
        </>
        
    )
}