import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Title } from '../components'

export default function TableView({ title = '', headers = [], data = [] }) {

    headers.sort((a, b) => a.seqnr - b.seqnr)
    data.sort((a, b) => a.seqnr - b.seqnr)

    const renderRow = (row) => {

        return (
            <TableRow 
                key={Math.random()}
                
               // sx={{ '&:last-child td, &:last-child th': { border: 'solid gray 2px' } }}
                >
                {headers.map(item => (

                    <TableCell 
                        key={Math.random()}
                        sx={{
                            color: item.colorize && (row.color && row.color)
                        }}
                        >
                            {row[item.fieldname]}
                    </TableCell>
                    
                        ))}
            </TableRow>
            
        )
    }

    return (
        <React.Fragment>
            <Title title={title} />
            <Table>
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
