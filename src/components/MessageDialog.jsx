import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Divider, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import { pink, yellow, lightBlue } from '@mui/material/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MessageDialog({ toggle = false, msgty = 'I', title = '', message = '', onReject = Function.prototype, width = '250px' }) {

    const getIcon = (msgty) => {

        switch (msgty) {
            case 'I':
                return (
                    <InfoIcon sx={{ color: lightBlue[500] }} />
                )
            case 'W':
                return (
                    <WarningIcon sx={{ color: yellow[800] }} />
                )
            case 'E':
                return (
                    <ErrorIcon sx={{ color: pink[500] }} />
                )
            default:
                return (
                    <InfoIcon sx={{ color: lightBlue[500] }} />
                )
        }
    }


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

                <Divider />
                <DialogContent
                    sx={{ width: width }}
                >

                    <DialogContentText id="message-dialog-description">
                        <Stack direction='row' gap='5px'>
                            {getIcon(msgty)}
                            {message}
                        </Stack>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onReject}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}