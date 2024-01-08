
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
import React, { useState, Fragment } from 'react';
import { CardSkeleton } from '../components';

export default function CardItem({ id, name, flags, capital, region, subregion, area, population, icon,
    onCheckboxChanged, checked = null, checkedText, onCardClicked, isLoading, unMember, continents }) {

    const [raised, setRaised] = useState(false);

    const onMouseOver = () => {
        setRaised(true);
    }

    const onMouseOut = () => {
        setRaised(false);
    }

    const getCardActionAriaContent = () => {

        return (
            <Fragment>
                <CardActionArea onClick={() => onCardClicked(name['common'])}>

                    {getCardContentTop()}

                </CardActionArea>

                <CardContent>

                    {getCardContentBottom()}

                </CardContent>
            </Fragment>

        )
    }

    const getCardContent = () => {

        return (
            <Fragment>
                {getCardContentTop()}

                <CardContent>

                    {getCardContentBottom()}


                </CardContent>
            </Fragment>
        )
    }

    const getCardContentTop = () => {

        return (
            <Stack
                alignItems='center'
            >

                <CardHeader title={name['common']} />

                <CardMedia
                    height='100%'
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

    const addContent = (key = '', value = '') => {

        return (
            <Stack
                flexDirection='row'
                gap='5px'
            >
                <Typography
                    variant='p'
                    component='h4'
                >
                    {`${key}:`}
                </Typography>

                <Typography
                    variant='p'
                    component='h4'
                >
                    {value}
                </Typography>

            </Stack>
        )
    }
    const getCardContentBottom = () => {

        return (
            <Stack
                gap='5px'
            >
                {addContent('Capital', capital)}
                {addContent('Region', region)}
                {addContent('Subregion', subregion)}
                {addContent('Continent', continents)}
                {addContent('UN Member', (Boolean(unMember)) ? 'Yes' : 'No')}

                <Stack
                    flexDirection='row'
                >
                    {addContent('Area', `${new Intl.NumberFormat().format(area)} km`)}

                    <Typography
                        variant='p'
                        component='h5'
                        sx={{ mt: '-5px' }}
                    >
                        2
                    </Typography>

                </Stack>

                {addContent('Population', new Intl.NumberFormat().format(parseInt(population)))}

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
                            overflow: 'auto',
                            maxWidth: 250,
                            minWidth: 200,
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
