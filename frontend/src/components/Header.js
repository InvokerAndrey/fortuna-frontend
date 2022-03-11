import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import UserService from '../services/UserService'


export default () => {

    const userService = new UserService()

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () => {
        dispatch(userService.logout())
    }

    return (
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to={!userInfo ? '/' : !userInfo.is_staff ? '/player' : '/admin'}>
                    <Navbar.Brand>FortunaPoker</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {
                        userInfo && userInfo.is_staff && (
                            <>
                                <LinkContainer to='/admin/profile'>
                                    <Nav.Link>Profile</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/admin/admins'>
                                    <Nav.Link>Admins</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/admin/players'>
                                    <Nav.Link>Players</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/admin/rooms'>
                                    <Nav.Link>Rooms</Nav.Link>
                                </LinkContainer>
                            </>
                        )
                    }
                    {
                        userInfo && !userInfo.is_staff && (
                            <>
                                <LinkContainer to='/player/profile'>
                                    <Nav.Link>Profile</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/player/sessions'>
                                    <Nav.Link>Sessions</Nav.Link>
                                </LinkContainer>
                                <NavDropdown title='Transactions' id='transactions'>
                                    <LinkContainer to='/player/room-transactions'>
                                        <NavDropdown.Item>Room Transactions</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/player/player-transactions'>
                                        <NavDropdown.Item>Player Transactions</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            </>
                        )
                    }              
                </Nav>
                <Nav className="justify-content-end">
                    {
                        userInfo ? (
                            <Nav.Link onClick={logoutHandler} className='mr-auto'>Logout</Nav.Link>
                        ) : (
                            <LinkContainer to='/login' className='mr-auto'>
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )
                    } 
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}