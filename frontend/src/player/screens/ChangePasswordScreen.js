import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Form, Button } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'

import { PROFILE_CHANGE_PASSWORD_RESET } from '../constants/profileConstants'

import ProfileService from '../services/ProfileService'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const profileService = new ProfileService()

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [message, setMessage] = useState('')

    const playerChangePassword = useSelector(state => state.playerChangePassword)
    const {loading, error, success} = playerChangePassword

    useEffect(() => {
        if (success) {
            dispatch({type: PROFILE_CHANGE_PASSWORD_RESET})
            navigate('/player/profile')
        }
    }, [dispatch, success])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('zxc')
        if (newPassword !== confirmNewPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(profileService.changePassword(password, newPassword))
        }
    }

    return (
        <div>
            <Button className='btn btn-dark my-3' onClick={() => navigate(-1)}>
                Back
            </Button>
            <FormContainer>
                <h1>Change password</h1>
                <Form onSubmit={submitHandler}>
                    {loading && <Loader />}
                    {error && <Message variant='danger'>{error}</Message>}
                    {message && <Message variant='danger'>{message}</Message>}
                    <Form.Label className='mt-4'>Current Password</Form.Label>
                    <Form.Group controlId='password' className='input-group'>   
                        <Form.Control
                            required
                            type='password'
                            placeholder='current password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Label className='mt-4'>New Password</Form.Label>
                    <Form.Group controlId='newPassword' className='input-group'>   
                        <Form.Control
                            required
                            type='password'
                            placeholder='new password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Label className='mt-4'>Confirm New Password</Form.Label>
                    <Form.Group controlId='confirmNewPassword' className='input-group'>   
                        <Form.Control
                            required
                            type='password'
                            placeholder='confirm new password'
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button className='btn btn-block mt-3' type='submit' variant='dark'>Change</Button>
                </Form>
            </FormContainer>
        </div>
    )
}