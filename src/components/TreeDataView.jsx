import React, { Fragment } from 'react';
import { Box, Stack, Container, Paper, ListSubheader } from '@mui/material';
import { StyledTreeItem, Toolbar } from '.'
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRight from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';


export default function TreeDataView({ nodes, onCheck, onRemove, onAdd, onEdit, autoSelect = false }) {


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

        const buttons = []
        var padLeft = '14px';

        if (autoSelect && onCheck) {
            buttons.push({
                type: "checkbox",
                onClick: onCheck,
                seqnr: 1,
                id: 1
            })

        }

        if (onCheck) {
            padLeft = '22.5px';
        }

        if (onAdd) {
            /* buttons.push({
                id: 2,
                type: "img",
                icon: <AddCircleIcon color='primary' />,
                onClick: onAdd,
                name: "add item",
                seqnr: 2

            }) */

            buttons.push({
                id: 3,
                type: "button",
                onClick: onAdd,
                seqnr: 3,
                name: "add item",
                title: 'add item',
                startIcon: <AddCircleIcon />

            })
        }

        padLeft = 0
        return (
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
            >
                {renderHeader("Styled tree view")}
                <Toolbar buttons={buttons} styles={{ pl: padLeft, border: '0px solid blue', width: '100%' }} />

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

            <Fragment key={node.id}>

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
                <StyledTreeItem
                    key={node.id}
                    nodeId={`${node.id.toString()}-styled-item`}
                    labelText={node.name}
                    labelInfo={`ID: ${node.id}`}
                    labelIcon={node.children ? <FolderIcon color='primary' /> : <ArticleIcon color='primary' />}
                    onRemove={(onRemove && !node.children) && (() => onRemove(node.id))}
                    onAdd={onAdd && (() => onAdd(node.id))}
                    onEdit={onEdit && (() => onEdit(node.id))}
                    onCheck={onCheck && ((e) => onCheck(node.id, e.target.checked))}
                >

                    {Array.isArray(node.children)
                        ? node.children.map((item) => renderStyledItems(item))
                        : null
                    }

                </StyledTreeItem>
            </Fragment>
        )
    }

    return (
        <Container component="main">
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

                </Stack>

            </Box>
        </Container>
    )
}