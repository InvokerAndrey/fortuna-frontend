import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import AdminService from '../../services/AdminService'
import Admins from '../../components/Admins'

import Loader from '../../../components/Loader'
import Message from '../../../components/Message'



export default () => {
    
    const adminService = new AdminService()

    const dispatch = useDispatch()

    const adminList = useSelector(state => state.adminList)   
    const {loading, error, admins, count} = adminList 

    useEffect(() => {
        dispatch(adminService.listAdmins())
    }, [dispatch])

    return (
        <div>
            <Row>
                <Col>
                    <h1>{count} Admins</h1>
                </Col>
                <Col style={{textAlign: "right"}}>
                    <LinkContainer to={'/register/admin'}>
                        <Button variant='dark'>Register new Admin</Button>
                    </LinkContainer>
                </Col>
            </Row>
            {
                loading ? <h2><Loader /></h2>
                    : error ? <Message variant='danger'>{error}</Message> 
                        :
                        <Admins admins={admins} />
            }
        </div>
    )
}
