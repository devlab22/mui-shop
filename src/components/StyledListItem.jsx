import React, { Fragment } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { ListSubheader, ListItem, ListItemClasses, IconButton, Divider, ListItemText, Stack, ListItemButton, ListItemIcon, Checkbox } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'

const StyledListItemRoot = styled(ListItem)(({ theme }) => ({
    color: theme.palette.text.secondary
}));

const StyledListItem = React.forwardRef(function StyledListItem(props, ref) {
    const theme = useTheme();
    const {
        bgColor,
        color,
        primary,
        secondary,
        subheader,
        itemIcon,
        id,
        inset,
        paddingLeft,
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
        onClick,
        selected,
        expandIcon,
        divider,
        ...other
    } = props;

    const styleProps = {
        '--list-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
        '--list-view-bg-color':
            theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
    };

    return (
        <StyledListItemRoot
            label={<Stack
                direction="row"
                display="flex"
                alignItems="center"
                spacing={1}
                sx={{ p: "10px 0px" }}
            >

                {subheader &&
                    <ListSubheader
                        component="div"
                        color="primary"
                        inset={inset}
                        sx={{
                            fontSize: '1.2rem',
                            fontWeight: "bold"
                        }}
                    >
                        {subheader}
                    </ListSubheader>
                }

                <ListItemButton
                    sx={{ pl: paddingLeft }}
                    onClick={onClick && (() => onClick(id))}
                    dense={false}
                    selected={selected}
                >

                    {typeof (onCheck) === 'function' &&
                        <ListItemIcon
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Checkbox
                                edge="start"
                                checked={checked}
                                onChange={(e) => onCheck(id, e.target.checked)}
                            />
                        </ListItemIcon>
                    }

                    <ListItemIcon>
                        {itemIcon}
                    </ListItemIcon>

                    <ListItemText primary={primary} secondary={secondary} />

                    <Stack
                        direction="row"
                        spacing={1}
                        onClick={(e) => e.stopPropagation()}
                    >

                        <Fragment>

                            {typeof (onAdd) === 'function' &&
                                <IconButton
                                    size="small"
                                    aria-label="add"
                                    title="add item"
                                    onClick={() => onAdd(id)}
                                >
                                    <AddCircleIcon
                                        color='primary'
                                    />
                                </IconButton>
                            }


                            {typeof (onEdit) === 'function' &&
                                <IconButton
                                    size="small"
                                    aria-label="edit"
                                    title="edit item"
                                    onClick={() => onEdit(id)}
                                >
                                    <EditIcon
                                        color='primary'
                                    />
                                </IconButton>
                            }

                            {typeof (onRemove) === 'function' &&
                                <IconButton
                                    size="small"
                                    aria-label="delete"
                                    title="delete item"
                                    onClick={() => onRemove(id)}
                                >
                                    <DeleteIcon
                                        color='primary'
                                    />
                                </IconButton>
                            }
                        </Fragment>

                    </Stack>


                    {expandIcon &&
                        <ListItemIcon
                            sx={{
                                left: "10px"
                            }}
                            onClick={(e) => {
                                e.stopPropagation()
                                onClick(id)
                            }}
                        >
                            {expandIcon}
                        </ListItemIcon>
                    }
                </ListItemButton>

                {divider && <Divider sx={{ mb: 1 }} />}
            </Stack>}
            style={styleProps}
            {...other}
            ref={ref}
        >

        </StyledListItemRoot>
    )
})

export default StyledListItem;

/* export default function StyledListItem({ id, checked, itemIcon, divider, expandIcon, primary, secondary, subheader, inset = true, paddingLeft = '0px', selected, onClick, onCheck, onAdd, onRemove, onEdit }) {

    return (
        <div key={id}>

            {subheader &&
                <ListSubheader
                    component="div"
                    color="primary"
                    inset={inset}
                    sx={{
                        fontSize: '1.2rem',
                        fontWeight: "bold"
                    }}
                >
                    {subheader}
                </ListSubheader>
            }

            <ListItemButton
                sx={{ pl: paddingLeft }}
                onClick={onClick && (() => onClick(id))}
                dense={false}
                selected={selected}
            >

                {typeof (onCheck) === 'function' &&
                    <ListItemIcon
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Checkbox
                            edge="start"
                            checked={checked}
                            onChange={(e) => onCheck(id, e.target.checked)}
                        />
                    </ListItemIcon>
                }

                <ListItemIcon>
                    {itemIcon}
                </ListItemIcon>

                <ListItemText primary={primary} secondary={secondary} />

                <Stack
                    direction="row"
                    spacing={1}
                    onClick={(e) => e.stopPropagation()}
                >

                    <Fragment>

                        {typeof (onAdd) === 'function' &&
                            <IconButton
                                size="small"
                                aria-label="add"
                                title="add item"
                                onClick={() => onAdd(id)}
                            >
                                <AddCircleIcon
                                    color='primary'
                                />
                            </IconButton>
                        }


                        {typeof (onEdit) === 'function' &&
                            <IconButton
                                size="small"
                                aria-label="edit"
                                title="edit item"
                                onClick={() => onEdit(id)}
                            >
                                <EditIcon
                                    color='primary'
                                />
                            </IconButton>
                        }

                        {typeof (onRemove) === 'function' &&
                            <IconButton
                                size="small"
                                aria-label="delete"
                                title="delete item"
                                onClick={() => onRemove(id)}
                            >
                                <DeleteIcon
                                    color='primary'
                                />
                            </IconButton>
                        }
                    </Fragment>

                </Stack>


                {expandIcon &&
                    <ListItemIcon
                        sx={{
                            left: "10px"
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            onClick(id)
                        }}
                    >
                        {expandIcon}
                    </ListItemIcon>
                }
            </ListItemButton>

            {divider && <Divider sx={{ mb: 1 }} />}

        </div>
    )
}
 */