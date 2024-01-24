import React, { useState, useEffect } from 'react'
import { Box, Button, Paper, CircularProgress, Stack, Chip } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector, GridToolbarColumnsButton, GridToolbarFilterButton } from '@mui/x-data-grid';
import { AlertDialog, MessageDialog, LoadingCircle, StyledSkeleton } from '../components';
import Dashboard from '../API/apiService';

export default function CustomTableData() {

    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(false);
    const [modalDialog, setModalDialog] = useState(false);
    const [messageDialog, setMessageDialog] = useState(false);



    useEffect(() => {

        async function loadData() {
            setIsLoading(true);

            setColumns([
              //  { field: 'id', headerName: 'ID', width: 70, sortable: false },
                { field: 'name', headerName: 'Name', width: 250 },
                { field: 'capital', headerName: 'Capital', width: 150 },
                { field: 'region', headerName: 'Region', width: 150 },
                { field: 'subregion', headerName: 'Subregion', width: 230 },
                { field: 'continent', headerName: 'Continent', width: 150 },
                { field: 'area', headerName: 'Area', type: 'number', width: 130 },
                // { field: 'areaProzt', headerName: 'Area %', type: 'number', width: 130 },
                { field: 'population', headerName: 'Population', type: 'number', width: 150 },
                // { field: 'populationProzt', headerName: 'Population %', type: 'number', width: 150 },
                { field: 'unmember', headerName: 'UN Member', width: 100, renderCell: (params) => renderChipUnMember(params) },
                { field: 'image', sortable: false, headerName: 'Flag', width: 110, renderCell: (params) => renderFlag(params) },

            ])

            const data = await Dashboard.getCountries();
            // const accum = await Dashboard.getAccumCountry();

            const tmp = data
                .sort((a, b) => a.name.common.localeCompare(b.name.common))
                .map((item, index) => {

                    return {
                        id: index + 1,
                        name: item.name.common || '',
                        capital: item.capital,
                        region: item.region,
                        subregion: item.subregion,
                        continent: item.continents || '',
                        area: item.area,
                        // areaProzt: (item.area / accum.area) * 100,
                        population: item.population,
                        // populationProzt: (item.population / accum.population) * 100,
                        svg: item.flags.svg,
                        unmember: (Boolean(item.unMember)) ? 'Yes' : 'No',
                        image: ''
                    }

                })

            setRows(tmp)

            //setMaxId(Math.max(...tmp.map(o => o.id)))
            setIsLoading(false)
        }

        loadData()

    }, [])

    const renderFlag = (params) => {

        return (
            <img height={64} width={96} src={params.row.svg} alt={params.row.name} />
        )
    }
    const renderChipUnMember = (params) => {

        return (
            <Chip
                label={params.value}
                color={params.value === 'Yes' ? 'success' : 'error'}
                icon={params.value === 'Yes' ? <TagFacesIcon /> : <SentimentVeryDissatisfiedIcon />}
            />
        )
    }
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

        setRows(prev => prev.filter(item => {

            if (!selectedRows.includes(item.id)) {
                return item
            }

            return null;
        }))

        setProgress(false);
       /*  setTimeout(() => {
            setProgress(false)
        }, 2000) */

    }

    const handleOnSelectionModelChange = (ids) => {
        setSelectedRows(ids)
    }

    const createRandomRow = () => {
        var lastId = rows.reduce((prev, current) => {
            return (prev && prev.id > current.id ? prev.id : current.id)
          })
        lastId++
        return { id: lastId, name: 'Random', capital: 'random', region: "random", unMember: 'No' }

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
                     <Button
                        sx={{ padding: '5px' }}
                        startIcon={<AddBoxOutlinedIcon />}
                        onClick={handleOnAddRow}>
                        add row
                    </Button>
                </Stack>

            </GridToolbarContainer>
        );
    }


    return (
        <Box
            width='100%'
        >

            {isLoading ?

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
                                title='Remove items from table'
                                toggle={modalDialog}
                                onReject={() => setModalDialog(false)}
                                onAccept={handleOnDelete}
                            />
                        }

                        {messageDialog &&
                            <MessageDialog
                                toggle={messageDialog}
                                severity='error'
                                width='500px'
                                title='my App'
                                message='select a row'
                                onReject={() => setMessageDialog(false)}
                            />
                        }

                        {progress ?

                           // <LoadingCircle content='progressbar'/> 
                            <StyledSkeleton content="grid"/>
                            :

                            <DataGrid
                                onSelectionModelChange={handleOnSelectionModelChange}
                                autoHeight={true}
                                autoPageSize={true}
                                rows={rows}
                                columns={columns}
                                pageSize={25}
                                loading={isLoading}
                                checkboxSelection={true}
                                components={{ Toolbar: CustomToolbar }}
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
                        }

                    </Paper>
                </Stack>

            }
        </Box>
    )
}
