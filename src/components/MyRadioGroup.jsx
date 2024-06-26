import React from 'react'
import { FormLabel, FormControlLabel, Grid, RadioGroup, Radio, Paper, Typography } from '@mui/material'

export default function MyRadioGroup({ title = '', value = '', row = false, values = [], onChange = Function.prototype, width='auto', height='auto', useElevation=3, leaveElevation=3 }) {

    const [elevation, setElevation] = React.useState(useElevation)
    return (
        <Paper
            sx={{
                p: '10px',
                width: {width},
                height: {height}
            }}
            elevation={elevation}
            onMouseOver={() => setElevation(useElevation)}
            onMouseLeave={() => setElevation(leaveElevation)}
            >
            <React.Fragment>
                <FormLabel>
                    <Typography
                        component="h6"
                        variant="h6"
                        color="primary"
                        gutterBottom
                    >
                        {title}
                    </Typography>
                </FormLabel>

                <RadioGroup
                    key={Math.random()}
                    name='radio-group'
                    aria-label="radio-group"
                    value={value}
                    row={row}
                    onChange={onChange}
                >                 
                    {values.map(value => (         
                        <Grid key={Math.random()} item xs='auto' md='auto'>
                             <FormControlLabel
                                    key={Math.random()}
                                    value={value.name}
                                    control={<Radio />}
                                    label={value.label}
                                />
                        </Grid>                  
                               
                    
                        ))}
                </RadioGroup>
            </React.Fragment>
        </Paper>
    )
}
