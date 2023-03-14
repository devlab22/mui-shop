import React, { useState } from 'react';
import { Search, MyFilter } from '.';
import { Card, CardContent } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function MyTools({ onChangeSearchValue = Function.prototype, sortValue, onChangeSortValue = Function.prototype, filter = [], filterLabel='sort' }) {

    const [raised, setRaised] = useState(false);

    return (
        <ThemeProvider theme={theme}>

            <Card
                sx={{
                    m: '10px',
                    border: '0px solid #1972d2',
                    borderRadius: '20px',
                    width: '400px'

                }}
                raised={raised}
                onMouseOver={() => setRaised(true)}
                onMouseOut={() => setRaised(false)}
            >

                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}
                >


                    {onChangeSearchValue &&
                        <Search onChange={onChangeSearchValue} />
                    }

                    {Array.isArray(filter) && filter.length > 0 &&
                        <MyFilter
                            label={filterLabel}
                            options={filter}
                            value={sortValue}
                            onChange={onChangeSortValue}
                        />
                    }
                </CardContent>
            </Card>
        </ThemeProvider>
    )
}