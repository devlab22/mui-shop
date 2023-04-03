import React, { useEffect, useState } from 'react'
import CardItem from './CardItem';
import { Box, Grid, Typography } from '@mui/material';
import { useItems } from '../hooks/useItems';

export default function CardItemList({ items = [], searchValue = '', sort = false,
    filterField = 'region', filterValue = '*', onCheckboxChanged, onCardItemClicked,
    isLoading = false, changeCount = Function.prototype }) {

    const filteredItems = useItems(items, sort, searchValue, filterValue, filterField);
    const [cnt, setCnt] = useState(0)
    console.log(isLoading)

    useEffect(() => {
        
        console.log('use effect', filteredItems.length)
        setCnt(filteredItems.length)
        console.log(cnt)
        changeCount(cnt)

    }, [isLoading])


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