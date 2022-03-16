import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { ListGroup, Row, Col, Form, Button } from 'react-bootstrap'

import DatePicker from 'react-datepicker'

import Loader from '../../components/Loader'
import Message from '../../components/Message'


export default () => {

    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [order, setOrder] = useState('New')

    return (
        <div>
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col>Start date:</Col>
                    </Row>
                    <Row>
                        <Col>
                            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>End date:</Col>
                    </Row>
                    <Row>
                        <Col>
                            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Order:</Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control
                                as='select'
                                value={order}
                                onChange={e => setOrder(e.target.value)}
                            >
                                <option key='New' value='New'>New</option>
                                <option key='Old' value='Old'>Old</option>
                            </Form.Control>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Button
                            onClick={() => {}}
                            className="btn-block"
                            variant='dark'
                            type="button"
                        >
                            Filter
                        </Button>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}
