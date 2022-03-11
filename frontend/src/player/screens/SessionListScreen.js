import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import SessionService from '../services/SessionService'
import Sessions from '../components/Sessions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {

    const sessionService = new SessionService()

    const dispatch = useDispatch()

    const sessionList = useSelector(state => state.sessionList)
    const {loading, error, sessions} = sessionList

    useEffect(() => {
        dispatch(sessionService.listPlayerSessions())
    }, [dispatch])

    return (
        <div>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : <Sessions sessions={sessions} />
            }
        </div>
    )
}
