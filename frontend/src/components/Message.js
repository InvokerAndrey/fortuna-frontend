import React, { useState } from "react";
import { Alert } from 'react-bootstrap'


export default ({variant, children}) => {

    const [show, setShow] = useState(true)

    if (show) {
        return (
            <Alert
                variant={variant}
                onClose={() => setShow(false)}
                dismissible
            >
                {children}
            </Alert>
        )
    }
    return <div></div>
}
    