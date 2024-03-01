import React from 'react'
import { List, TablePagination, IconButton, ListItemSecondaryAction, ListItemIcon, ListItemText, ListItem, ListSubheader, Checkbox } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


export default function EndpointList({ items = [], selected = [], search = '', onCheckboxChange, onMoveItem }) {

    const theme = useTheme()
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)

    const visibleRows = React.useMemo(() => {

        const filteredItems = items.filter(item => item.mac.toLowerCase().includes(search.toLowerCase()))

        if (filteredItems.length < items.length) {
            setPage(0)
        }

        return filteredItems
            .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            )
    }, [items, search, page, rowsPerPage]
    );

    const styledList = {
        borderStyle: 'solid',
        borderColor: theme.palette.primary.main,
        minWidth: '400px'
    }

    const styledSubHeader = {
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    }

    const styledListItem = {
        border: '1px solid gray',
        height: '60px'
    }

    const styledPagination = {
        borderTop: '2px solid gray',
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        mb: '-10px'
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

            {visibleRows.map(element => (
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
                        secondary={`name: ${element['name']}`}
                        primary={`mac: ${element['mac']}`}
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

            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={styledPagination}
            />
        </List>
    )
}
