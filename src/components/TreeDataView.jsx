import React, { useState, useEffect, Fragment } from 'react';
import { Box, Stack, Button, Checkbox, List, Container, Paper, Typography, ListItemButton, ListItemIcon, ListSubheader, ListItemText, Collapse, Divider } from '@mui/material';
import { LoadingCircle } from '.'
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
//import {default as StyledItem } from './StyledTreeItemRoot'

export default function TreeDataView({ nodes, title, handleClick = Function.prototype, handleCheck = Function.prototype }) {

    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(false)

    const myFolderIcon = <FolderIcon color='primary'/>
    var id = 0;


    useEffect(() => {

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
                {title && renderHeader()}
                {Array.isArray(nodes.children)
                    ? nodes.children.map((node) => renderStyledItems(node))
                    : null
                }
            </TreeView>
        )
    }

    const renderHeader = () => {

        return (
            <Stack direction="row">
                <ListSubheader
                    component="div"
                    id="nested-list-subheader-name"
                    sx={{ ml: "15px" }}
                    color="primary"
                >
                    {title}
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
                {/* <StyledItem nodeId={`${nodes.id.toString()}-styledItem`} labelText="styled item" labelInfo="info item"/> */}
                {Array.isArray(nodes.children)
                    ? nodes.children.map((node) => renderTreeItems(node))
                    : null
                }
            </TreeItem>

        )
    }



    const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
        color: theme.palette.text.secondary,
        [`& .${treeItemClasses.content}`]: {
            color: theme.palette.text.secondary,
            borderTopRightRadius: theme.spacing(2),
            borderBottomRightRadius: theme.spacing(2),
            paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            '&.Mui-expanded': {
                fontWeight: theme.typography.fontWeightRegular,
            },
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
            '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
                backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
                color: 'var(--tree-view-color)',
            },
            [`& .${treeItemClasses.label}`]: {
                fontWeight: 'inherit',
                color: 'inherit',
            },
        },
        [`& .${treeItemClasses.group}`]: {
            marginLeft: 0,
            [`& .${treeItemClasses.content}`]: {
                paddingLeft: theme.spacing(2),
            },
        },
    }));

    const StyledTreeItem = React.forwardRef(function StyledTreeItem(props, ref) {
        const theme = useTheme();
        const {
            bgColor,
            color,
            labelIcon: LabelIcon,
            labelInfo,
            labelText,
            colorForDarkMode,
            bgColorForDarkMode,
            ...other
        } = props;

        const styleProps = {
            '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
            '--tree-view-bg-color':
                theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
        };

        return (
            <StyledTreeItemRoot
                label={
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: '4px 0px 4px 0px',
                            spacing: 4
                        }}
                    >
                        <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                        <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                            {labelText}
                        </Typography>
                        <Typography variant="caption" color="inherit">
                            {labelInfo}
                        </Typography>

                        <ListItemIcon>
                        <SendIcon color='primary'/>
                        </ListItemIcon>
                    </Box>
                }
                style={styleProps}
                {...other}
                ref={ref}
            />
        );
    });

    const renderStyledItems = (node) => {

        return (
            <StyledTreeItem
                key={node.id}
                nodeId={`${node.id.toString()}-styled-item`}
                labelText={node.name}
                labelInfo={node.level}
                labelIcon={node.children ? myFolderIcon : ArticleIcon }
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
                </Box>

            }

        </Container>
    )
}