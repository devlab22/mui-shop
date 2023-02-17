
import {
    Button,
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    Checkbox,
    CardMedia,
    Chip,
    FormControlLabel,
    Grid,
    Typography,
    ListItemIcon,
    Avatar,
    Stack,
    CardHeader,
} from '@mui/material';
import React, { useState } from 'react';
import { CardSkeleton } from '../components';

export default function CardItem({ id, name, flags, capital, region, subregion, area, population, icon, onCheckboxChanged, checked = null, checkedText, onCardClicked, isLoading }) {

    const [raised, setRaised] = useState(false);

    const onMouseOver = () => {
        setRaised(true);
    }

    const onMouseOut = () => {
        setRaised(false);
    }

    const getCardActionAriaContent = () => {

        return (
            <CardActionArea onClick={() => onCardClicked(name['common'])}>

                {getCardContentTop()}

                <CardContent>

                    {getCardContentBottom()}

                </CardContent>
            </CardActionArea>
        )
    }

    const getCardContent = () => {

        return (
            <>
                {getCardContentTop()}

                <CardContent>

                    {getCardContentBottom()}


                </CardContent>
            </>
        )
    }

    const getCardContentTop = () => {

        return (
            <Stack
                alignItems='center'
            >

                <CardHeader title={name['common']} />

                <CardMedia
                    height='140'
                    image={flags['svg']}
                    component='img'
                    title={name['common']}
                    alt={name['common']}
                />


                {icon && (
                    <img alt={name} src={icon} />
                )}
            </Stack>
        )
    }

    const getCardContentBottom = () => {

        return (
            <Stack
                gap='5px'
            >
                <Typography
                    variant='p'
                    component='h4'
                >
                    {`Capital: ${capital || ''}`}
                </Typography>

                <Typography
                    variant='p'
                    component='h4'
                >
                    {`Region: ${region}`}
                </Typography>

                <Typography
                    variant='p'
                    component='h4'
                >
                    {`Subregion: ${subregion}`}
                </Typography>


                <Stack
                   flexDirection='row'
                >

                    <Typography
                        variant='p'
                        component='h4'
                    >
                        {`Area: ${new Intl.NumberFormat().format(parseInt(area))} km`}
                    </Typography>

                    <Typography
                        variant='p'
                        component='h5'
                        sx={{ mt: '-5px' }}
                    >
                        2
                    </Typography>

                </Stack>


                <Typography
                    variant='p'
                    component='h4'
                >
                    {`Population: ${new Intl.NumberFormat().format(population)}`}
                </Typography>

            </Stack>
        )
    }

    return (
        <Grid item xs='auto' md='auto'>

            {isLoading ?
                <CardSkeleton key={id} />
                : (

                    <Card
                        sx={{
                            maxWidth: 300,
                            minWidth: 300,
                            borderRadius: '15px',
                            height: '100%',

                        }}
                        raised={raised}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}

                    >

                        {onCardClicked ? getCardActionAriaContent() : getCardContent()}

                        {checked !== null &&

                            <CardActions>

                                <FormControlLabel
                                    sx={{ pl: '10px' }}
                                    control={<Checkbox
                                        checked={checked}
                                        disabled={onCheckboxChanged ? false : true}
                                        onChange={(e) => onCheckboxChanged(name['common'], e.target.checked)}
                                    />}
                                    label={checkedText && checkedText}
                                />

                            </CardActions>
                        }

                    </Card>
                )
            }
        </Grid>

    );
};
