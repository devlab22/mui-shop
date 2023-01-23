import { ShoppingBasket } from '@mui/icons-material'
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function Header({handleCart, orderCount}) {
  return (
    <AppBar
        position='sticky'
    >
        <Toolbar>
            <Typography 
                variant='h6'
                component='span'
                sx={{flexGrow: 1}}
                >
                MUI Shop
            </Typography>
            <IconButton
                color='inherit'
                onClick={handleCart}
            >
                <Badge 
                    badgeContent={orderCount} 
                    color='success'
                    showZero
                    >
                    <ShoppingBasket/>
                </Badge>
                
            </IconButton>
        </Toolbar>
    </AppBar>
  )
}
