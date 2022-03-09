import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Button, Tabs, Tab } from 'react-bootstrap'

import ProfileService from '../services/ProfileService'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {
    const profileService = new ProfileService()

    const dispatch = useDispatch()

    const playerProfileDetails = useSelector(state => state.playerProfileDetails)
    const {loading, error, profile} = playerProfileDetails

    console.log(profile)

    useEffect(() => {
        dispatch(profileService.getProfileDetails())
    }, [dispatch])

    return (
        <div>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :
                            <>
                                <Row className='my-4'>
                                    <Col>
                                        <h1>{profile.user.full_name}</h1>
                                    </Col>
                                    <Col style={{fontWeight: 'bold'}}>
                                        <Row>
                                            <Col md={2}>EMAIL:</Col>
                                            <Col>{profile.user.email}</Col>
                                        </Row>
                                        <Row>
                                            <Col md={2}>RATE:</Col>
                                            <Col>{profile.rate}%</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </>
            }
        </div>
    )
}
