import * as React from 'react';
import { Modal, Slide, Stack, Snackbar, Alert, ListItemText, AlertTitle } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MessageDialog({ autoHide = 6000, toggle = false, title = '', message, onReject = Function.prototype, width = '300px', severity = 'info' }) {

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

                    {title &&
                        <AlertTitle
                            sx={{
                                fontSize: "1.3rem",
                                fontWeight: "bold",
                                mt: "-5px"
                            }}
                        >
                            {title}
                        </AlertTitle>
                    }

                    {Array.isArray(message) ? (
                        <Stack>
                            {message.length > 0 && message.map((msg, index) => (
                                <ListItemText
                                    key={index}
                                    primary={msg}
                                />
                            ))}

                        </Stack>
                    )
                        : (
                            <ListItemText
                                primary={message}
                            />
                        )
                    }
                </Alert>
            </Snackbar>
        </Modal>
    )
}