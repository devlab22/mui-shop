import React, { useState, useEffect } from 'react';
import Dashboard from '../API/apiService';
import { Box } from '@mui/material';
import { CardItemList, Search } from '../components';

export default function Countries({ firstLetter = null }) {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

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
        console.log(item)
    }

    const handleOnItemChecked = (name, checked) => {

    }

    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <Box
            sx={{
                pt: '80px',
                pb: '10px',
                height: '100%',
                width: '100%',
                overflow: 'auto',
                border: '0px solid gray'
            }}
        >

            <Search
                value={search}
                onChange={handleChange}
            />

            <CardItemList
                items={items}
                isLoading={isLoading}
                sortValue={true}
                searchValue={search}
                onCardItemClicked={handleOnItemClicked}
                onCheckboxChanged={handleOnItemChecked}
            />

        </Box>
    )
}
