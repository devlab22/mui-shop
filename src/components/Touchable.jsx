import React from 'react'
import { Grid, Card, CardActionArea, CardContent, Typography, Stack, CardHeader } from '@mui/material';


export default function Touchable({id='', title='', text='', onCardClicked=Function.prototype}) {

    const [ raised, setRaised ] = React.useState(false)
    return (
        <Grid item xs='auto' md='auto'>
            <Card
                sx={{
                    overflow: 'auto',
                    maxWidth: 200,
                    minWidth: 100,
                    minHeight: 50,
                    borderRadius: '15px',
                    height: '100%',
                    pb: '5px'
                }}
                raised={raised}
                onMouseOver={() => setRaised(true)}
                onMouseOut={() => setRaised(false)}
            >

                <CardActionArea
                    onClick={() => onCardClicked(id)}
                >
                    <Stack
                        flexDirection='column'
                        alignItems='center'
                    >
                        <CardHeader title={title} />
                        <Stack>
                            <Typography
                                variant='p'
                                component='h3'
                            >
                                {text}
                            </Typography>

                        </Stack>

                    </Stack>
                </CardActionArea>

            </Card>
        </Grid>
    )
}
