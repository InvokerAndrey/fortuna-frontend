import React, { useState } from 'react'

import { ListGroup, Row, Col, Form, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'


export default ({filterHandler, filterParams}) => {

    const [startDate, setStartDate] = useState(filterParams.start_date)
    const [endDate, setEndDate] = useState(filterParams.end_date)
    const [order, setOrder] = useState(filterParams.order)
    const [result, setResult] = useState(filterParams.result)

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
                        <Col>Result:</Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control
                                as='select'
                                value={result}
                                onChange={e => setResult(e.target.value)}
                            >
                                <option key={0} value={0}>All</option>
                                <option key={1} value={1}>Positive</option>
                                <option key={2} value={2}>Negative</option>
                            </Form.Control>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Button
                            onClick={() => filterHandler(startDate, endDate, order, result)}
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
