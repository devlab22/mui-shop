import React from 'react'
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { styled, useTheme } from '@mui/material/styles';
import { Box, IconButton, Stack, Typography, Checkbox } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

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
       // marginLeft: 0,
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
        checked,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        colorForDarkMode,
        bgColorForDarkMode,
        onRemove,
        onAdd,
        onEdit,
        onCheck,
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
                <Stack
                    direction="row"
                    display="flex"
                    alignItems="center"
                    spacing={1}
                    sx={{ p: "10px 0px" }}
                >

                    {onCheck &&
                        <Box
                            component="div"
                            color="inherit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Checkbox
                                checked={checked}
                                onChange={onCheck}
                            />
                        </Box>
                    }

                    <Box
                        component="div"
                        color="inherit"
                        sx={{ pt: 1 }}
                    >
                        {LabelIcon}
                    </Box>


                    <Typography variant="body" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    <Typography variant="body2" color="inherit" >
                        {labelInfo}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        onClick={(e) => e.stopPropagation()}
                    >

                        {onAdd &&
                            <IconButton
                                title="add item"
                                onClick={onAdd}
                            >
                                <AddCircleIcon color='primary' />
                            </IconButton>
                        }

                        {typeof (onEdit) === 'function' &&
                            <IconButton
                                title="edit item"
                                onClick={onEdit}
                            >
                                <EditIcon color='primary' />
                            </IconButton>
                        }

                        {onRemove &&
                            <IconButton
                                title="delete item"
                                onClick={onRemove}
                            >
                                <DeleteIcon color='primary' />
                            </IconButton>
                        }

                    </Stack>

                </Stack>
            }
            style={styleProps}
            {...other}
            ref={ref}
        />
    );
});

export default StyledTreeItem;




