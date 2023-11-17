import React from 'react';
import { VideoPlayer } from '../components'
import { Box, Stack, Container, Paper } from '@mui/material';


export default function VideoView() {
    return (
        <Container component='main'>
            <Box>
                <Stack
                    spacing={2}
                >
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
                </Stack>
            </Box>
        </Container>
    )
}
