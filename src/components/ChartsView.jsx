import React from 'react'
import { Chart, SimpleLineChart, TableView, SimpleAreaChart, SimpleBarChart, StackedBarChart, PieChartWithLabel } from '../components'
import { Box, Grid, Stack, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function ChartsView() {

    const [ pieElevation, setPieElevation] = React.useState(3)

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const headers = [
        { fieldname: 'name', seqnr: 1, name: 'Name' },
        { fieldname: 'serial', seqnr: 2, name: 'Serial' },
        { fieldname: 'mac', seqnr: 3, name: 'Mac' },
        { fieldname: 'model', seqnr: 4, name: 'Model' },
        { fieldname: 'firmware', seqnr: 5, name: 'Firmware' },
        { fieldname: 'status', seqnr: 7, name: 'Status', colorize: true },
        { fieldname: 'notes', seqnr: 6, name: 'Notes' },

    ]

    const data = [
        {
            "name": "My AP",
            "serial": "Q234-ABCD-5678",
            "mac": "00:11:22:33:44:55",
            "model": "MR34",
            "status": "online",
            "color": '#00e676',
            "notes": "My MR",
            "firmware": "wireless-25-14",
        },
        {
            "name": "My AP 2",
            "serial": "Q234-ABCD-1234",
            "mac": "00:33:22:33:44:55",
            "model": "MX34",
            "status": "online",
            "notes": "My MX",
            "firmware": "wireless-20-14",
            "color": '#00e676'
        },
        {
            "name": "My AP 2",
            "serial": "Q234-ABCD-1234",
            "mac": "00:33:22:33:44:55",
            "model": "MX34",
            "status": "offline",
            "notes": "My MX",
            "firmware": "wireless-20-14",
            "color": '#f50057'
        },
        {
            "name": "My AP 2",
            "serial": "Q234-ABCD-1234",
            "mac": "00:33:22:33:44:55",
            "model": "MX34",
            "status": "alerting",
            "notes": "My MX",
            "firmware": "wireless-20-14",
            "color": '#ffc400'
        },
        {
            "name": "My AP 2",
            "serial": "Q234-ABCD-1234",
            "mac": "00:33:22:33:44:55",
            "model": "MX34",
            "status": "dormant",
            "notes": "My MX",
            "firmware": "wireless-20-14",
            "color": '#e65100'
        },
        {
            "name": "My AP 2",
            "serial": "Q234-ABCD-1234",
            "mac": "00:33:22:33:44:55",
            "model": "MX34",
            "status": "dormant",
            "notes": "My MX",
            "firmware": "wireless-20-14",
            "color": '#e65100'
        }
    ]

    const chartData = [
        { name: 'Online', value: 2, color: '#00e676' },
        { name: 'Offline', value: 1, color: '#f50057' },
        { name: 'Alerting', value: 1, color: '#ffc400' },
        { name: 'Dormant', value: 2, color: '#e65100' },
    ];

    const renderSimpleGrid = () => {

        return (
            <Container component='main'>
                <Grid container spacing={1}>

                    <Grid item xs={6}>
                        <Paper
                            sx={{ alignItems: 'center' }}
                        >
                            <Typography>
                                xs=6
                            </Typography>
                        </Paper>

                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            xs=6
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        )
    }

    const renderGrid = () => {

        return (
            <Container component='main' width='100vw'>
                <Grid
                    container
                    spacing={2}
                >

                    <Grid
                        item
                        xs={12}>
                        <Paper 
                            elevation={pieElevation}
                            onMouseOver={() => setPieElevation(10)}
                            onMouseLeave={() => setPieElevation(3)}
                            >
                            <PieChartWithLabel
                                title='Status'
                                chartData={chartData}
                            />
                        </Paper>

                    </Grid>

                    <Grid
                        item
                        xs={12}>
                        <Paper elevation={3}>
                            <TableView
                                title='Devices'
                                headers={headers}
                                data={data}
                            />
                        </Paper>

                    </Grid>

                    <Grid
                        item
                        md={6}
                        sm={12}
                        xs={12}
                        >
                        <Paper elevation={3}>
                            <Chart />
                        </Paper>

                    </Grid>

                    <Grid
                        item
                        md={6}
                        sm={12}
                        xs={12}>
                        <Paper elevation={3}>
                            <SimpleLineChart />
                        </Paper>

                    </Grid>

                    <Grid
                        item
                        md={6}
                        sm={12}
                        xs={12}>
                        <Paper elevation={3}>
                            <SimpleBarChart />
                        </Paper>

                    </Grid>

                    <Grid
                        item
                        md={6}
                        sm={12}
                        xs={12}>
                        <Paper elevation={3}>
                            <StackedBarChart />
                        </Paper>

                    </Grid>

                </Grid>
            </Container>
        )
    }

    return (
        renderGrid()
    )

    return (
        <Container component='main'>
            <Box>
                <Stack gap={2}>
                    <Paper>
                        <TableView
                            title='Devices'
                            headers={headers}
                            data={data}
                        />
                    </Paper>

                    <Paper>
                        <PieChartWithLabel
                            title='Status'
                            chartData={chartData}
                        />
                    </Paper>

                    <Paper
                    >
                        <Chart />
                    </Paper>

                    <Paper>
                        <SimpleLineChart />
                    </Paper>

                    <Paper>
                        <SimpleAreaChart />
                    </Paper>

                    <Stack gap={2}  >
                        <Paper >
                            <SimpleBarChart/>
                        </Paper>

                        <Paper>
                            <StackedBarChart />
                        </Paper>
                    </Stack>


                </Stack>
            </Box>
        </Container>
    )
}
