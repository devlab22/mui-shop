import { Alert, Snackbar } from '@mui/material'
import React from 'react'

export default function Snack({ isOpen, handleOnClose= Function.prototype }) {
    return (
        <Snackbar
            open={isOpen}
            onClose={handleOnClose}
            autoHideDuration={2000}
        >
            <Alert
                severity='success'
            >
                товар добавлен в корзину
            </Alert>
        </Snackbar>
    )
}
