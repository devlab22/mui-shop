import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, tableCellClasses } from '@mui/material'
import { Title } from '../components'
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function TableView({ title = '', headers = [], data = [], useElevation = 3 }) {

    headers.sort((a, b) => a.seqnr - b.seqnr)
    data.sort((a, b) => a.seqnr - b.seqnr)
    const [elevation, setElevation] = React.useState(3)

    const Row = ({row={}}) => {

        return (
            <StyledTableRow
                key={Math.random()}

            // sx={{ '&:last-child td, &:last-child th': { border: 'solid gray 2px' } }}
            >
                {headers.map(header => (

                    <StyledTableCell
                        key={Math.random()}
                        sx={{
                            color: header.colorize && (row.color && row.color)
                        }}
                    >
                        {header.renderCell ?
                            header.renderCell(row)
                            :
                            row[header.fieldname]
                        }

                    </StyledTableCell>

                ))}
            </StyledTableRow>

        )
    }

    return (
        <Paper
            elevation={elevation}
            onMouseOver={() => setElevation(useElevation)}
            onMouseLeave={() => setElevation(3)}
        >
            <TableContainer>
                <Title title={title} />
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            {headers.map(item => (
                                <StyledTableCell key={Math.random()}>{item.name}</StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                            <Row key={row.id} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
