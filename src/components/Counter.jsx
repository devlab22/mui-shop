import React, { useState } from 'react'
import { Button, Box, Stack, Typography } from '@mui/material'

export default function Counter({ title, count = 0, onPlus, onMinus }) {

    const [counter, setCounter] = useState(count)

    const handleOnPlus = () => {
        setCounter(prev => prev + 1)
        var result = counter + 1
        onPlus && onPlus(result)
    }

    const handleOnMinus = () => {
        setCounter(prev => prev - 1)
        var result = counter - 1
        onMinus && onMinus(result)
    }
    return (
        <Box>
            <Stack
                display="flex"
                alignItems="center"
                gap={2}
                padding={2}
            >

                {title &&
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: "1.2rem"

                        }}
                        color="primary"
                    >
                        {title} 
                    </Typography>
                }

                <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: "1.2rem"

                    }}
                    color="primary"
                >
                    {counter} 
                </Typography>

                <Stack
                    direction="row"
                    gap={1}
                >
                    <Button
                        variant='contained'
                        onClick={handleOnPlus}
                    >+</Button>
                    <Button
                        variant='contained'
                        onClick={handleOnMinus}
                    >-</Button>
                </Stack>
            </Stack>

        </Box>
    )
}
