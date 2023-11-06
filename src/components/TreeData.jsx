import React, { useState, useEffect, Fragment } from 'react';
import { Box, Stack, Checkbox, List, Container, Paper, ListItemButton, ListItemIcon, ListSubheader, ListItemText, Collapse, Divider } from '@mui/material';
import { LoadingCircle } from '.'
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import StarBorder from '@mui/icons-material/StarBorder';
import ChevronRight from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';

export default function TreeData({ nodes, toggleMenu = true, handleClick = Function.prototype, handleCheck=Function.prototype }) {

    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const [open, setOpen] = useState(false);
    var id = 0;

    useEffect(() => {

        setIsLoading(true);
        setItems([]);
        setLevel(nodes, 1)
        setIsLoading(false)


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCheckBoxChanged = (node, event) => {

        handleCheck(node, event.target.checked)
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
                            node.children.map(item => buildListItem(item, { pl: item.level * 4 }))
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
                       // inset={toggleMenu}
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
                    onClick={(e) => (node.checked ? '' : handleOnButtonClick(node)) }
                    dense={false}
                    selected={selectedId === node.id}
                    title={node.name}
                >

                { (node.checked) && 
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            // checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            checked={node.checked}
                            onChange={(event) => onCheckBoxChanged(node, event)}
                        // inputProps={{ 'aria-labelledby': labelId }}
                        />
                    </ListItemIcon>                  
                }
                    <ListItemIcon>
                        {node.children ? <FolderIcon /> : <ArticleIcon />}
                    </ListItemIcon>

                   
                        <Fragment>
                            <Stack
                                direction="row"
                                spacing={10}

                            >
                                <ListItemText primary={node.name} />
                                <ListItemText primary={node.id} sx={{ pl: `${50}px` }} />
                                <ListItemText primary={node.level} sx={{ pl: `${90}px` }} />

                                <ListItemIcon
                                    sx={{
                                        display: `${node.children ? '' : 'none'}`,
                                        left: "10px"
                                    }}
                                    onClick={() => handleOnButtonClick(node) }
                                >
                                    {menu.expand ? <ExpandMore /> : <ChevronRight />}
                                </ListItemIcon>
                            </Stack>

                        </Fragment>
                    


                </ListItemButton>

                {node.children && buildSubMenu(node)}

                {node.divider && <Divider sx={{ mb: 1 }} />}
            </div>

        )
    }

    const renderHeader = () => {

        return (
            <Stack direction="row" spacing={15}>
                <ListSubheader
                    component="div"
                    id="nested-list-subheader-name"
                    sx={{ pl: "70px" }}
                >
                    Name
                </ListSubheader>
                <ListSubheader component="div" id="nested-list-subheader-id">
                    Id
                </ListSubheader>
                <ListSubheader component="div" id="nested-list-subheader-level">
                    Level
                </ListSubheader>
            </Stack>
        )
    }

    const DynamicNestedItems = (nodes) => {

        nodes.children.sort((a, b) => a.seqnr - b.seqnr);
        return (
            <List
                sx={{
                    width: 'auto',
                    minWidth: '250px',
                    maxWidth: '800px',
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
        <Container component="main">
            {isLoading ? (
                <Box>
                    <LoadingCircle typeContent='circle' />
                </Box>

            ) :
                <Box>
                    <Paper
                        sx={{ width: 'auto', m: 'auto' }}
                    >
                        {renderListMenu(nodes)}
                    </Paper>
                </Box>

            }

        </Container>
    )
}