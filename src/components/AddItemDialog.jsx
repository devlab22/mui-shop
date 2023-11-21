import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, TextField, Paper, Stack, DialogTitle, Slide, Divider } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddItemDialog({ toggle, item={id: null, name: '', seqnr: 0}, onReject, title, onAccept }) {

    const [name, setName] = React.useState(item.name);
    const [seqnr, setSeqnr] = React.useState(item.seqnr);

    return (
        <Box>
            <Dialog
                open={toggle}
                onClose={onReject}
                TransitionComponent={Transition}
                aria-labelledby="add-item-dialog-title"
                aria-describedby="add-item-dialog-description"
            >

                <Stack
                    display="flex"
                    alignItems="center"
                    >
                    <DialogTitle id="add-item-dialog-title">
                        {title}
                    </DialogTitle>
                </Stack>


                <Divider />
                <DialogContent>
                    <Paper>
                        <Stack
                            gap={1}
                            sx={{ p: "15px" }}
                        >

                            <TextField
                                id="name-field"
                                label="Name"
                                variant="outlined"
                                autoFocus
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                                {name}
                            </TextField>

                            <TextField
                                id="seqnr-field"
                                label="Seqnr"
                                variant="outlined"
                                type="number"
                                defaultValue={seqnr}
                                onChange={(e) => setSeqnr(e.target.value)}
                            >
                                {seqnr}
                            </TextField>

                        </Stack>
                    </Paper>
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
                        onClick={() => onAccept({...item, name: name, seqnr: seqnr })}
                        disabled={name.length === 0}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
