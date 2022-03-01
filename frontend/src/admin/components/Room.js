import React from "react";
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default ({ room }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Card.Body>
                <Link to={`/rooms/${room.id}`}>
                    <Card.Title>
                        <strong>{room.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>
    )
}