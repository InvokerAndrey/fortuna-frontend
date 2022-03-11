import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useParams, useNavigate } from 'react-router-dom'

import { Row, Col, Button } from 'react-bootstrap'

import SessionService from '../services/SessionService'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {

    const sessionService = new SessionService()

    const dispatch = useDispatch()

    const {id} = useParams()

    const navigate = useNavigate()

    const sessionDetails = useSelector(state => state.sessionDetails)
    const {loading, error, session} = sessionDetails

    useEffect(() => {
        dispatch(sessionService.getPlayerSession(id))
        console.log(session)
    }, [dispatch])

    

    return (
        <div>
            <Row>
                <Col md={10}>
                    <Button className='btn btn-dark my-3' onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Col>
            </Row>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :
                            <>
                                <Row>
                                    <h3>{session.date}</h3>
                                </Row>
                                {
                                    session.room_sessions.map(room_session => (
                                        <Row>
                                            {room_session.room.info.name}
                                        </Row>
                                    ))
                                }
                            </>
            }
        </div>
    )
}
