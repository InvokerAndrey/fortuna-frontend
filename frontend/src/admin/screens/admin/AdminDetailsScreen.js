import React, { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import { Row, Col, Button } from 'react-bootstrap'

import { ADMIN_DETAILS_RESET } from '../../constants/adminConstants'
import AdminService from '../../services/AdminService'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'


export default () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const adminService = new AdminService()
    const {id} = useParams()

    const adminDetails = useSelector(state => state.adminDetails)
    const {loading, error, admin} = adminDetails
    

    useEffect(() => {
        dispatch(adminService.getAdminDetails(id))
        return () => {
            dispatch({type: ADMIN_DETAILS_RESET})
        }
    }, [dispatch])

    if (loading) return <Loader />
    if (error) return <Message variant='danger'>{error}</Message>

    return (
        <>
        <Row>
            <Col md={10}>
                <Button className='btn btn-dark my-3' onClick={() => navigate(-1)}>
                    Back
                </Button>
            </Col>
        </Row>
        <Row>
            <h1>{admin.user.full_name}</h1>
            {
                admin.logged ?
                    <Col md={8}>
                        <LinkContainer to={'change-password/'}>
                            <a className="link-secondary">change password</a>
                        </LinkContainer>
                    </Col>
                : <></>
            }
        </Row>
        </>
    )
}