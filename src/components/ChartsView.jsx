import React from 'react'
import { Chart, SimpleLineChart, TableView, SimpleAreaChart, SimpleBarChart, StackedBarChart, PieChartWithLabel, Title, BarChartH } from '../components'
import { Box, Grid, Stack, Container, Paper, Chip } from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

export default function ChartsView() {

    const renderStatus = (params) => {

        return (
            <Chip
                label={params.status}
                color={params.status === 'online' ? 'success' : 'error'}
                icon={params.status === 'online' ? <TagFacesIcon /> : <SentimentVeryDissatisfiedIcon />}
            />
        )
    }
    const headers = [
        { fieldname: 'name', seqnr: 1, name: 'Name' },
        { fieldname: 'serial', seqnr: 2, name: 'Serial' },
        { fieldname: 'mac', seqnr: 3, name: 'Mac' },
        { fieldname: 'model', seqnr: 4, name: 'Model' },
        { fieldname: 'firmware', seqnr: 5, name: 'Firmware' },
        { fieldname: 'status', seqnr: 7, name: 'Status', colorize: false, renderCell: renderStatus },
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
            "id": Math.random(),
        },
        {
            "id": Math.random(),
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
            "id": Math.random(),
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
            "id": Math.random(),
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
            "id": Math.random(),
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
            "id": Math.random(),
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

    const renderGrid = () => {

        return (
            <Container component='main' width='100vw'>
                <Box>
                <Grid
                    container
                    spacing={2}
                >

                    <Grid
                        item
                        xs={12}>
                        <PieChartWithLabel
                            title='Status'
                            chartData={chartData}
                        />
                    </Grid>

            <Title title='bar chart'/>
                    <Grid
                        item
                        xs={12}
                    >
                        <BarChartH/>
                    </Grid>

                    <Grid
                        item
                        xs={12}>

                        <TableView
                            title='Devices'
                            headers={headers}
                            data={data}
                            useElevation={10}
                        />


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

                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{pb: '5px'}}>
                            <Title title='Pie Chart' />
                            <Stack
                                alignItems='center'
                            >
                                <PieChart
                                    tooltip={{}}
                                    colors={['red', 'blue', 'green', 'orange']}
                                    series={[
                                        {
                                            arcLabel: (item) => `${item.short} (${item.value})`,
                                            arcLabelMinAngle: 45,
                                            data: [
                                                { id: 0, value: 10, label: 'series A', short: 'A' },
                                                { id: 1, value: 15, label: 'series B', short: 'B' },
                                                { id: 2, value: 20, label: 'series C', short: 'C' },
                                                { id: 3, value: 10, label: 'series D', short: 'D' },
                                            ],
                                            innerRadius: 20,
                                            cornerRadius: 5,
                                            paddingAngle: 5,

                                        },
                                    ]}
                                    sx={{
                                        [`& .${pieArcLabelClasses.root}`]: {
                                            fill: 'white',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                    width={400}
                                    height={200}
                                /* slotProps={{
                                    legend: {
                                      direction: 'row',
                                      position: { vertical: 'top', horizontal: 'middle' },
                                      padding: 0,
                                    },
                                  }} */
                                />
                            </Stack>
                        </Paper>


                    </Grid>

                </Grid>
                </Box>
            </Container>
        )
    }

    const renderMain = () => {

        return (
            <Container component='main' width='100vw'>
    
                {/* <Box> */}
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
                                <SimpleBarChart />
                            </Paper>
    
                            <Paper>
                                <StackedBarChart />
                            </Paper>
                        </Stack>
    
    
                    </Stack>
                {/* </Box> */}
            </Container>
        )
    }

    return(
        <React.Fragment>
            {renderMain()}
            {renderGrid()}
        </React.Fragment>
    )
}
