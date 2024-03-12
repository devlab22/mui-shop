import React from 'react'
import { List, TablePagination, ListItemButton, ListItemText, ListSubheader } from '@mui/material'
import { useTheme } from '@mui/material/styles'


export default function EndpointGroupList({ items = [], selectedItem, search = '', onItemClick = Function.prototype }) {

    const theme = useTheme()
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)

    const visibleRows = React.useMemo(() => {

        const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

        if (filteredItems.length < items.length) {
            setPage(0)
        }

        return filteredItems.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                            )
    }, [items, search, page, rowsPerPage]
    );

    const styledList = {
        borderStyle: 'solid',
        borderColor: theme.palette.primary.main,
        minWidth: '385px'
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

    const getTitle = () => {

        const endpointGroup = items.find(item => item.id === selectedItem)
        var title = `Endpointgroups (${items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).length})`

        if (endpointGroup) (
            title = `${title}: ${endpointGroup.name}`
        )

        return title
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
                    sx={styledSubHeader}
                >
                    {getTitle()}
                </ListSubheader>
            }
            sx={styledList}
        >

            {visibleRows.map(item => (

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
