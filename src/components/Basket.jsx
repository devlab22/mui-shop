import { ShoppingBasket } from '@mui/icons-material'
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'
import BasketItem from './BasketItem'

export default function Basket({ cartOpen, closeCart, order = [], removeFromOrder }) {
    return (
        <Drawer
            anchor='right'
            open={cartOpen}
            onClose={closeCart}
        >
            <List sx={{ width: '400px' }}>
                <ListItem>
                    <ListItemIcon>
                        <ShoppingBasket />
                    </ListItemIcon>
                    <ListItemText primary='Warenkorb' />
                </ListItem>
                <Divider />

                {!order.length ? (
                    <ListItem>keine Waren</ListItem>
                ) : (
                    <Fragment>


                        {order.map(item => (
                            <BasketItem
                                key={item.id}
                                {...item}
                                removeFromOrder={removeFromOrder}
                            />
                        ))
                        }
                        <Divider/>
                        <Typography 
                            sx={{fontWeight: 'bold', ml: '15px'}}
                        >
                            Gesamtpreis: {' '}
                            {order.reduce((acc, item) => {
                                return acc + item.price * item.quantity;
                            }, 0)}{' EUR.'}
                        </Typography>
                    </Fragment>
                )}


            </List>

        </Drawer>
    )
}
