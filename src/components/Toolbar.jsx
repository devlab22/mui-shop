import React from 'react';
//import { CSVLink } from 'react-csv';
import { Box, Avatar, Stack, Button, Checkbox, IconButton, TextField } from '@mui/material';

export default function Toolbar({ buttons = [], styles = {} }) {

    const setToolbar = () => {

        buttons.sort((a, b) => a.seqnr - b.seqnr);
    
        return (
            <Box sx={styles}>
                <Stack
                    direction="row"                  
                >

                    {
                        buttons.map(button => {
                            if (button.type === 'checkbox') {
                                return setCheckboxToolbar(button);
                            }
                            else if (button.type === 'img') {
                                return setImageToolbar(button);
                            }
                            else if (button.type === 'input') {
                                return setInputToolbar(button);
                            }
                            /*  else if (button.type === 'CSVLink') {
                                 return setCSVLink(button);
                             } */
                            else {
                                return setButtonToolbar(button);
                            }
                        })
                    }

                </Stack>
            </Box >

        )
    }

    const setButtonToolbar = (button) => {

        return (
            <Button
                key={button.id}
                variant="contained"
                onClick={button.onClick}
                title={button.name}
            >
                {button.name}
            </Button>
        )
    }
    const setInputToolbar = (button) => {

        return (
            <IconButton key={button.id}>

                <label >
                    <TextField
                        type='file'
                        accept={button.accept}
                        onChange={button.onClick}
                        sx={{ display: 'none' }}
                    />

                    {
                        button.avatar && (
                            <Avatar
                                title={button.name}
                                alt={button.name}
                                color='primary'
                                sx={{
                                    bgcolor: 'primary.main',
                                    cursor: 'pointer'
                                }}>
                                {button.avatar}
                            </Avatar>
                        )
                    }

                    {button.image && (
                        <img
                            src={button.image}
                            alt={button.name}
                            title={button.name}
                            style={{ cursor: 'pointer' }}
                        />
                    )}

                </label>
            </IconButton>
        )

    }

    const setImageToolbar = (button) => {
        return (
            <IconButton
                key={button.id}
                onClick={button.onClick}
            >

                {
                    button.avatar && (
                        <Avatar
                            title={button.name}
                            alt={button.name}
                            sx={{
                                bgcolor: 'primary.main'
                            }}>
                            {button.avatar}
                        </Avatar>
                    )
                }

                {button.image && (
                    <img
                        src={button.image}
                        alt={button.name}
                        title={button.name}
                    />
                )}

            </IconButton>

        )
    }

    const setCheckboxToolbar = (button) => {

        return (
            <Checkbox
                key={button.id}
                checked={button.checked}
                onChange={e => button.onClick(null, e.target.checked)}
                title={button.name}
                sx={{
                    //  border: '1px solid #9c27b0',  
                    // color: '#9c27b0'                
                }}
            />
        )
    }

    /*  const setCSVLink = (button) => {
 
         return (
             <IconButton key={button.id}>
                 <CSVLink filename={button.filename} data={button.exportData} separator={";"}>
 
                     {
                         button.avatar && (
                             <Avatar
                                 title={button.name}
                                 alt={button.name}
                                 sx={{
                                     bgcolor: 'primary.main'
                                 }}>
                                 {button.avatar}
                             </Avatar>
                         )
                     }
 
                     {button.image && (
                         <img
                             src={button.image}
                             alt={button.name}
                             title={button.name}
                         />)}
 
                 </CSVLink>
             </IconButton>
         )
     } */

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignContent: 'space-between',

            }}
        >
            {
                Array.isArray(buttons) && (
                    setToolbar()
                )
            }
        </Box>
    )
}