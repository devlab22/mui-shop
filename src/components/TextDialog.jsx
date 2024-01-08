import React from 'react'
import { Stack, Box, Divider, DialogActions, Button, DialogContent, Dialog, DialogTitle, Slide, TextField } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TextDialog({ toggle = false, title, text = '', edit = false, onChange, onReject = Function.prototype, onAccept }) {
    return (
        <Box>
            <Dialog
                open={toggle}
                onClose={onReject}
                TransitionComponent={Transition}
                aria-labelledby="text-dialog-title"
                aria-describedby="text-dialog-description"
                sx={{ width: '100%' }}
                fullWidth

            >

                {title &&
                    <Stack
                        display='flex'
                        alignItems='center'
                    >

                        <DialogTitle
                            id="text-dialog-title"
                        >
                            {title}
                        </DialogTitle>

                        <Divider />
                    </Stack>

                }

                <DialogContent>

                    <TextField
                        variant="outlined"
                        multiline
                        fullWidth
                        value={text}
                        onChange={onChange && onChange}
                        sx={{ width: '100%' }}

                    />

                </DialogContent>
                <DialogActions>
                    <Stack
                        direction='row'
                        display='flex'
                        gap={1}
                        sx={{ pr: '20px' }}
                    >
                        {onAccept &&
                            <Button
                                onClick={onAccept}
                                variant='contained'
                            >
                                Ok
                            </Button>
                        }


                        <Button
                            variant='contained'
                            onClick={onReject}
                        >
                            Cancel
                        </Button>


                    </Stack>

                </DialogActions>
            </Dialog>

        </Box>
    )
}