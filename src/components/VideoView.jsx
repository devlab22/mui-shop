import React, { useState } from 'react';
import { VideoPlayer, Counter, UploadButton, TextDialog, LoadingCircle } from '../components'
import { Box, Stack, Container, Paper } from '@mui/material';



export default function VideoView() {

    const [textDialog, setTextDialog] = useState(false)
    const [values, setValues] = useState('')
    const [dialogTitle, setDialogTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const uploadFile = async (id, event) => {

        const file = event.target.files[0];

        const reader = new FileReader();
        console.log(isLoading)
        reader.addEventListener("load", (event) => {

            const value = event.target.result;

             onShowContent(value, file['name'])

        });

        if (file) {
            reader.readAsText(event.target.files[0]);
        }

    }

    const onShowContent = (value, title=null) => {

        setIsLoading(false)
        setTextDialog(true)
        setValues(value)
        setDialogTitle(title)
      }



    return (
        <Container component='main'>
            <Box>

                {isLoading && <LoadingCircle/>}

                {textDialog && 
                    <TextDialog
                        toggle={textDialog}
                        title={dialogTitle}
                        text={values}
                        onReject={() => setTextDialog(false)}
                    />}

                <Stack
                    spacing={2}
                >

                    <UploadButton
                        handleFileUpload={uploadFile}
                    />
                    <Paper>
                        <VideoPlayer
                            title='Flower'
                            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                            type="video/mp4"
                            width="600"
                        />
                    </Paper>

                    <Paper>
                        <VideoPlayer
                            title='Big Buck Bunny'
                            src="https://www.w3schools.com/html/mov_bbb.mp4"
                            type="video/mp4"
                            width="600"
                        />
                    </Paper>

                    <Paper>
                        <Counter
                            title="My Counter"
                            count={10}
                            onPlus={(counter) => console.log("counter 1 plus", counter)}
                            onMinus={(counter) => console.log("counter 1 minus", counter)}
                        />
                    </Paper>

                    <Paper>
                        <Counter
                            title="My Counter 2"
                            count={5}
                            onPlus={(counter) => console.log("counter 2 plus", counter)}
                            onMinus={(counter) => console.log("counter 2 minus", counter)}
                        />
                    </Paper>

                </Stack>
            </Box>
        </Container>
    )
}
