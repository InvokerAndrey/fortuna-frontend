import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import moment from 'moment'

import { GrView } from 'react-icons/gr'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { FcPlus } from 'react-icons/fc'

import SessionService from '../services/SessionService'
import Pagination from '../../components/Pagination'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import SessionFilter from '../../components/SessionFilter'


export default () => {

    const sessionService = new SessionService()

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const sessionList = useSelector(state => state.sessionList)
    const {loading, error, sessions, num_pages} = sessionList

    const [filterParams, setFilterParams] = useState({
        start_date: null,
        end_date: null,
        order: '-created_at',
        result: 0
    })

    useEffect(() => {
        dispatch(sessionService.listPlayerSessions(userInfo.id))
    }, [dispatch])

    const filterHandler = (startDate, endDate, order, result) => {
        const params = {
            start_date: startDate,
            end_date: endDate,
            order: order,
            result: result,
        }
        
        setFilterParams(params)
        dispatch(sessionService.listPlayerSessions(userInfo.id, params))
    }

    return (
        <>
        {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :
                            <Row>
                                <Col md={2}>
                                    <SessionFilter filterHandler={filterHandler} filterParams={filterParams} />
                                </Col>
                                <Col>
                                    <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>DATE</th>
                                                <th>RESULT</th>
                                                <th>DETAILS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <LinkContainer to={`/add/session/`}>
                                                <tr title='Add new Session'>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td><FcPlus /></td>
                                                </tr>
                                            </LinkContainer>
                                            {sessions.map(session => (
                                                <tr key={session.id}>
                                                    <td>{session.id}</td>
                                                    <td>{moment(session.created_at).format('DD.MM.YYYY')}</td>
                                                    {
                                                        session.result >= 0
                                                            ?
                                                                <td>
                                                                    <span style={{color: 'green'}}>
                                                                        {session.result}$ {' '} <AiOutlineArrowUp />
                                                                    </span>
                                                                </td>
                                                            :
                                                                <td>
                                                                    <span style={{color: 'red'}}>
                                                                        {session.result}$ {' '} <AiOutlineArrowDown />
                                                                    </span>
                                                                </td>
                                                    }
                                                    <td>
                                                        <LinkContainer to={`${session.id}`}>
                                                            <Button variant='white' title='Details'><GrView /></Button>
                                                        </LinkContainer>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            
            }
            <Pagination num_pages={num_pages} callback={sessionService.listPlayerSessions} params={filterParams} />
        </>
        
    )
}
