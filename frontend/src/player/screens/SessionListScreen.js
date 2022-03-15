import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import SessionService from '../services/SessionService'
import Sessions from '../components/Sessions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Pagination from '../../components/Pagination'


export default () => {

    const sessionService = new SessionService()

    const dispatch = useDispatch()

    const sessionList = useSelector(state => state.sessionList)
    const {loading, error, sessions, page, num_pages} = sessionList

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
            <Pagination num_pages={num_pages} callback={sessionService.listPlayerSessions} />
        </div>
    )
}
