import React from 'react'
import { Chart, SimpleLineChart, TableView, SimpleAreaChart, SimpleBarChart, StackedBarChart, PieChartWithLabel } from '../components'
import { Box, Stack, Container, Paper, Divider } from '@mui/material';

export default function ChartsView() {

    const headers = [
        {fieldname: 'name', seqnr:1, name: 'Name'},
        {fieldname: 'serial', seqnr:2, name: 'Serial'},
        {fieldname: 'mac', seqnr:3, name: 'Mac'},
        {fieldname: 'model', seqnr:4, name: 'Model'},
        {fieldname: 'firmware', seqnr:5, name: 'Firmware'},
        {fieldname: 'status', seqnr:7, name: 'Status', colorize: true},
        {fieldname: 'notes', seqnr:6, name: 'Notes'},
        
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
        { name: 'Alerting', value: 1, color: '#ffc400'},
        { name: 'Dormant', value: 2, color: '#e65100' },
    ];

    return (
        <Container component='main'>
            <Box>
                <Stack gap={2}>
                    <Paper
                    sx={{p:'20px'}}
                    >
                        <TableView 
                        title='Devices'
                        headers={headers}
                        data={data}
                        />
                    </Paper>
                    
                    <Paper sx={{p:'20px'}}>
                        <PieChartWithLabel 
                            title='Status' 
                            chartData={chartData}
                            />
                    </Paper>

                    <Paper
                    sx={{p:'20px'}}
                    >
                        <Chart />
                    </Paper>

                    <Paper sx={{p:'20px'}}>
                        <SimpleLineChart />
                    </Paper>

                    <Paper sx={{p:'20px'}}>
                        <SimpleAreaChart />
                    </Paper>

                   {/*  <Paper>
                        <SimpleBarChart />
                    </Paper>
                    <Paper>
                        <StackedBarChart />
                    </Paper> */}

                    <Paper
                        sx={{
                            display: "flex",
                            p: '20px'
                        }}
                    >
                        <SimpleBarChart width='50%' />
                        <Divider
                            orientation='vertical'
                            flexItem
                            light
                        />
                        <StackedBarChart width='50%' />
                    </Paper>

                </Stack>
            </Box>
        </Container>
    )
}
