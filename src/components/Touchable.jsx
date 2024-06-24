import React from 'react'
import { Grid, Avatar, CardMedia, CardContent, Card, CardActions, CardActionArea, Typography, Stack, CardHeader } from '@mui/material';
import { Toolbar} from '../components'

export default function Touchable({ minHeight = 50, avatar, poster = false, id = '', title = '', keyValues = [], values = [], buttons = [], customButtons = [], onCardClicked }) {

    const [raised, setRaised] = React.useState(false)

    const toolbarStyle = {
        width: '100%',
        justifyContent: 'flex-end'
    }

    const addContent = (params = {}) => {

        return (
            <Stack
                flexDirection='row'
                gap='5px'
                key={params.key}

            >
                <Typography
                    variant='p'
                    component='h3'
                    sx={{ opacity: '0.7' }}
                >
                    {`${params.key}:`}
                </Typography>

                <Typography
                    variant='p'
                    component='h3'
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
                sx={{pl: '5px'}}
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
                            }}
                        >
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

                <Stack 
                    gap='5px'
                    sx={{pt: '5px'}}
                    >

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
                {(buttons.length > 0 || customButtons.length > 0) && (
                    <CardActions>
                        <Toolbar id={id} buttons={customButtons} styles={toolbarStyle} />
                        <Toolbar id={id} buttons={buttons} styles={toolbarStyle}/>
                    </CardActions>
                )}

            </Card>
        </Grid>
    )
}
