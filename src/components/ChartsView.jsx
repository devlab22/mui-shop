import React from 'react'
import { Chart, SimpleLineChart, TableView, SimpleAreaChart, SimpleBarChart, StackedBarChart, PieChartWithLabel } from '../components'
import { Box, Stack, Container, Paper, Divider } from '@mui/material';

export default function ChartsView() {

    const headers = [
        {fieldname: 'id', seqnr:1, name: 'ID'},
        {fieldname: 'name', seqnr:2, name: 'Firstname'},
        {fieldname: 'lastname', seqnr:3, name: 'Lastname'},
        {fieldname: 'age', seqnr:4, name: 'Age'},
        {fieldname: 'country', seqnr:5, name: 'Country'},
        {fieldname: 'city', seqnr:6, name: 'City'},
    ]

    const data =[
        {seqnr:1, name: 'Peter', id:'12', lastname:'Meier', age: 20, country: 'Germany', city: 'Hamburg'},
        {seqnr:2, name: 'Bender', id:'10', lastname: 'Klose', age: 25, country: 'USA', city: 'Los Angeles'}
    ] 
    return (
        <Container component='main'>
            <Box>
                <Stack gap={2}>
                    <Paper
                    sx={{p:'20px'}}
                    >
                        <TableView 
                        title='Data'
                        headers={headers}
                        data={data}
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

                    <Paper sx={{p:'20px'}}>
                        <PieChartWithLabel />
                    </Paper>

                </Stack>
            </Box>
        </Container>
    )
}
