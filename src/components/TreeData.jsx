import React, { useState, useEffect, Fragment } from 'react';
import { Box, Stack, Checkbox, List, Button, IconButton, Container, Paper, ListItemButton, ListItemIcon, ListSubheader, ListItemText, Collapse, Divider } from '@mui/material';
import { LoadingCircle, Toolbar } from '.'
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import StarBorder from '@mui/icons-material/StarBorder';
import ChevronRight from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function TreeData({ nodes, title, checkbox = false, handleClick = Function.prototype, handleCheck = Function.prototype }) {

    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(false)
    const [checked, setChecked] = useState(false)
    var id = 0;

    useEffect(() => {

        // console.log(nodes)
        setIsLoading(true);
        setItems([]);
        setLevel(nodes, 1)
        setIsLoading(false)


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCheckBoxChanged = (node, checked) => {

        handleCheck(node, checked)
        setReload(!reload)
    }
    const setExpand = (node, expand = false) => {

        node.children.map(child => {

            const menu = getMenu(child)
            menu.expand = expand;
            if (child.children) {
                setExpand(child, expand);
            }
            return child;
        })
    }

    const handleOnButtonClick = (node) => {

        setSelectedId(node.id);

        if (node.children) {
            setOpen(!open);
            var menu = getMenu(node);
            menu.expand = !menu.expand;

            if (!menu.expand) {
                setExpand(node, false);
            }

        }

        handleClick(node);
    }

    const setLevel = (data, level) => {


        (level === 1) && (id = 0)

        data.children.map(item => {

            switch (level) {
                case 1:
                    item.icon = <StarBorder color="primary" />
                    break;
                case 2:
                    item.icon = <DraftsIcon color="primary" />
                    break;
                case 3:
                    item.icon = <InboxIcon color="primary" />
                    break;
                case 4:
                    item.icon = <SendIcon color="primary" />
                    break;
                default:
                    item.icon = <InboxIcon color="primary" />
            }

            id++;
            item.id = id;
            item.level = level;
            setItems(prev => [...prev, { id: item.id, expand: false }])
            const lv = level + 1;
            if (item.children) {
                setLevel(item, lv);
            }

            return item;
        });

    }

    const renderListMenu = (nodes) => {

        return (
            <Fragment>
                {DynamicNestedItems(nodes)}
            </Fragment>
        )
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

    const buildSubMenu = (node) => {

        if (node) {
            node.children.sort((a, b) => a.seqnr - b.seqnr)
            var menu = getMenu(node);
            return (
                <Collapse in={menu.expand} timeout="auto" unmountOnExit>
                    <List component="div">
                        {
                            node.children.map(item => buildListItem(item, { pl: item.level * 3 }))
                        }
                    </List>
                </Collapse>
            )
        }

    }

    const buildListItem = (node, styles = {}) => {

        var menu = getMenu(node);

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
                    sx={styles}
                    onClick={() => handleOnButtonClick(node)}
                    dense={false}
                    selected={selectedId === node.id}
                    title={node.name}
                >

                    {checkbox &&
                        <ListItemIcon
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Checkbox
                                edge="start"
                                checked={node.checked}
                                onChange={(e) => onCheckBoxChanged(node, e.target.checked)}
                            />
                        </ListItemIcon>
                    }

                    <ListItemText primary={node.name} secondary={`ID: ${node.id}, Level: ${node.level}`} />

                    <ListItemIcon
                        sx={{
                            display: `${node.children ? '' : 'none'}`,
                            left: "10px"
                        }}
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

                    {/*  <ListItemIcon>
                        {node.children ? <FolderIcon color='primary'/> : <ArticleIcon color='primary'/>}
                    </ListItemIcon> */}

                    {/*  <ListItemIcon>
                        {node.icon}
                    </ListItemIcon> */}


                    {/* <Fragment>
                        <Stack
                            direction="row"
                            spacing={30}

                        >
                            <ListItemText primary={node.name} />
                            <ListItemText primary={node.id} sx={{ ml: `${150}px` }} />
                            <ListItemText primary={node.level} sx={{ ml: `${150}px` }} />

                            <ListItemIcon
                                sx={{
                                    display: `${node.children ? '' : 'none'}`,
                                    left: "10px"
                                }}                          
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
                        </Stack>

                    </Fragment> */}

                </ListItemButton>

                {node.children && buildSubMenu(node)}

                {node.divider && <Divider sx={{ mb: 1 }} />}
            </div>

        )
    }

    const renderHeader = () => {

        return (
            <Stack
                direction="column"
                spacing={1}
            >

                {title &&
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader-name"
                        color="primary"
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            alignItems: "center"
                        }}
                    >
                        {title}
                    </ListSubheader>
                }


                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        p: "8px 0 8px 15px"
                    }}
                >

                    {checkbox &&
                        <Checkbox
                            edge="start"
                            checked={checked}
                            title=""
                            onChange={(e) => {
                                setChecked(e.target.checked)
                                onCheckBoxChanged(null, e.target.checked)
                            }}
                        />
                    }

                    <IconButton
                        size="small"
                        aria-label="add"
                        title="add item"   
                        onClick={() => alert('add item')}                    
                    >
                        <AddCircleIcon
                            color="primary"
                            
                        />
                    </IconButton>

                </Stack>

            </Stack>
        )
    }

    const DynamicNestedItems = (nodes) => {

        nodes.children.sort((a, b) => a.seqnr - b.seqnr);
        return (
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper'
                }}
                component="nav"
                subheader={renderHeader()}
            >
                {
                    nodes.children.map(node => buildListItem(node))
                }

            </List>
        );
    }

    return (
        <Container component="main" width="100%">
            {isLoading ? (
                <Box>
                    <LoadingCircle typeContent='circle' />
                </Box>

            ) :
                <Box>
                    <Paper
                        sx={{ width: '50%' }}
                    >
                        {renderListMenu(nodes)}
                    </Paper>
                </Box>

            }

        </Container>
    )
}