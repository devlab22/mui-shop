/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Dashboard from '../API/apiService';
import { Box } from '@mui/material';
import { CardItemList, MyTools } from '../components';

export default function Countries({ firstLetter = null, countries = [] }) {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filterValue, setFilterValue] = useState('*')
    const [fieldValue, setFieldValue] = useState('region');
    const [filterValues, setFilterValues] = useState([])
    const [regionItems, setRegionItems] = useState(new Set());
    const [subregionItems, setSubregionItems] = useState(new Set());
    const [continentItems, setContinentItems] = useState(new Set());

    useEffect(() => {

        async function loadData() {

            if(items.length > 0){
                return;
            }
            setIsLoading(true);

            if (countries.length === 0) {
               
                const data = await Dashboard.getCountries();

                if (firstLetter) {
                    setItems(data.filter(item => item.name.common[0] === firstLetter));
                } else {
                    setItems(data);
                }

                const filter = Dashboard.getFilters(data)
                setRegionItems(filter.regionItems);
                setSubregionItems(filter.subregionItems);
                setContinentItems(filter.continentItems);

            }else{

                if (firstLetter) {
                    setItems(countries.filter(item => item.name.common[0] === firstLetter));
                } else {
                    setItems(countries);
                }

                const filter = Dashboard.getFilters(countries)
                setRegionItems(filter.regionItems);
                setSubregionItems(filter.subregionItems);
                setContinentItems(filter.continentItems);
            }


            setIsLoading(false);
        }

        loadData();

    }, [] )

    useEffect(() => {
        fillFilterValues();
    }, [fieldValue, isLoading])

    const fillFilterValues = () => {

        setFilterValues([])
        var tmp = []
        tmp.push({ key: '*', value: 'All' })

        switch (fieldValue) {
            case 'region':
                regionItems.forEach(item => tmp.push({ key: item.toLowerCase(), value: item }));
                break;
            case 'subregion':
                subregionItems.forEach(item => tmp.push({ key: item.toLowerCase(), value: item }));
                break;
            case 'continents':
                continentItems.forEach(item => tmp.push({ key: item.toLowerCase(), value: item }));
                break;
            default:
                console.log('unknown field')
        }

        setFilterValues(tmp)
    }
    const handleOnItemClicked = (name) => {

        const item = items.find(item => item.name['common'] === name);
        window.open(item.maps.googleMaps, '_blank', 'noreferrer');
    }

    const handleOnItemChecked = (name, checked) => {

    }

    const handleOnRegionChange = (value) => {
        setFilterValue(value)
    }

    const handleOnFieldChange = (value) => {
        setFilterValue('*')
        setFieldValue(value)
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

            {!isLoading &&
                <MyTools
                    onChangeSearchValue={handleChange}
                    filter={filterValues}
                    sortValue={filterValue}
                    onChangeSortValue={handleOnRegionChange}
                    fields={[
                        { key: 'region', value: 'Region' },
                        { key: 'subregion', value: 'Subregion' },
                        { key: 'continents', value: 'Continent' },
                    ]}
                    fieldValue={fieldValue}
                    onChangeFieldValue={handleOnFieldChange}
                />
            }

            <CardItemList
                items={items}
                isLoading={isLoading}
                sort={true}
                filterValue={filterValue}
                filterField={fieldValue}
                searchValue={search}
                onCardItemClicked={handleOnItemClicked}
                onCheckboxChanged={handleOnItemChecked}
            />

        </Box>
    )
}
