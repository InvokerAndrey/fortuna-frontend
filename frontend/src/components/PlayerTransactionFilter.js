import React, { useState } from 'react'

import { ListGroup, Row, Col, Form, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

import { PlayerTransactionTypeEnum } from '../constants/enums'


export default ({filterHandler, filterParams}) => {

    const [startDate, setStartDate] = useState(filterParams.start_date)
    const [endDate, setEndDate] = useState(filterParams.end_date)
    const [order, setOrder] = useState(filterParams.order)
    const [type, setType] = useState(filterParams.type)

    return (
        <div>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>Start date:</Col>
                    </Row>
                    <Row>
                        <Col>
                            <DatePicker 
                                dateFormat="dd.MM.yyyy"
                                className='form-control'
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>End date:</Col>
                    </Row>
                    <Row>
                        <Col>
                            <DatePicker
                                dateFormat="dd.MM.yyyy"
                                className='form-control'
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                            />
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
                                <option key='-created_at' value='-created_at'>New first</option>
                                <option key='created_at' value='created_at'>Old first</option>
                            </Form.Control>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Type:</Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control
                                as='select'
                                value={type}
                                onChange={e => setType(e.target.value)}
                            >
                                <option key={0} value={0}>All</option>
                                {
                                    [...PlayerTransactionTypeEnum.getIdList()].map(x => (
                                        <option key={x} value={x}>
                                            {PlayerTransactionTypeEnum.getVerboseById(x)}
                                        </option>
                                    ))
                                }
                            </Form.Control>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Button
                            onClick={() => filterHandler(startDate, endDate, order, type)}
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
