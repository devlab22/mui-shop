import { Button, Card, CardActions, CardContent, 
        CardMedia, Grid, Typography } from '@mui/material';
import React, {useState} from 'react';

const GoodsItem = (props) => {
    const { name, price, poster, setOrder } = props;

    const [raised, setRaised] = useState(false);

    const onMouseOver = () => {
        setRaised(true)
    }

    const onMouseOut = () => {
        setRaised(false)
    }

    return (
        <Grid item xs={12} md={4}>
            <Card
                sx={{
                    maxWidth: 345,
                    borderRadius: '15px',
                    height: '100%'
                }}
                raised={raised}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            
            >
          
                <CardMedia
                    sx={{ height: 140 }}
                    image={poster}
                    component='img'
                    title={name}
                    alt={name}
                />
                <CardContent>
                    <Typography
                        variant='h6'
                        component='h3'
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant='body1'
                        component='span'>
                        Цена: {price} руб.
                    </Typography>

                </CardContent>
                
                <CardActions>
                    <Button
                        variant='contained'
                        onClick={() =>
                            setOrder({
                                id: props.id,
                                name: props.name,
                                price: props.price,
                            })
                        }
                    >
                        Купить
                    </Button>
                </CardActions>
                
            </Card>
        </Grid>
    );
};

export default GoodsItem;