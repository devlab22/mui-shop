import React, { useState, useEffect } from 'react';
import Dashboard from '../API/apiService';
import { Box } from '@mui/material';
import { CardItemList, MyTools } from '../components';

export default function Countries({ firstLetter = null }) {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filterValue, setFilterValue] = useState('*')

    useEffect(() => {

        async function loadData() {

            setIsLoading(true);
            const data = await Dashboard.getCountries();
            if (firstLetter) {
                setItems(data.filter(item => item.name.common[0] === firstLetter))
            } else {
                setItems(data)
            }

            setIsLoading(false);
        }

        loadData();

    }, [])

    const handleOnItemClicked = (name) => {

        const item = items.find(item => item.name['common'] === name);
        window.open(item.maps.googleMaps, '_blank', 'noreferrer');
    }

    const handleOnItemChecked = (name, checked) => {

    }

    const handleOnRegionChange = (value) => {
        setFilterValue(value)
    }

    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <Box
            sx={{
                pt: '0px',
                pb: '10px',
                height: '100%',
                width: '100%',
                overflow: 'auto',
                border: '0px solid gray'
            }}
        >

            <MyTools
                onChangeSearchValue={handleChange}
                filter={[
                    {key: '*', value: 'All'},
                    {key: 'europe', value: 'Europe'},
                    {key: 'asia', value: 'Asia'},
                    {key: 'north america', value: 'North America'},
                    {key: 'south america', value: 'South America'},
                    {key: 'americas', value: 'Americas'},
                    {key: 'oceania', value: 'Oceania'},
                    {key: 'antarctica', value: 'Antarctica'},
                ]}
                sortValue={filterValue}
                onChangeSortValue={handleOnRegionChange}
                filterLabel='Continent'
            />

            <CardItemList
                items={items}
                isLoading={isLoading}
                sort={true}
                filterValue={filterValue}
                filterField='continents'
                searchValue={search}
                onCardItemClicked={handleOnItemClicked}
                onCheckboxChanged={handleOnItemChecked}
            />

        </Box>
    )
}
