import React, { useState, useEffect } from 'react';
import { Box, List, Container, Paper, ListSubheader, Collapse } from '@mui/material';
import { StyledListItem, Toolbar } from '.'
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRight from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';

export default function StyledListView({ nodes = [], toolbar = [], title, onClick, onCheck, onAdd, onRemove, onEdit }) {

    const [selectedId, setSelectedId] = useState(null);
    const [itemsNodes, setItemsNodes] = useState([])

    useEffect(() => {

        setItemsNodes(nodes.map(item => {

            item.expandNode = Boolean(item.expandNode);
            item.checked = Boolean(item.checked);
            return item
        }))

    }, [nodes])

    const handleOnButtonClick = (id) => {

        var checked = false
        if (hasChildren(id)) {

            setItemsNodes(prev => prev.map(item => {

                if (item.id === id) {
                    item.expandNode = !item.expandNode
                    checked = item.expandNode
                }

                return item
            }))

        }

        setSelectedId(id);

        if (typeof (onClick) === 'function') {
            onClick(id, checked);
        }

    }

    const renderList = () => {

        const children = itemsNodes.filter(item => item.parentId === 0)
                        .sort((a, b) => a.seqnr - b.seqnr);

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
                {children.map(node => buildStyledListItem(node, 1))}

            </List>
        );
    }

    const hasChildren = (id) => {

        if (itemsNodes.some(item => item.parentId === id)) {
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

            const children = itemsNodes.filter(item => item.parentId === node.id)
                             .sort((a, b) => a.seqnr - b.seqnr);

            return (
                <Collapse
                    in={node.expandNode}
                    timeout="auto"
                    unmountOnExit
                >
                    <List component="div">
                        {
                            children.map(item => buildStyledListItem(item, level))
                        }
                    </List>
                </Collapse>
            )
        }

    }

    const getExpandIcon = (node) => {

        if (!hasChildren(node.id)) {
            return null
        }

        if (node.expandNode) {
            return <ExpandMore />
        }
        else {
            return <ChevronRight />
        }
    }

    const buildStyledListItem = (node, level) => {

        return (
            <div key={node.id}>

                {renderHeader(node.subheader)}

                <StyledListItem
                    id={node.id}
                    selected={selectedId === node.id}
                    primary={node.name}
                    secondary={`ID: ${node.id}, seqnr: ${node.seqnr}`}
                    paddingLeft={`${level * 20}px`}
                    itemIcon={hasChildren(node.id) ? <FolderIcon fontSize='large' color='primary' /> : <ArticleIcon fontSize='large' color='primary' />}
                    divider={node.divider}
                    expandIcon={getExpandIcon(node)}
                    checked={node.checked}
                    onClick={handleOnButtonClick}
                    onCheck={onCheck && onCheck}
                    onAdd={onAdd && onAdd}
                    onEdit={onEdit && onEdit}
                    onRemove={(onRemove && !hasChildren(node.id)) && onRemove}
                />

                {hasChildren(node.id) && buildSubMenu(node, level++)}

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
