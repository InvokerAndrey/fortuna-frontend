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

    const [rate, setRate] = useState(0)
    const [rooms, setRooms] = useState([])

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
                setRooms(player.rooms)
            }
        }
    }, [dispatch, id, player, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(playerService.updatePlayer(id, rate, rooms))
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
                            <Form.Group controlId='rate'>
                                <Form.Label>Rate</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='rate'
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='rooms'>
                                <Form.Label>Rooms</Form.Label>
                                <Form.Control
                                    type='select'
                                    placeholder='rooms'
                                    value={rooms}
                                    onChange={(e) => setRooms(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    )
                }
            </FormContainer>
        </>
    )
}
