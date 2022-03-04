import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

import { ADMIN_REGISTER_RESET } from '../constants/adminConstants'

import AdminService from '../services/AdminService'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'


export default () => {
    const adminService = new AdminService()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const redirect = Location.search ? Location.search.split('=')[1] : '/'

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [rate, setRate] = useState(0)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const adminRegister = useSelector(state => state.adminRegister)
    const {loading: loadingRegister, error: errorRegister, success: successRegister} = adminRegister

    useEffect(() => {
        if (!userInfo.is_staff) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    useEffect(() => {
        if (successRegister) {
            navigate('/admin/admins')
            dispatch({type: ADMIN_REGISTER_RESET})
        }
    }, [successRegister, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(adminService.register(email, firstName, lastName, rate, password))
        }
    }

    return (
        
        <FormContainer>
            <h1>Register New Admin</h1>
            {errorRegister && <Message variant='danger'>{errorRegister}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loadingRegister && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='my-4'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='firstName' className='my-4'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='lastName' className='my-4'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='rate' className='my-4'>
                    <Form.Label>Rate (%)</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='rate'
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-4'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword' className='my-4'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button className='btn btn-block mt-3' type='submit' variant='dark'>Register</Button>
            </Form>
        </FormContainer>
    )
}
