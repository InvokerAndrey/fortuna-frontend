import React from "react";
import { Spinner } from 'react-bootstrap'


export default () => (
    <Spinner
        animation="border"
        role="status"
        variant="dark"
        style={{
            height: '100px',
            width: '100px',
            margin: 'auto',
            display: 'block'
        }}
    >
    </Spinner>
)
