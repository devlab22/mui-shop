import React, { useState, useEffect, Fragment } from 'react';
import { Box, Stack, Button, Checkbox, List, Container, Paper, Typography, ListItemButton, ListItemIcon, ListSubheader, ListItemText, Collapse, Divider } from '@mui/material';
import { LoadingCircle, StyledTreeItem } from '.'
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import StarBorder from '@mui/icons-material/StarBorder';
import ChevronRight from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';

import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { styled, useTheme } from '@mui/material/styles';

export default function TreeDataView({ nodes, title, handleClick = Function.prototype, handleCheck = Function.prototype }) {

    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(false)

    
    var id = 0;


    useEffect(() => {

        console.log(nodes)
        setIsLoading(true);
        setItems([]);
        setLevel(nodes, 1)
        setIsLoading(false)


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                {renderHeader("tree view")}
                {Array.isArray(nodes.children)
                    ? nodes.children.map((node) => renderTreeItems(node))
                    : null
                }
            </TreeView>
        )
    }

    const renderStyledTree = (nodes) => {

        return (
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
                sx={{ flexGrow: 1, overflowY: 'auto' }}
            >
                {renderHeader("styled tree view")}
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
                    sx={{ ml: "15px" }}
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
                labelIcon={node.children ? <FolderIcon color='primary'/> : <ArticleIcon color='primary'/> }
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
                    <Paper
                        sx={{ width: 'auto', m: 'auto' }}
                    >
                        {renderTree(nodes)}
                    </Paper>

                    <Paper
                        sx={{ width: 'auto', m: 'auto' }}
                    >
                        {renderStyledTree(nodes)}
                    </Paper>
                </Box>

            }

        </Container>
    )
}