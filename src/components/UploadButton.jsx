import React from 'react'
import { TextField, IconButton, Avatar, } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadButton({ id = null, handleFileUpload = Function.prototype }) {

    const handleOnChange = (event) => {
        handleFileUpload(id, event)
        event.target.value = ''
    }
    return (
        <IconButton>
            <label>
                <TextField
                    type="file"
                    accept="*.json"
                    sx={{ display: 'none' }}
                    onChange={handleOnChange}
                />

                <Avatar
                    title='upload'
                    alt='upload'
                    color='primary'
                    sx={{
                        bgcolor: 'primary.main',
                        cursor: 'pointer'
                    }}>
                    <CloudUploadIcon/>
                </Avatar>
            </label>


        </IconButton>
    )
}
