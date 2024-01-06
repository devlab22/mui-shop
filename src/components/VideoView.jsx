import React from 'react';
import { VideoPlayer, Counter, UploadButton } from '../components'
import { Box, Stack, Container, Paper } from '@mui/material';


export default function VideoView() {
    return (
        <Container component='main'>
            <Box>
                <Stack
                    spacing={2}
                >

                    <UploadButton
                        handleFileUpload={(id, e) => console.log(id, e)}
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
