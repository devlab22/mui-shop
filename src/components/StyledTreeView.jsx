import React from 'react';
import { StyledTreeItem, Toolbar } from '.';
import { Box, Divider, Paper, Container, ListSubheader } from '@mui/material';
import { TreeView } from '@mui/x-tree-view/TreeView';

import ChevronRight from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';

export default function StyledTreeView({ nodes = [], toolbar = [], title, onCheck, onAdd, onRemove, onEdit }) {

  const renderStyledTree = () => {

    const children = nodes.filter(item => item.parentId === 0);
    children.sort((a,b) => a.seqnr - b.seqnr);

    return (
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
      >

        {renderHeader(title)}
        <Toolbar buttons={toolbar} />
        {children.map((item) => renderStyledItems(item))}

      </TreeView>
    )
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

  const renderStyledItems = (node) => {

    const children = nodes.filter(item => item.parentId === node.id);
    children.sort((a,b) => a.seqnr - b.seqnr);

    return (
      <div key={node.id}>

        {node.subheader && renderHeader(node.subheader) }

        <StyledTreeItem
          key={node.id}
          nodeId={`${node.id.toString()}-styled-item`}
          labelText={node.name}
          labelInfo={`ID: ${node.id}`}
          labelIcon={hasChildren(node.id) ? <FolderIcon color='primary' /> : <ArticleIcon color='primary' />}
          onRemove={(onRemove && !hasChildren(node.id)) && (() => onRemove(node.id))}
          onAdd={onAdd && (() => onAdd(node.id))}
          onEdit={onEdit && (() => onEdit(node.id))}
          onCheck={onCheck && ((e) => onCheck(node.id, e.target.checked))}
        >

          {children.map((item) => renderStyledItems(item))}

        </StyledTreeItem>

        {node.divider && <Divider sx={{ mb: 1 }} />}

      </div>
    )
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

  return (
    <Container component='main'>
      <Box>
        <Paper>
          {renderStyledTree()}
        </Paper>
      </Box>
    </Container>
  )
}
