import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import FundService from '../../services/FundService'
import FundTransactions from '../../components/FundTransactions'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import FundDoughnutChart from '../../components/FundDoughnutChart'


export default () => {

    const fundService = new FundService()

    const dispatch = useDispatch()

    const fundDetails = useSelector(state => state.fundDetails)
    const {loading, error, fund} = fundDetails

    useEffect(() => {
        dispatch(fundService.getFundDetails())
    }, [dispatch])

    if (loading) return <Loader />
    if (error) return <Message variant='danger'>{error}</Message>

    return (
        <div>
            <Row>
                <Col md={9} style={{fontSize: 18}}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            Balance: <strong>{fund.balance}$</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Admins:
                            <ul style={{cursor: 'pointer', color: '#0a74ff'}}>
                                {fund.admins.map(admin => (
                                    <LinkContainer to={`/admin/admins/${admin.id}`}>
                                        <li key={admin.id}>
                                            {admin.user.full_name}
                                        </li>
                                    </LinkContainer>
                                ))}
                            </ul>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            In game: {fund.in_game}$
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Profit: {fund.profit}$
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col className='text-center'>
                    <h2>Rate %</h2>
                    <FundDoughnutChart admins={fund.admins} />
                </Col>
            </Row>
            <Row className='my-4'>
                <h2>Transactions</h2>
                <FundTransactions />
            </Row>
        </div>
    )
}
