import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Grid3x3GapFill } from 'react-bootstrap-icons'
import { LinkContainer } from 'react-router-bootstrap'


export default () => (
    <Navbar bg="light" expand="lg">
        <Container>
            <Grid3x3GapFill />
            <LinkContainer to='/'>
                <Navbar.Brand href="#home">FortunaPoker</Navbar.Brand>
            </LinkContainer>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <LinkContainer to='/players'>
                    <Nav.Link>Players</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/rooms'>
                    <Nav.Link>Rooms</Nav.Link>
                </LinkContainer>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)