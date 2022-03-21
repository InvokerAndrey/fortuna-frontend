import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { Row, Col, Button } from 'react-bootstrap'
import SessionChart from '../components/SessionChart'

import SessionService from '../services/SessionService'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {

    const sessionService = new SessionService()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {id} = useParams()

    const roomSessionsStatistics = useSelector(state => state.roomSessionsStatistics)
    const {loading, error, statistics} = roomSessionsStatistics

    useEffect(() => {
        dispatch(sessionService.getRoomSessionStatistics(id))
    }, [dispatch])

    return (
        <>
            <Row>
                <Col md={2}>
                    <Button className='btn btn-dark my-3' onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Col>
            </Row>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :
                            <Row>
                                <SessionChart statistics={statistics} />
                            </Row>
            }
        </>
        
    )
}