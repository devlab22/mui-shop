import React from 'react';
import { ListSubheader, ListItemSecondaryAction, IconButton, Divider, ListItemText, ListItemButton, ListItemIcon, Checkbox } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function StyledListItem({ id, checked, itemIcon, divider, expandIcon, primary, secondary, subheader, inset = true, paddingLeft = '0px', selected, onClick, onCheck, onAdd, onRemove, onEdit }) {

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
                sx={{ pl: paddingLeft, pr: 0, width: "100%" }}
                onClick={onClick && (() => onClick(id))}
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

                <ListItemSecondaryAction
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        right: "10px",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >

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

                    {expandIcon &&
                        <IconButton
                            onClick={() => onClick(id)}
                        >
                            {expandIcon}
                        </IconButton>
                    }

                </ListItemSecondaryAction>
                
            </ListItemButton>

            {divider && <Divider sx={{ mb: 1 }} />}

        </div>
    )
}
