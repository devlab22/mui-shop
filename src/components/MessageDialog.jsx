import * as React from 'react';
import { Modal, Slide, Snackbar, Alert, AlertTitle } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MessageDialog({ autoHide=6000, toggle = false, title = '', message = '', onReject = Function.prototype, width = '300px', severity = 'info' }) {

    return (
        <Modal
            open={toggle}
            onClose={onReject}
        >
            <Snackbar
                autoHideDuration={autoHide}
                open={toggle}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                TransitionComponent={Transition}
            >
                <Alert
                    variant="filled"
                    severity={severity}
                    onClose={onReject}
                    sx={{ width: width }}
                >
                   {title && <AlertTitle>{title}</AlertTitle>} 
                    {message}
                </Alert>
            </Snackbar>
        </Modal>
    )
}