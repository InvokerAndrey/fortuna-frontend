import React from "react";
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default ({ admin }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Card.Body>
                <Link to={`/admins/${admin.id}`}>
                    <Card.Title>
                        <strong>{admin.user.full_name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text>
                    <p>email: <strong>{admin.user.email}</strong></p>
                    <p>rate: <strong>{admin.rate}%</strong></p>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
