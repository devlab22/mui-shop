import React, { useState, useEffect } from 'react';
import { Box, Stack, IconButton, Button, Container, Paper, ListSubheader, Checkbox } from '@mui/material';
import { LoadingCircle, StyledTreeItem, VideoPlayer, Toolbar } from '.'
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import StarBorder from '@mui/icons-material/StarBorder';
import ChevronRight from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';


export default function TreeDataView({ nodes, title, handleClick = Function.prototype, onCheck, onRemove, onAdd, onEdit, autoSelect=false }) {

    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const [check, setCheck] = useState(false)
    // const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(false)


    var id = 0;


    useEffect(() => {

        setIsLoading(true);
        setItems([]);
        setLevel(nodes, 1)
        setIsLoading(false)


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderToolbar = () => {

        return (
            <Stack
                direction="row"
                spacing={1}
                sx={{ p: 1 }}
            >

                {(onCheck && autoSelect) &&
                    <Checkbox
                        checked={check}
                        onChange={(e) => {
                            setCheck(e.target.checked)
                            onCheck(null, e.target.checked)
                        }}
                    />

                }
                {onAdd &&
                    <IconButton
                        title="add item"
                        onClick={() => onAdd(null)}
                    >
                        <AddCircleIcon color='primary' />
                    </IconButton>
                }

                {onAdd &&
                    <Button
                        title="add item"
                        onClick={() => onAdd(null)}
                        variant="contained"
                        size="small"
                        // startIcon={<AddCircleIcon />}
                        endIcon={<AddCircleIcon />}
                    >
                        add item
                    </Button>
                }

            </Stack>
        )
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

    const renderTree = (nodes) => {

        return (
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
            >
                {renderHeader("Tree view")}
                {Array.isArray(nodes.children)
                    ? nodes.children.map((node) => renderTreeItems(node))
                    : null
                }
            </TreeView>
        )
    }

    const renderStyledTree = (nodes) => {

        const buttons = [
            {
                type: "checkbox",
                onClick: onCheck,
                seqnr: 1,
                id: 1
            },
            {
                id: 2,
                type: "img",
                icon: <AddCircleIcon color='primary' />,
                onClick: onAdd,
                seqnr: 2
                
            },
            {
                id: 3,
                type: "button",
                onClick: onAdd,
                seqnr: 3,
                name: "add item",
                endIcon: <AddCircleIcon/>
                
            }
        ]
        return (
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
            >
                {/* {renderHeader("Styled tree view")} */}
                <Toolbar buttons={buttons} styles={{pl: '20px', border: '0px solid grey'}}/>
                {/* {renderToolbar()} */}
                {Array.isArray(nodes.children)
                    ? nodes.children.map((node) => renderStyledItems(node))
                    : null
                }
            </TreeView>
        )
    }

    const renderHeader = (sTitle) => {

        return (
            <Stack direction="row">
                <ListSubheader
                    component="div"
                    id="nested-list-subheader-name"
                    sx={{ ml: "15px", fontWeight: 'bold', fontSize: "1.2rem" }}
                    color="primary"
                >
                    {sTitle}
                </ListSubheader>
            </Stack>
        )
    }


    const renderTreeItems = (nodes) => {

        if (nodes.children !== null && Array.isArray(nodes.children)) {
            nodes.children.sort((a, b) => a.seqnr - b.seqnr)
        }


        return (
            <TreeItem
                key={nodes.id}
                nodeId={nodes.id.toString()}
                label={nodes.name}
                icon={Array.isArray(nodes.children) ? <FolderIcon color="primary" /> : <ArticleIcon color='primary' />}

            >

                {Array.isArray(nodes.children)
                    ? nodes.children.map((node) => renderTreeItems(node))
                    : null
                }
            </TreeItem>

        )
    }

    const renderStyledItems = (node) => {

        return (
            <StyledTreeItem
                key={node.id}
                nodeId={`${node.id.toString()}-styled-item`}
                labelText={node.name}
                labelInfo={`ID: ${node.id}, Level: ${node.level}`}
                onRemove={!node.children && (() => onRemove(node.id))}
                labelIcon={node.children ? <FolderIcon color='primary' /> : <ArticleIcon color='primary' />}
                onAdd={() => onAdd(node.id)}
                onEdit={() => onEdit(node.id)}
                onCheck={(e) => onCheck(node.id, e.target.checked)}
            >

                {Array.isArray(node.children)
                    ? node.children.map((item) => renderStyledItems(item))
                    : null
                }

            </StyledTreeItem>
        )
    }

    return (
        <Container component="main">
            {isLoading ? (
                <Box>
                    <LoadingCircle typeContent='circle' />
                </Box>

            ) :
                <Box>
                    <Stack
                        spacing={2}
                    >
                        <Paper>
                            {renderTree(nodes)}
                        </Paper>

                        <Paper>
                            {renderStyledTree(nodes)}
                        </Paper>

                        <Paper>
                            <VideoPlayer
                                title='Flower'
                                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                                type="video/mp4"
                                width="600"
                            />
                        </Paper>

                        <Paper>
                            <VideoPlayer
                                title='Big Buck Bunny'
                                src="https://www.w3schools.com/html/mov_bbb.mp4"
                                type="video/mp4"
                                width="600"
                            />
                        </Paper>

                    </Stack>

                </Box>

            }

        </Container>
    )
}