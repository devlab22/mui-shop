import React from 'react'
import CardItem from './CardItem';
import { Box, Grid, Typography } from '@mui/material';
import { useItems } from '../hooks/useItems';

export default function CardItemList({ items = [], searchValue = '', sort = false, filterField='region', filterValue = '*', onCheckboxChanged, onCardItemClicked, isLoading = false }) {

    const filteredItems = useItems(items, sort, searchValue, filterValue, filterField);

    return (
        <Box>  

            {!isLoading &&         
            <Typography 
                variant="h2" 
                component="h1"
                sx={{
                    textAlign: 'center'
                }}
                >
                {`Count: ${filteredItems.length}`}
            </Typography>
            }

            <Grid
                container
                spacing={2}
                sx={{
                    pl: '10px'
                }}
            >

                {(isLoading ? [...Array(3)] : filteredItems)
                    .map((item, index) => (
                        <CardItem
                            key={index}
                            isLoading={isLoading}
                            onCheckboxChanged={onCheckboxChanged}
                            onCardClicked={onCardItemClicked}
                            {...item} />
                    ))}

            </Grid>

        </Box>

    )
}