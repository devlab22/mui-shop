import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Divider, Stack } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddItemDialog({toggle, onReject, title, onAccept}) {


    const handleOnAccept = () => {
        
        onAccept()
    }
    return (
        <Box>
            <Dialog
                open={toggle}
                onClose={onReject}
                TransitionComponent={Transition}
                aria-labelledby="add-item-dialog-title"
                aria-describedby="add-item-dialog-description"
            >

                <DialogTitle id="add-item-dialog-title">
                    {title}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Stack direction='row' gap='5px'>


                        </Stack>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={onReject}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleOnAccept}
                        autoFocus
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
