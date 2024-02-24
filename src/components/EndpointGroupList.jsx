import React from 'react'
import { List, ListItemButton, ListItemText, ListSubheader } from '@mui/material'
import { useTheme } from '@mui/material/styles'


export default function EndpointGroupList({ items = [], selectedItem, search = '', onItemClick = Function.prototype }) {

const theme = useTheme()

const styledList = {
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    minWidth: '200px'
}

const styledSubHeader = {
    backgroundColor: theme.palette.primary.main,
    color: 'white'
}

const styledListItem = {
    border: '1px solid gray'
}

const getTitle = () => {

    const endpointGroup = items.find(item => item.id === selectedItem)
    var title = `Endpointgroups (${items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).length})`

    if(endpointGroup)(
        title = `${title}: ${endpointGroup.name}`
    )

    return title
}
    return (
        <List
            subheader={
                <ListSubheader
                    component="div"
                    sx={styledSubHeader}
                >
                    {getTitle()}
                </ListSubheader>
            }
            sx={styledList}
        >

            {items
                .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
                .map(item => (

                    <ListItemButton
                        key={Math.random()}
                        onClick={() => onItemClick(item)}
                        selected={item['id'] === selectedItem}
                        sx={styledListItem}
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