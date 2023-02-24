import React, { useState, useEffect } from 'react'
import { Box, Button, Paper, CircularProgress, Stack, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid, nlNL, GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector, GridToolbarColumnsButton, GridToolbarFilterButton } from '@mui/x-data-grid';
import { AlertDialog, MessageDialog } from '../components';
import Dashboard from '../API/apiService';

export default function CustomTableData() {

    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [maxId, setMaxId] = useState(0);
    const [progress, setProgress] = useState(false);
    const [modalDialog, setModalDialog] = useState(false);
    const [messageDialog, setMessageDialog] = useState(false);

    const localeText = {
        toolbarColumns: 'Spalten'
    }

    //console.log(nlNL.components.MuiDataGrid.defaultProps.localeText)

    useEffect(() => {

        async function loadData() {
            setIsLoading(true);


            /*  setColumns([
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
             ]); */

            setColumns([
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'name', headerName: 'Name', width: 250 },
                { field: 'capital', headerName: 'Capital', width: 150 },
                { field: 'region', headerName: 'Region', width: 150 },
                { field: 'subregion', headerName: 'Subregion', width: 230 },
                { field: 'area', headerName: 'Area', type: 'number', width: 130 },
                { field: 'population', headerName: 'Population', type: 'number', width: 150 },
                { field: 'image', sortable: false, headerName: 'Flag', width: 110, renderCell: (params) => <img height={64} width={96} src={params.row.svg} alt={params.row.name} /> },

            ])

            const data = await Dashboard.getCountries();
            // console.log(data)

            const tmp = data
               // .sort((a, b) => a.name.common.localeCompare(b.name.common))
                .map((item, index) => {
                    return {
                        id: index,
                        name: item.name.official || '',
                        capital: item.capital,
                        region: item.region,
                        subregion: item.subregion,
                        area: item.area,
                        population: item.population,
                        svg: item.flags.svg,
                        image: ''
                    }

                })


            setRows(tmp)

            //setMaxId(Math.max(...tmp.map(o => o.id)))
            setIsLoading(false)
        }

        loadData()

    }, [])

    const handleOnDeleteDialog = () => {

        if (selectedRows.length === 0) {
            setMessageDialog(true)
        }
        else {
            setModalDialog(true)
        }


    }
    const handleOnDelete = () => {

        setModalDialog(false)
        setProgress(true)
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

        setTimeout(() => {
            setProgress(false)
        }, 2000)
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

        setProgress(true);
        setRows((prev) => [...prev, createRandomRow()]);

        setTimeout(() => {
            setProgress(false)
        }, 2000)
    }

    const CustomToolbar = () => {

        return (
            <GridToolbarContainer >
                <Stack
                    direction='row'
                    spacing={1}
                >
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                    <Button
                        sx={{ padding: '5px' }}
                        startIcon={<DeleteOutlineOutlinedIcon />}
                        onClick={handleOnDeleteDialog}>
                        delete
                    </Button>
                    {/*  <Button
                        sx={{ padding: '5px' }}
                        startIcon={<AddBoxOutlinedIcon />}
                        onClick={handleOnAddRow}>
                        add row
                    </Button> */}
                </Stack>

            </GridToolbarContainer>
        );
    }


    return (
        <Box
            width='100%'
        >

            {progress ?

                <Stack
                    alignItems='center'
                    sx={{ mt: '10%' }}
                >
                    <CircularProgress />
                </Stack>

                :

                <Stack
                    height='90%'
                >

                    <Paper>

                        {modalDialog &&
                            <AlertDialog
                                question='Do you want to delete item?'
                                description='Remove items from table'
                                toggle={modalDialog}
                                onReject={() => setModalDialog(false)}
                                onAccept={handleOnDelete}
                            />
                        }

                        {messageDialog &&
                            <MessageDialog
                                toggle={messageDialog}
                                msgty='E'
                                severity='error'
                                width='500px'
                               // title='Table App'
                                message='Select a row'
                                onReject={() => setMessageDialog(false)}
                            />
                        }

                        <DataGrid
                            onSelectionModelChange={handleOnSelectionModelChange}
                            autoHeight={true}
                            autoPageSize={true}
                            rows={rows}
                            columns={columns}
                            pageSize={12}
                            loading={isLoading}
                            checkboxSelection={true}
                            components={{ Toolbar: CustomToolbar }}
                            //   localeText={localeText}
                            componentsProps={{
                                toolbar: {
                                    csvOptions: {
                                        fileName: 'customerDataBase',
                                        delimiter: ';',
                                        utf8WithBom: true,
                                    }
                                }
                            }}

                        />
                    </Paper>
                </Stack>

            }
        </Box>
    )
}
