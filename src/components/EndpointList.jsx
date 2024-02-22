import React from 'react'
import { List, IconButton, ListItemSecondaryAction, ListItemIcon, ListItemText, ListItem, ListSubheader, Checkbox } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


export default function EndpointList({ items = [], selected=[], search = '', onCheckboxChange, onMoveItem }) {

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

    const styledListItem = {
        border: '1px solid gray'
    }

    return (
        <List
            subheader={
                <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={styledSubHeader}
                >
                    {`Entpoints: ${items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).length}`}
                </ListSubheader>
            }
            sx={styledList}
        >

            {items
            .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
            .map(element => (
                <ListItem
                    key={Math.random()}
                    sx={styledListItem}
                >

                    {onCheckboxChange &&
                        <ListItemIcon>
                            <Checkbox
                                checked={selected.find(item => item['mac'] === element['mac']) ? true : false}
                                onChange={(e) => onCheckboxChange({ element, checked: e.target.checked })}
                            />
                        </ListItemIcon>
                    }


                    <ListItemText
                        primary={`name: ${element['name']}`}
                        secondary={`mac: ${element['mac']}`}
                    />

                    {onMoveItem &&

                        <ListItemSecondaryAction
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                right: "10px",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <IconButton
                                onClick={() => onMoveItem(element)}
                                title='move'
                            >

                                <KeyboardDoubleArrowRightIcon color='primary' />

                            </IconButton>
                        </ListItemSecondaryAction>

                    }

                </ListItem>
            ))}

        </List>
    )
}
