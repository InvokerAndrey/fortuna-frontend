import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

import { PLAYER_ROOM_UPDATE_RESET } from '../constants/roomConstants'

import RoomService from '../services/RoomService'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'


export default () => {

    const roomService = new RoomService()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { id } = useParams()

    const redirect = Location.search ? Location.search.split('=')[1] : '/'

    const playerRoomDetails = useSelector(state => state.playerRoomDetails)
    const {loading: loadingDetail, error: errorDetail, playerRoom} = playerRoomDetails

    const [newNick, setNewNick] = useState()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const playerRoomUpdate = useSelector(state => state.playerRoomUpdate)
    const {loading, error, success} = playerRoomUpdate

    useEffect(() => {
        if (!userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])


    useEffect(() => {
        dispatch(roomService.getPlayerRoomDetails(id))
        if (success) {
            dispatch({type: PLAYER_ROOM_UPDATE_RESET})
            navigate('/player/profile')
        }
    }, [dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(roomService.updatePlayerRoom(playerRoom))
    }

    return (
        <>
            {loadingDetail && <Loader />}
            {errorDetail && <Message variant='danger'>{errorDetail}</Message>}
            <FormContainer>
                <h1>Edit</h1>
            </FormContainer>
        </>
    )
}