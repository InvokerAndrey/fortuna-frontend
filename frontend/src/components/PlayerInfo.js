import React from 'react'

import { Row, Col, ListGroup, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


export default ({profile, isAdmin}) => {
    return (
        <Row className='my-4'>
            <Col>
                <Row>
                    <Col>
                        <h1>{profile.user.full_name}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>{profile.user.email}</Col>
                    {
                    !isAdmin ?
                        <Col md={8}>
                            <LinkContainer to={'change-password/'}>
                                <a className="link-secondary">change password</a>
                            </LinkContainer>
                        </Col>
                        : <></>
                    }
                </Row >
                <ListGroup variant='flush' className='my-4' style={{fontWeight: 'bold'}}>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6} title='Percentage of player income'>RATE:</Col>
                            <Col style={{color: '#0a74ff'}}>{profile.rate}%</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6} title='Money that is not in the game'>BALANCE:</Col>
                            <Col style={{color: '#0a74ff'}}>{Number(profile.balance).toFixed(2)}$</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6} title='Total money in all rooms'>TOTAL IN ROOMS:</Col>
                            <Col style={{color: '#0a74ff'}}>{Number(profile.total_rooms_balance).toFixed(2)}$</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6} title='How much $ player owes admin'>MAKEUP:</Col>
                            <Col style={{color: '#0a74ff'}}>{Number(profile.duty).toFixed(2)}$</Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            
            <Col md={6} style={{fontWeight: 'bold'}}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6} title='Global all time profit'>ALL TIME PROFIT:</Col>
                            <Col style={{color: '#0a74ff'}}>{Number(profile.all_time_profit).toFixed(2)}$</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6} title='Profit with which tax is considered'>CURRENT PROFIT:</Col>
                            <Col style={{color: '#0a74ff'}}>{Number(profile.current_profit).toFixed(2)}$</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6} title='How much profit you owe admin'>PROFIT MAKEUP:</Col>
                            <Col style={{color: '#0a74ff'}}>{Number(profile.admin_profit_share).toFixed(2)}$</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6} title="Player's current profit share">PROFIT SHARE:</Col>
                            <Col style={{color: '#0a74ff'}}>{Number(profile.self_profit_share).toFixed(2)}$</Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup variant='flush' className='my-4'>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6} title="Paid share of the player's profits for all time">PLAYER'S SALARY:</Col>
                            <Col style={{color: '#0a74ff'}}>{Number(profile.salary).toFixed(2)}$</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6} title="Paid share of the admin's profits for all time">ADMIN'S PROFIT:</Col>
                            <Col style={{color: '#0a74ff'}}>{Number(profile.profit_to_admin).toFixed(2)}$</Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
}