import React from 'react'
import { Card, CardContent, Button, FormHelperText } from '@mui/material';
import { Search, MyRadioGroup } from '.'

export default function SearchSubmit(props) {

    const { onRadioChange= Function.prototype, onSubmit = Function.prototype, onChange=Function.prototype, sxSearch = { width: '40%', minWidth: '400px' }, sxCard = { p: '5px', minWidth: '550px', width: 'auto', maxWidth: '40%', borderRadius: '20px', m: '10px' }, label, value = '', radiobuttons=[], rvalue='', radioTitle='', row=false } = props

    const [searchValue, setSearchValue] = React.useState(value);
    const [raised, setRaised] = React.useState(false);
    const [radioValue, setRadioValue] = React.useState(rvalue)
    const [helperText, setHelperText] = React.useState('');

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if(radiobuttons.length > 0 && radioValue === ''){
            setHelperText('Please select an option');
        }else{
            onSubmit(searchValue)
        }
        
    }

    const handleOnChange = (e) => {
        setSearchValue(e.target.value)
        onChange(e.target.value)
    }

    const handleOnRadioChange = (e) => {
        setRadioValue(e.target.value)
        setHelperText('')
        onRadioChange(e.target.value)
    }

    return (
        <Card
            sx={sxCard}
            raised={raised}
            onMouseOver={() => setRaised(true)}
            onMouseOut={() => setRaised(false)}
        >

            <CardContent 
                component='form'
                onSubmit={handleOnSubmit}
            >
                <Search
                    sx={sxSearch}
                    label={label}
                    value={searchValue}
                    onChange={handleOnChange}
                />

                <Button
                    variant='contained'
                    color='primary'
                    disabled={searchValue ? false : true}
                    sx={{
                        m: '10px 0px 0px 20px'
                    }}
                    type='submit'
                >
                    Search
                </Button>

                <MyRadioGroup
                    title={radioTitle}
                    value={radioValue}
                    values={radiobuttons}
                    onChange={handleOnRadioChange}
                    useElevation={0}
                    leaveElevation={0}
                    row={row}
                />

                <FormHelperText sx={{color: 'red'}}>{helperText}</FormHelperText>
            </CardContent>

        </Card>
    )
}