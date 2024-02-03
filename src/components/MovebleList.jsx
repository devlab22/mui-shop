import React from 'react'
import { Paper, List, ListItemButton, ListItemText, Checkbox, Select, FormControl, MenuItem } from '@mui/material'


export default function MovebleList({ items = [], moveble=false, selectedItem = null, onChangeItem = Function.prototype }) {

    const [elements, setElements] = React.useState([])


    const handleOnChange = async (e) => {

        const itemId = e.target.value
        await loadData(itemId)

        onChangeItem(itemId)
    }

    const loadData = async (itemId) => {

        const data = []
        for (var i = 1; i <= 10; i++) {
            data.push({ mac: `${itemId}${itemId}:22:33:44:55:66`, name: `Device ${i}` })
        }

        setElements(data)
    }

    const FilterSelection = () => {

        return (
            <FormControl fullWidth>
                <Select
                    value={selectedItem}
                    readOnly={false}
                    onChange={handleOnChange}
                >
                    {
                        items.map(option => (
                            <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                        ))
                    }

                </Select>
            </FormControl>
        )
    }
    return (
        <Paper
            sx={{
                width: '500px',
            }}
        >
            <FilterSelection />

            {elements.length > 0 &&
            <List>

                {elements.map(element => (
                    <ListItemButton key={Math.random()}>

                        <Checkbox
                            sx={{
                                display: `${moveble ? '' : 'none'}`
                            }}
                        />
                        <ListItemText
                            primary={`name: ${element['name']}`}
                            secondary={`mac: ${element['mac']}`}
                        />
                    </ListItemButton>
                ))}

            </List>
            }
            
        </Paper>
    )
}
