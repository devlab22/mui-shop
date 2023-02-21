import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Divider } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MessageDialog({ toggle = false, title = '', message = '', onReject = Function.prototype, width='250px' }) {

    return (
        <Box>
            <Dialog           
                open={toggle}
                onClose={onReject}
                TransitionComponent={Transition}
                aria-labelledby="message-dialog-title"
                aria-describedby="message-dialog-description"
            >
                <DialogTitle id="message-dialog-title">
                    {title}
                </DialogTitle>
                <Divider/>
                <DialogContent
                 sx={{width: width}}
                >
                    <DialogContentText id="message-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onReject}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}