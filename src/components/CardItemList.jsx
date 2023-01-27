import React from 'react'
import CardItem from './CardItem';
import { Grid } from '@mui/material';
import { useItems } from '../hooks/useItems';

export default function CardItemList({ items = [], searchValue='', sortValue=false, onCheckboxChanged, onCardItemClicked, isLoading = false }) {

   
    const filteredItems = useItems(items, sortValue, searchValue);

    return (
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
    )
}