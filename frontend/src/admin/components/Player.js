import React from "react";
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default ({ player }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Card.Body>
                <Link to={`/players/${player.id}`}>
                    <Card.Title>
                        <strong>{player.user.full_name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text>
                    <p>username: <strong>{player.user.username}</strong></p>
                    <p>email: <strong>{player.user.email}</strong></p>
                    <p>rate: <strong>{player.rate}%</strong></p>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}