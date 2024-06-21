import React from 'react'
import { Grid, IconButton, Avatar, CardMedia, CardContent, Card, CardActions, CardActionArea, Typography, Stack, CardHeader } from '@mui/material';
import { default as API } from '../API/apiService'

export default function Touchable({ minHeight = 50, avatar, poster, id = '', title = '', keyValues = [], values = [], buttons = [], onCardClicked }) {

    const [raised, setRaised] = React.useState(false)

    const addContent = (params = {}) => {

        return (
            <Stack
                flexDirection='row'
                gap='5px'
                key={params.key}
            >
                <Typography
                    variant='p'
                    component='h4'
                    sx={{ opacity: '0.7' }}
                >
                    {`${params.key}:`}
                </Typography>

                <Typography
                    variant='p'
                    component='h4'
                >
                    {params.value}
                </Typography>

            </Stack>
        )
    }
    const setKeyValues = () => {

        return (
            <Stack
                gap='5px'
            >

                {keyValues.map(value => (
                    addContent(value)
                ))}

            </Stack>
        )
    }
    const setContent = () => {

        return (
            <Stack
                flexDirection='column'
                alignItems='center'
            >
                <CardHeader title={title} />

                {avatar && (

                    <Stack
                        sx={{
                            p: '5px 0'
                        }}
                    >
                        <Avatar
                            sx={{
                                bgcolor: 'secondary.main'
                            }}>
                            {avatar}
                        </Avatar>
                    </Stack>

                )}

                {poster && (
                    <CardMedia
                        height='140'
                        image={poster}
                        component='img'
                    />
                )}

                <Stack gap='5px'>

                    {values.map((value, index) => (
                        <Typography
                            variant='p'
                            component='h3'
                            key={index}
                        >
                            {value}
                        </Typography>
                    ))}

                </Stack>

            </Stack>
        )
    }
    const setContentArea = () => {

        return (
            <CardContent>
                {setContent()}
                {setKeyValues()}
            </CardContent>
        )
    }
    const setActionArea = () => {

        return (
            <CardActionArea
                onClick={() => onCardClicked(id)}
            >
                {setContent()}
                {setKeyValues()}
            </CardActionArea>
        )
    }
    const setToolbar = () => {

        if (buttons.length > 1) {
            buttons.sort((a, b) => a.seqnr - b.seqnr);
        }

        return (
            <Grid
                container
                direction='row'
                justifyContent='flex-end'
            >

                {buttons.map(button => (

                    <Grid item key={button.id}>
                        <IconButton
                            onClick={() => button.onClick(id)}
                            title={button.title}
                        >
                            {button.icon}
                        </IconButton>
                    </Grid>
                ))}

            </Grid>
        )
    }

    return (
        <Grid item xs='auto' md='auto'>
            <Card
                sx={{
                    // overflow: 'auto',
                    maxWidth: 300,
                    minWidth: 250,
                    minHeight: { minHeight },
                    borderRadius: '15px',
                }}
                raised={raised}
                onMouseOver={() => setRaised(true)}
                onMouseOut={() => setRaised(false)}
            >

                {onCardClicked ?
                    setActionArea()
                    :
                    setContentArea()
                }
                {buttons.length > 0 && (
                    <CardActions>
                        {setToolbar()}
                    </CardActions>
                )}

            </Card>
        </Grid>
    )
}
