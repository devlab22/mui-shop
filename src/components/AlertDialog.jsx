import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Divider, Stack } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ toggle = false, question = '', title = '', onReject = Function.prototype, onAccept = Function.prototype }) {

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
                    {title}
                </DialogTitle>
                <Divider />
                <DialogContent>
                   
                        <Stack direction='row' gap='5px'>
                            <HelpIcon color='primary'/>
                            {question}
                        </Stack>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onReject}>Cancel</Button>
                    <Button variant="contained" onClick={onAccept} autoFocus>Ok</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}