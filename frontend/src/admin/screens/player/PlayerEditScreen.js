import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

import { PLAYER_UPDATE_RESET } from '../../constants/playerConstants'

import PlayerService from '../../services/PlayerService'

import FormContainer from '../../../components/FormContainer'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'



export default () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const playerService = new PlayerService()

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [rate, setRate] = useState(0)

    const playerDetails = useSelector(state => state.playerDetails)
    const {loading, error, player} = playerDetails

    const playerUpdate = useSelector(state => state.playerUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = playerUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({
                type: PLAYER_UPDATE_RESET,
            })
            navigate(-1)
        } else {
            if (player.id !== Number(id)) {
                dispatch(playerService.getPlayerDetails(id))
            } else {
                setRate(player.rate)
                setEmail(player.user.email)
                setFirstName(player.user.first_name)
                setLastName(player.user.last_name)
            }
        }
    }, [dispatch, id, player, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(playerService.updatePlayer(id, email, firstName, lastName, rate))
    }

    return (
        <>
            <Button className='btn btn-dark my-3' onClick={() => navigate(-1)}>
                Back
            </Button>
            <FormContainer>
                <h1>Edit player</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {
                    loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='firstName' className='my-2'>
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='First name'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='LastName' className='my-2'>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Last name'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='rate' className='my-2'>
                                <Form.Label>Rate</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='rate'
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Button className='btn btn-block mt-3' type='submit' variant='dark'>Edit</Button>
                        </Form>
                    )
                }
            </FormContainer>
        </>
    )
}
