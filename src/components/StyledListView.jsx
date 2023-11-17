import React, { useState, useEffect, Fragment } from 'react';
import { Box, Stack, Checkbox, List, IconButton, Container, Paper, ListItemButton, ListItemIcon, ListSubheader, ListItemText, Collapse, Divider } from '@mui/material';
import { StyledListItem, Toolbar } from '.'
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRight from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function StyledListView({ nodes = [], toolbar = [], title, onClick, onCheck, onAdd, onRemove, onEdit }) {

    const [items, setItems] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {

        setItems(nodes.map(item => {
            return { id: item.id, expand: false }
        }))

    }, [])

    const setExpand = (node, expand = false) => {

        nodes.filter(item => item.parentId === node.id)
            .map(child => {

                const menu = getMenu(child)
                menu.expand = expand;
                /*  if (hasChildren(child.id)) {
                     setExpand(child, expand);
                 } */
                return child;
            })
    }

    const handleOnButtonClick = (node) => {

        setSelectedId(node.id);
        console.log('click', node)
        console.log(hasChildren(node.id))
        if (hasChildren(node.id)) {
            console.log('open')

            var menu = getMenu(node);
            menu.expand = !menu.expand;
            console.log(menu)

            console.log(items)
            /*  if (!menu.expand) {
                 setExpand(node, false);
             } */
            setOpen(!open);
        }

        if (typeof (onClick) === 'function') {
            onClick(node);
        }

    }
    const getMenu = (node) => {

        var menu = null;
        if ('id' in node) {
            menu = items.find(item => item.id === node.id);
        }

        if (!menu) {
            menu = { id: null, expand: false };
        }

        return menu;
    }

    const renderList = () => {

        const children = nodes.filter(item => item.parentId === 0);
        children.sort((a, b) => a.seqnr - b.seqnr);

        return (
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper'
                }}
                component="nav"
                subheader={renderHeader(title)}
            >
                {<Toolbar buttons={toolbar} />}
                {
                    children.map(node => buildListItem(node, 1))
                }

            </List>
        );
    }

    const hasChildren = (id) => {

        const child = nodes.some(item => item.parentId === id);
        if (child) {
            return true;
        }
        else {
            return false;
        }
    }

    const renderHeader = (sTitel) => {

        return (
            <ListSubheader
                component="div"
                inset={true}
                sx={{ fontWeight: 'bold', fontSize: "1.2rem" }}
                color="primary"
            >
                {sTitel}
            </ListSubheader>
        )
    }

    const buildSubMenu = (node, level) => {

        level++
        if (node) {

            const children = nodes.filter(item => item.parentId === node.id)
            //  console.log(node)
            //console.log(children)
            var menu = getMenu(node);
            return (
                <Collapse
                    in={menu.expand}
                    timeout="auto"
                    unmountOnExit
                >
                    <List component="div">
                        {
                            children.map(item => buildListItem(item, level))
                        }
                    </List>
                </Collapse>
            )
        }

    }

    const buildListItem = (node, level) => {

        //  console.log(node)
        const children = nodes.filter(item => item.parentId === node.id)
        children.sort((a, b) => a.seqnr - b.seqnr)

        var menu = getMenu(node);
        console.log(menu)
        return (
            <div key={node.id}>

                {node.subheader &&
                    <ListSubheader
                        component="div"
                        color="primary"
                        inset={true}
                        sx={{
                            fontSize: '1.2rem',
                            fontWeight: "bold"
                        }}
                    >
                        {node.subheader}
                    </ListSubheader>
                }

                <ListItemButton
                    sx={{
                        pl: `${level * 20}px`,
                    }}
                    onClick={() => handleOnButtonClick(node)}
                    dense={false}
                    selected={selectedId === node.id}
                >

                    <ListItemIcon>
                        {hasChildren(node.id) ? <FolderIcon color='primary' /> : <ArticleIcon color='primary' />}
                    </ListItemIcon>

                    {typeof (handleCheck) === 'function' &&
                        <ListItemIcon
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Checkbox
                                edge="start"
                                checked={node.checked}
                                onChange={(e) => onCheck(node.id, e.target.checked)}
                            />
                        </ListItemIcon>
                    }

                    <ListItemText primary={node.name} secondary={`ID: ${node.id}`} />

                    <Stack
                        direction="row"
                        spacing={1}
                        onClick={(e) => e.stopPropagation()}
                    >

                        {typeof (onAdd) === 'function' &&
                            <IconButton
                                size="small"
                                aria-label="add"
                                title="add item"
                                onClick={() => onAdd(node.id)}
                            >
                                <AddCircleIcon
                                    color='primary'
                                />
                            </IconButton>
                        }


                        {typeof (onEdit) === 'function' &&
                            <IconButton
                                size="small"
                                aria-label="edit"
                                title="edit item"
                                onClick={() => onEdit(node.id)}
                            >
                                <EditIcon
                                    color='primary'
                                />
                            </IconButton>
                        }

                        {!hasChildren(node.id) &&
                            <Fragment>

                                {typeof (onRemove) === 'function' &&
                                    <IconButton
                                        size="small"
                                        aria-label="delete"
                                        title="delete item"
                                        onClick={() => onRemove(node.id)}
                                    >
                                        <DeleteIcon
                                            color='primary'
                                        />
                                    </IconButton>
                                }

                            </Fragment>
                        }

                    </Stack>

                    {hasChildren(node.id) &&
                        <ListItemIcon
                        >
                            {menu.expand ?
                                <ExpandMore
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleOnButtonClick(node)
                                    }}
                                /> :
                                <ChevronRight
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleOnButtonClick(node)
                                    }}
                                />
                            }
                        </ListItemIcon>
                    }

                </ListItemButton>

                {hasChildren(node.id) && buildSubMenu(node, level++)}
                {node.divider && <Divider sx={{ mb: 1 }} />}

            </div>

        )
    }
    return (
        <Container component='main'>
            <Box>
                <Paper>
                    {renderList()}
                </Paper>
            </Box>
        </Container>
    )
}
