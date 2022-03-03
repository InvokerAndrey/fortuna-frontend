import React, { useEffect } from "react";
import { Row, Col } from 'react-bootstrap'
import Admin from '../components/Admin'
import AdminService from "../services/AdminService";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {
    
    const adminService = new AdminService()

    const dispatch = useDispatch()

    const adminList = useSelector(state => state.adminList)   
    const {loading, error, admins} = adminList 

    useEffect(() => {
        dispatch(adminService.listAdmins())
    }, [dispatch])

    return (
        <div>
            <h1>Admins</h1>
            {
                loading ? <h2><Loader /></h2>
                    : error ? <Message variant='danger'>{error}</Message> 
                        :
                        <Row>
                            {admins.map(admin => (
                                <Col sm={12} md={6} lg={4} xl={3} key={admin.id}>
                                    <Admin admin={admin} />
                                </Col>
                            ))}
                        </Row>
            }
            
        </div>
    )
}
