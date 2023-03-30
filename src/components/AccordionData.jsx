import React, { useState, useEffect } from 'react';
import { Grid, Accordion, AccordionDetails, Paper, AccordionSummary, Stack, Box, Typography } from '@mui/material';
import Dashboard from '../API/apiService';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionData() {

    const [expanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([])

    useEffect(() => {
        async function loadData() {

            setIsLoading(true);
            const data = await Dashboard.getCountries();
            setItems(data.sort((a,b) => a.name.common.localeCompare(b.name.common)))
            setIsLoading(false)

        }

        loadData()
    }, [])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const addContent = (key = '', value = '') => {

        return (
            <Stack
                flexDirection='row'
                gap='5px'
            >
                <Typography
                    variant='p'
                    component='h4'
                >
                    {`${key}:`}
                </Typography>

                <Typography
                    variant='p'
                    component='h4'
                    sx={{ opacity: 0.8 }}
                >
                    {value}
                </Typography>

            </Stack>
        )
    }

    return (
        <Box>
            <Paper
                sx={{width: '800px', m: 'auto'}}
            >

                {items.map((item, index) => (

                    <Accordion
                        key={index}
                        expanded={expanded === item.name.common}
                        onChange={handleChange(item.name.common)}
                        
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Stack
                                width='100%'
                                direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                            >
                                <Typography 
                                  sx={{  flexShrink: 0 }}
                                  >
                                    {`${item.name.common} ( ${item.name.official} )`}
                                </Typography>
                                <img src={item.flags.svg} height='40px' width='auto' alt={item.name.common} />
                            </Stack>

                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack>
                                {addContent('Capital', item.capital)}
                                {addContent('Continent', item.continents)}
                                {addContent('Region', item.region)}
                                {addContent('Subregion', item.subregion)}
                                {addContent('Area', `${new Intl.NumberFormat().format(item.area)} km`)}
                                {addContent('Population', new Intl.NumberFormat().format(parseInt(item.population)))}
                                {addContent('UN Member', (Boolean(item.unMember)) ? 'Yes' : 'No' )}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                ))}

            </Paper>
        </Box>
    )
}
