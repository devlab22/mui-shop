import React from 'react'
import { Box, Stack, List, InputLabel, ListItemButton, ListItemIcon, ListItemText, ListItem, ListSubheader, Checkbox, Select, FormControl, MenuItem } from '@mui/material'
import { LoadingCircle, Title } from '.'
import { useTheme } from '@mui/material/styles'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function MovebleList({ label = '', reload = false, items = [], children = [], selectedItem = null, setSelectedItem = Function.prototype, onCheckboxClick, onMoveItem }) {

    const [elements, setElements] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    const theme = useTheme()

    const styledList = {
        borderStyle: 'solid',
        borderColor: theme.palette.primary.main,
        minWidth: '200px',
        maxWidth: '300px'
    }

    const styledSubHeader = {
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    }

    React.useEffect(() => {
        loadData(selectedItem)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload, selectedItem])

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

        setIsLoading(true)
        await loadEndpoints(itemId)
        setIsLoading(false)
    }

    const loadEndpoints = async (itemId) => {

        const data = []
        for (var i = 1; i <= 1000; i++) {

            data.push({ mac: genMAC(), name: `Endpoint ${i} (${itemId})` })
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
                    onChange={(event) => setSelectedItem(event.target.value)}
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

    const GroupList = () => {

        return (
            <List
                subheader={
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader-group"
                        sx={styledSubHeader}
                    >
                        {`Endpointgroups: ${items.length}`}
                    </ListSubheader>
                }
                sx={styledList}
            >

                {items.map(item => (

                    <ListItemButton
                        key={item['id']}
                        onClick={() => setSelectedItem(item['id'])}
                        selected={item['id'] === selectedItem}
                    >

                        <ListItemText
                            primary={`name: ${item['name']}`}
                            secondary={`id: ${item['id']}`}
                        />
                    </ListItemButton>
                ))}

            </List>
        )
    }
    return (

        <Box>

            {isLoading ?
                <LoadingCircle />
                :
                <React.Fragment>

                    <Stack
                        justifyContent='center'
                        alignItems='center'
                    >

                        <Title title={label} />

                        <Stack
                            direction='row'
                            gap={2}
                        >

                            <GroupList />

                            <List
                                subheader={
                                    <ListSubheader
                                        component="div"
                                        id="nested-list-subheader"
                                        sx={styledSubHeader}
                                    >
                                        {`Entpoints: ${elements.length}`}
                                    </ListSubheader>
                                }
                                sx={styledList}
                            >

                                {elements.map(element => (
                                    <ListItem key={Math.random()}>

                                        <ListItemIcon>
                                            <Checkbox
                                                sx={{
                                                    display: `${onCheckboxClick ? '' : 'none'}`
                                                }}
                                                checked={children.find(item => item['mac'] === element['mac']) ? true : false}
                                                onChange={(e) => onCheckboxClick({ groupId: selectedItem, mac: element['mac'], name: element['name'], checked: e.target.checked })}
                                            />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={`name: ${element['name']}`}
                                            secondary={`mac: ${element['mac']}`}
                                        />
                                    </ListItem>
                                ))}

                            </List>
                        </Stack>
                    </Stack>

                </React.Fragment>
            }

        </Box>

    )
}
