import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import { LinkContainer } from 'react-router-bootstrap'

import { FaTrash, FaUserEdit } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { FcPlus } from 'react-icons/fc'


export default ({ players }) => {

    const navigate = useNavigate()

    const tableStyle = {
        textAlign: 'center',
        verticalAlign: 'middle'
    }

    const events = {
        onDoubleClick: (e, column, columnIndex, row, rowIndex) => {
            navigate(`${row.id}`)
        },
    }

    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true,
            style: tableStyle,
            headerStyle: tableStyle,
            events: events,
        },
        {
            dataField: 'user.full_name',
            text: 'Name',
            sort: true,
            style: tableStyle,
            headerStyle: tableStyle,
            events: events,
        },
        {
            dataField: 'user.email',
            text: 'Email',
            style: tableStyle,
            headerStyle: tableStyle,
            events: events,
        },
        {
            dataField: 'rate',
            text: 'Rate %',
            sort: true,
            style: tableStyle,
            headerStyle: tableStyle,
            events: events,
        }
    ] 

    return (
        <BootstrapTable
            keyField='id'
            data={players}
            columns={columns}
            hover
            responsive
            condensed
            bordered={false}
            className="table-sm"
            pagination={paginationFactory({sizePerPage:10})}
        />
    )
}