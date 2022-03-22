import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Row } from 'react-bootstrap'

import SessionService from '../services/SessionService'
import Sessions from '../components/Sessions'
import SessionChart from '../components/SessionChart'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {

    const sessionService = new SessionService()

    const dispatch = useDispatch()

    const sessionsStatistics = useSelector(state => state.sessionsStatistics)
    const {loading: loadingStats, error: errorStats, statistics} = sessionsStatistics

    useEffect(() => {
        dispatch(sessionService.getSessionStatistics())
    }, [dispatch])

    return (
        <div>
            <Sessions />
            {
                loadingStats ? <Loader />
                    : errorStats ? <Message variant='danger'>{errorStats}</Message>
                        :
                            <Row className='my-4'>
                                <SessionChart statistics={statistics} />
                            </Row>
            }
        </div>
    )
}
