import React from 'react'
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';

export default function MyFilter({ options=[], onChange, label='', value, readOnly=false}) {

  return (
    <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
            value={value}
            readOnly={readOnly}
            onChange={e => onChange(e.target.value)}
            label={label}
            sx={{
                width: '250px',
            }}
        >
    {
        options.map(option => (
            <MenuItem key={option.key} value={option.key}>{option.value}</MenuItem>
        ))
    }

    </Select>
    </FormControl>
  )
}
