import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import UserService from "../services/UserService";


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
                <LinkContainer to='/'>
                    <Navbar.Brand href="#home">FortunaPoker</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {
                        userInfo && userInfo.is_staff && (
                            <>
                                <LinkContainer to='/players'>
                                    <Nav.Link>Players</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/rooms'>
                                    <Nav.Link>Rooms</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/admins'>
                                    <Nav.Link>Admins</Nav.Link>
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
                                <LinkContainer to='/player/room-transactions/'>
                                    <Nav.Link>Room Transactions</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/player/player-transactions/'>
                                    <Nav.Link>Player Transactions</Nav.Link>
                                </LinkContainer>
                            </>
                        )
                    }
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