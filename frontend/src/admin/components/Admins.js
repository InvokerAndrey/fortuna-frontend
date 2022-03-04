import React from 'react'

import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { ImProfile } from 'react-icons/im'
import { FcPlus } from 'react-icons/fc'



export default ({ admins }) => {
    return (
        <Table hover responsive className="table-sm" style={{textAlign: 'center', verticalAlign: 'middle'}}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>FULL NAME</th>
                    <th>EMAIL</th>
                    <th>RATE (%)</th>
                    <th>DETAILS</th>
                </tr>
            </thead>
            <tbody>
                {admins.map((admin, index) => (
                    <tr key={admin.id}>
                        <td>{index + 1}</td>
                        <td>{admin.user.full_name}</td>
                        <td>{admin.user.email}</td>
                        <td>{admin.rate}</td>
                        <td>
                            <LinkContainer to={`${admin.id}`}>
                                <Button variant='white' title='Details'><ImProfile /></Button>
                            </LinkContainer>
                        </td>
                    </tr>
                ))}
                <LinkContainer to={'/register/admin'}>
                    <tr title='Register new Admin'>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><FcPlus /></td>
                    </tr>
                </LinkContainer>
            </tbody>
        </Table>
    )
}
