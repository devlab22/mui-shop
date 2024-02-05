import React from 'react'
import { Paper, List, InputLabel, ListItemButton, ListItemText, ListSubheader, Checkbox, Select, FormControl, MenuItem } from '@mui/material'

export default function MovebleList({ label = '', reload = false, items = [], children = [], selectedItem = null, onChangeItem = Function.prototype, onCheckboxClick }) {

    const [elements, setElements] = React.useState([])

    React.useEffect(() => {
        loadData(selectedItem)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])

    const handleOnChange = async (e) => {

        const itemId = e.target.value
        await loadData(itemId)

        onChangeItem(itemId)
    }

    function genMAC() {
        var hexDigits = "0123456789ABCDEF";
        var macAddress = "";
        for (var i = 0; i < 6; i++) {
            macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
            macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
            if (i !== 5) macAddress += ":";
        }

        return macAddress;
    }

    const loadData = async (itemId) => {

        if (itemId === '') {
            return
        }

        const data = []
        for (var i = 1; i <= 10; i++) {

            data.push({ mac: genMAC(), name: `Device ${i}` })
        }

        setElements(data)
    }

    const FilterSelection = () => {

        return (
            <FormControl fullWidth>
                <InputLabel id="select-label">{label}</InputLabel>
                <Select
                    labelId="select-label"
                    value={selectedItem}
                    readOnly={false}
                    onChange={handleOnChange}
                    label={label}
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
                <List
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            {`Devices: ${elements.length}`}
                        </ListSubheader>
                    }
                >

                    {elements.map(element => (
                        <ListItemButton key={Math.random()}>

                            <Checkbox
                                sx={{
                                    display: `${onCheckboxClick ? '' : 'none'}`,
                                    m: '0 5px 0 -10px'
                                }}
                                checked={children.find(item => item['mac'] === element['mac']) ? true : false}
                                onChange={(e) => onCheckboxClick({ groupId: selectedItem, mac: element['mac'], name: element['name'], checked: e.target.checked })}
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
