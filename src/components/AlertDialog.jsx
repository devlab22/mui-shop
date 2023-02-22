import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Divider, Stack } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ toggle = false, question = '', description = '', onReject = Function.prototype, onAccept = Function.prototype }) {

    return (
        <Box>
            <Dialog
                open={toggle}
                onClose={onReject}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {question}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Stack direction='row' gap='5px'>
                            <HelpIcon color='primary'/>
                            {description}
                        </Stack>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onReject}>Disagree</Button>
                    <Button onClick={onAccept} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}