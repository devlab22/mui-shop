import React from 'react'
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Stack, Typography } from '@mui/material';

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
                 <Stack
                   direction="row"
                   display="flex"
                   alignItems="center"
                   spacing={1}
                > 
                    <Box 
                        component="div" 
                        color="inherit" 
                        sx={{ mt: 0.5 }} 
                        >                       
                        {LabelIcon}
                    </Box>
                   
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit" sx={{ fontWeight: 'inherit', flexGrow: 2 }}>
                        {labelInfo}
                    </Typography>

                    
                 </Stack>
            }
            style={styleProps}
            {...other}
            ref={ref}
        />
    );
});

export default StyledTreeItem;




