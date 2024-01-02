import React from 'react'
import { Chart, SimpleLineChart, SimpleAreaChart, SimpleBarChart, StackedBarChart, PieChartWithLabel } from '../components'
import { Box, Stack, Container, Paper, Divider } from '@mui/material';

export default function ChartsView() {
    return (
        <Container component='main'>
            <Box>
                <Stack gap={2}>
                    <Paper>
                        <Chart />
                    </Paper>

                    <Paper>
                        <SimpleLineChart />
                    </Paper>

                    <Paper>
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
                            display: "flex"
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

                    <Paper>
                        <PieChartWithLabel />
                    </Paper>

                </Stack>
            </Box>
        </Container>
    )
}
