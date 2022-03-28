import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useParams, useNavigate } from 'react-router-dom'

import { Row, Col, Button, Table } from 'react-bootstrap'

import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'

import moment from 'moment'

import SessionService from '../services/SessionService'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {

    const sessionService = new SessionService()

    const dispatch = useDispatch()

    const {session_id} = useParams()

    const navigate = useNavigate()

    const sessionDetails = useSelector(state => state.sessionDetails)
    const {loading, error, session} = sessionDetails

    useEffect(() => {
        dispatch(sessionService.getPlayerSession(session_id))
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
                                <h1>Session {session.id}: {moment(session.date).format('DD.MM.YYYY')}</h1>
                                <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>ROOM</th>
                                        <th>NICKNAME</th>
                                        <th>BALANCE</th>
                                        <th>RESULT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        session.room_sessions.map(room_session => (
                                            <tr key={room_session.id}>
                                                <td>{room_session.id}</td>
                                                <td>{room_session.room.info.name}</td>
                                                <td>{room_session.room.nickname}</td>
                                                <td title='Room balance at the end of the session '>{room_session.balance}$</td>
                                                {
                                                    room_session.result >= 0
                                                        ?
                                                            <td>
                                                                <span style={{color: 'green'}}>
                                                                    {room_session.result}$ {' '} <AiOutlineArrowUp />
                                                                </span>
                                                            </td>
                                                        :
                                                            <td>
                                                                <span style={{color: 'red'}}>
                                                                    {room_session.result}$ {' '} <AiOutlineArrowDown />
                                                                </span>
                                                            </td>
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                </Table>
                            </>
            }
        </div>
    )
}
