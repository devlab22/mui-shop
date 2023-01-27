
import { Button, Card, CardActions, CardContent, Checkbox,
        CardMedia, Chip, FormControlLabel, Grid, Typography } from '@mui/material';
import React, {useState} from 'react';

const GoodsItem = (props) => {
    const { id, name, price, poster, setOrder, onCheckboxChanged, checked=false } = props;

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

                    <Chip 
                        label={`Цена: ${price} руб.`}
                        color='primary'
                        variant='outlined'
                        />
                    
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

                    {/* <FormControlLabel
                        sx={{pl: '20px'}}
                        control={<Checkbox
                            checked={checked}
                            onChange={(e) => onCheckboxChanged(e, id)}
                            />}
                        label='check'
                    /> */}
                </CardActions>
                
            </Card>
        </Grid>
    );
};

export default GoodsItem;