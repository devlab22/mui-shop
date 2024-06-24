import React from 'react';
//import { CSVLink } from 'react-csv';
import { Grid, Avatar, Button, Checkbox, IconButton, TextField } from '@mui/material';

export default function Toolbar({ id=null, buttons = [], styles = { width: '100%' } }) {

    const setButton = (button) => {
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
    }
    const setToolbar = () => {

        buttons.sort((a, b) => a.seqnr - b.seqnr);

        return (
            <Grid
                sx={styles}
                container
                direction='row'
            >
                  {buttons.map(button => (
                    <Grid item key={button.id}>
                       {setButton(button)} 
                    </Grid>
                  ))}

            </Grid >

        )
    }

    const setButtonToolbar = (button) => {

        return (
            <Button
                key={button.id}
                variant={button.variant || 'contained'}
                onClick={() => button.onClick(id)}
                title={button.name}
                endIcon={button.endIcon && button.endIcon}
                startIcon={button.startIcon && button.startIcon}
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
                        onChange={(event) => button.onClick(id, event.target.value)}
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
                onClick={() => button.onClick(id)}
                title={button.name}
            >

                {button.icon &&
                    button.icon
                }

                {button.image && (
                    <img
                        src={button.image}
                        alt={button.name}
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
                onChange={e => button.onClick(id, e.target.checked)}
                title={button.name}
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
        <React.Fragment>
            {
                Array.isArray(buttons) && (
                    setToolbar()
                )
            }
        </React.Fragment>
    )
}