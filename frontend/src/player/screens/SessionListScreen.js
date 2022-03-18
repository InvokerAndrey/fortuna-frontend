import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'react-bootstrap'

import SessionService from '../services/SessionService'
import Sessions from '../components/Sessions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Pagination from '../../components/Pagination'
import SessionFilter from '../components/SessionFilter'


export default () => {

    const sessionService = new SessionService()

    const dispatch = useDispatch()

    const sessionList = useSelector(state => state.sessionList)
    const {loading, error, sessions, num_pages} = sessionList

    const [filterParams, setFilterParams] = useState({
        start_date: null,
        end_date: null,
        order: '-created_at',
        result: 0
    })

    useEffect(() => {
        dispatch(sessionService.listPlayerSessions())
    }, [dispatch])

    const filterHandler = (startDate, endDate, order, result) => {
        const params = {
            start_date: startDate,
            end_date: endDate,
            order: order,
            result: result,
        }
        
        setFilterParams(params)
        dispatch(sessionService.listPlayerSessions(params))
    }

    return (
        <div>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :
                            <Row>
                                <Col md={2}>
                                    <SessionFilter filterHandler={filterHandler} filterParams={filterParams} />
                                </Col>
                                <Col>
                                    <Sessions sessions={sessions} />
                                </Col>
                            </Row>
                            
            }
            <Pagination num_pages={num_pages} callback={sessionService.listPlayerSessions} params={filterParams} />
        </div>
    )
}
