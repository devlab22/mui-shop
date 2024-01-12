import React from 'react'
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import { Title } from '../components'

export default function TableView({ title = '', headers = [], data = [] }) {

    headers.sort((a, b) => a.seqnr - b.seqnr)
    data.sort((a, b) => a.seqnr - b.seqnr)

    const renderRow = (row) => {

        return(
            <TableRow key={Math.random()}>
                {headers.map(item => (
                    <TableCell key={Math.random()}>
                        {row[item.fieldname]}
                    </TableCell>
                ))}
            </TableRow>
        )
    }

    return (
        <React.Fragment>
            <Title>{`${title}`}</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {headers.map(item => (
                            <TableCell key={Math.random()}>{item.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(row => renderRow(row))}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}
