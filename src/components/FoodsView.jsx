import React from 'react'
import { default as Food } from '../API/apiFoods'
import { Paper, TextField, Box, Button, Grid, Stack, List, ListItemButton, ListItemText, ListSubheader, Checkbox, FormGroup, FormLabel, FormControlLabel } from '@mui/material'
import { LoadingCircle } from '../components'

export default function FoodsView() {

    const [isLoading, setIsLoading] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const [foods, setFoods] = React.useState([])
    const [nutrients, setNutrients] = React.useState([])
    const [detailsTitle, setDetailsTitle] = React.useState('')
    const [filter, setFilter] = React.useState([])


    async function searchFood(value) {

        setIsLoading(true)

        const dataType = filter.toString()

        try {
            const data = await Food.getFoodSearch(value, dataType)
            setFoods(data.foods)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }

    }

    async function onSearch() {

        if (search === '') {
            return
        }

        clear()

        if (isNumeric(search)) {
            searchFoodById(search)
        }
        else {
            searchFood(search)
        }

    }

    function isNumeric(x) {
        return parseFloat(x).toString() === x.toString();
    }

    async function searchFoodById(fdcId) {

        setIsLoading(true)
        try {

            const data = await Food.getFoodById(fdcId)
            setFoods([data])
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    }

    const clear = () => {

        setFoods([])
        setNutrients([])
        setDetailsTitle('')
    }

    const handleOnCheck = (event, dataType) => {

        if (event.target.checked) {
            setFilter(prev => [...prev, dataType])
        }
        else {
            setFilter(prev => prev.filter(item => item !== dataType))
        }

    }

    const handleOnClickFood = (food) => {

        setDetailsTitle(`${food['description']} (${food['fdcId']}) Portion: 100g`)
        setNutrients(food['foodNutrients'])
    }

    const Search = () => {

        return (
            <React.Fragment>
                <Paper
                    variant='outlined'
                    component='div'
                    sx={{
                        width: '80%'
                    }}
                >
                    <Stack
                        gap={1}
                    >

                        <TextField
                            label='Search'
                            variant="outlined"
                            autoFocus
                            fullWidth
                            type='search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <FormGroup
                            sx={{
                                pl: '10px'
                            }}
                        >
                            <FormLabel>Filter</FormLabel>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filter.find(item => item === 'Branded') ? true : false}
                                        onChange={(e) => handleOnCheck(e, 'Branded')}
                                    />
                                }
                                label="Branded"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filter.find(item => item === 'Foundation') ? true : false}
                                        onChange={(e) => handleOnCheck(e, 'Foundation')}
                                    />
                                }
                                label="Foundation"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filter.find(item => item === 'Survey (FNDDS)') ? true : false}
                                        onChange={(e) => handleOnCheck(e, 'Survey (FNDDS)')}
                                    />
                                }
                                label="Survey (FNDDS)"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filter.find(item => item === 'SR Legacy') ? true : false}
                                        onChange={(e) => handleOnCheck(e, 'SR Legacy')}
                                    />
                                }
                                label="SR Legacy"
                            />
                        </FormGroup>

                        <Stack
                            gap={1}
                            direction='row'
                        >
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={onSearch}
                            >Search</Button>

                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => clear()}
                            >Clear</Button>
                        </Stack>

                        <List
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    {`Result ${foods.length}`}
                                </ListSubheader>
                            }
                            sx={{
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: '70vh',
                            }}
                        >

                            {foods.map((food, index) => (

                                <ListItemButton
                                    key={food['fdcId']}
                                    onClick={() => handleOnClickFood(food)}
                                >
                                    <ListItemText primary={`${index + 1}. ${food['description']}`} secondary={food['fdcId']} />
                                </ListItemButton>
                            ))}
                        </List>

                    </Stack>

                </Paper>

            </React.Fragment>
        )
    }

    const Details = () => {

        return (
            <React.Fragment>
                <Paper
                    variant='outlined'
                    component='div'
                    sx={{
                        width: '100%'
                    }}
                >

                    <List
                        subheader={
                            <ListSubheader component="div" id="details-list-subheader">
                                {detailsTitle}
                            </ListSubheader>
                        }
                        sx={{
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: '82.4vh',
                        }}
                    >

                        {nutrients.map((item, index) => (

                            <ListItemButton key={Math.random()}>
                                <ListItemText primary={`${index + 1}. ${item['nutrientName']} ${item['value']} ${item['unitName']}`} secondary={item['nutrientId']} />
                            </ListItemButton>

                        ))}

                    </List>

                </Paper>
            </React.Fragment>
        )
    }


    return (
        <React.Fragment>
            <Box
                component={Paper}
                sx={{
                    width: '100%'
                }}
            >

                {isLoading ?
                    <LoadingCircle />
                    :

                    <Grid container>

                        <Grid item xs={6}>
                            <Search />
                        </Grid>

                        <Grid item xs={6}>

                            {nutrients.length > 0 && <Details />}

                        </Grid>

                    </Grid>
                }

            </Box>
        </React.Fragment>

    )
}
