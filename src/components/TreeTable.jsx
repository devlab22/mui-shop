import React, { useState, useEffect, Fragment } from 'react';
import { Box, Stack, Checkbox, List, IconButton, Container, Paper, ListItemButton, ListItemIcon, ListSubheader, ListItemText, Collapse, Divider, Avatar } from '@mui/material';
import { LoadingCircle, AlertDialog } from '.'
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import StarBorder from '@mui/icons-material/StarBorder';
import ChevronRight from '@mui/icons-material/ChevronRight';
//import FolderIcon from '@mui/icons-material/Folder';
//import ArticleIcon from '@mui/icons-material/Article';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function TreeTable({ nodes, title, handleClick, handleCheck, handleDeleteItem, handleAddItem, handleEditItem }) {

    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(false)
    const [checked, setChecked] = useState(false)

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
    
    const renderItem = (node, styles = {}) => {

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
                    // onClick={() => handleOnButtonClick(node)}
                    dense={false}
                    selected={selectedId === node.id}
                    title={node.name}
                >

                    {typeof (handleCheck) === 'function' &&
                        <ListItemIcon
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Checkbox
                                edge="start"
                                checked={node.checked}
                            // onChange={(e) => onCheckBoxChanged(node, e.target.checked)}
                            />
                        </ListItemIcon>
                    }

                    <ListItemText primary={node.name} secondary={`ID: ${node.id}, Level: ${node.level}`} />

                    <Stack
                        direction="row"
                        spacing={1}
                        onClick={(e) => e.stopPropagation()}
                    >

                        <Fragment>

                            {typeof (handleAddItem) === 'function' &&
                                <IconButton
                                    size="small"
                                    aria-label="add"
                                    title="add item"
                                >
                                    <AddCircleIcon
                                        color='primary'
                                    />
                                </IconButton>
                            }


                            {typeof (handleEditItem) === 'function' &&
                                <IconButton
                                    size="small"
                                    aria-label="edit"
                                    title="edit item"
                                >
                                    <EditIcon
                                        color='primary'
                                    />
                                </IconButton>
                            }


                        </Fragment>

                        {node.children ?
                            <div></div>
                            :
                            <Fragment>

                                {typeof (handleDeleteItem) === 'function' &&
                                    <IconButton
                                        size="small"
                                        aria-label="delete"
                                        title="delete item"
                                        onClick={() => handleDeleteItem(node)}
                                    >
                                        <DeleteIcon
                                            color='primary'
                                        />
                                    </IconButton>
                                }

                            </Fragment>
                        }
                    </Stack>

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
                                  //  handleOnButtonClick(node)
                                }}
                            /> :
                            <ChevronRight
                                onClick={(e) => {
                                    e.stopPropagation()
                                  //  handleOnButtonClick(node)
                                }}
                            />
                        }
                    </ListItemIcon>

                </ListItemButton>

            </div>
        )

    }
    const renderTree = (nodes) => {

        nodes.sort((a, b) => a.seqnr - b.seqnr);

        return (
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper'
                }}
                component="div"
            // subheader={renderHeader()}
            >
                {(nodes && Array.isArray(nodes)) &&
                    (
                        nodes.forEach(node => {
                            if (node.parentId === 0) {
                                renderItem(node)
                            }

                        })
                    )
                }
            </List>
        )
    }

    return (
        <Container component="main" width="100%">
            {isLoading ? (
                <Box>
                    <LoadingCircle typeContent='circle' />
                </Box>

            ) :
                <Box
                    sx={{ width: '100%' }}
                >
                    <Paper
                        sx={{ width: '100%' }}
                    >
                        {renderTree(nodes)}
                    </Paper>
                </Box>

            }

        </Container>
    )
}
