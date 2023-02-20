import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function CustomTableData() {

    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [maxId, setMaxId] = useState(0);

    useEffect(() => {

        setIsLoading(true);
        setTimeout(() => {

            setColumns([
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'firstName', headerName: 'First name', width: 130 },
                { field: 'lastName', headerName: 'Last name', width: 130 },
                { field: 'age', headerName: 'Age', type: 'number', width: 90, },
                {
                    field: 'fullName', headerName: 'Full name', description: 'This column has a value getter and is not sortable.',
                    sortable: false,
                    width: 160,
                    valueGetter: (params) =>
                        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
                },
            ]);

            const data = [
                { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
                { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
                { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 25 },
                { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
                { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
                { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
                { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
                { id: 10, lastName: 'Snow', firstName: 'Jon', age: 35 },
                { id: 11, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                { id: 12, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                { id: 13, lastName: 'Stark', firstName: 'Arya', age: 16 },
                { id: 14, lastName: 'Targaryen', firstName: 'Daenerys', age: 25 },
                { id: 15, lastName: 'Melisandre', firstName: null, age: 150 },
                { id: 16, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
                { id: 17, lastName: 'Frances', firstName: 'Rossini', age: 36 },
                { id: 18, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
            ]
            setRows(data)

            setMaxId(Math.max(...data.map(o => o.id)))
            setIsLoading(false)

        }, 2000);

    }, [])

    const handleOnDelete = () => {

        const toDelete = selectedRows.map(id => {

            const item = rows.find(item => item.id === id)
            if (item) {
                return item
            }
        })

        setRows(prev => prev.filter(item => {

            if (!selectedRows.includes(item.id)) {
                return item
            }
        }))
    }

    const handleOnSelectionModelChange = (ids) => {
        setSelectedRows(ids)
    }

    const createRandomRow = () => {
        var nextId = maxId + 1;
        setMaxId(nextId)
        return { id: nextId, lastName: 'Random', firstName: 'random', age: Math.floor(Math.random() * 70) }

    }
    const handleOnAddRow = () => {
        setRows((prev) => [...prev, createRandomRow()]);
    }

    return (
        <Box
            width='100%'
        >

            <Button onClick={handleOnDelete}>delete</Button>
            <Button onClick={handleOnAddRow}>add row</Button>
            <DataGrid
                onSelectionModelChange={handleOnSelectionModelChange}
                autoHeight={true}
                autoPageSize={true}
                rows={rows}
                columns={columns}
                pageSize={12}
                loading={isLoading}
                checkboxSelection
            />
        </Box>
    )
}
