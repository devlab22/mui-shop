import React, { useRef, useState } from 'react';
import { Stack, Typography, IconButton, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const VideoPlayer = ({ title, src, type, width, resize = [600, 560, 320, 420] }) => {

    const ref = useRef(null)
    const [stop, setStop] = useState(true)
    const [videoWidth, setVideoWidth] = useState(width)

    resize.push(Number(width))
    resize.sort()
    const resizesSet = new Set(resize)

    resize = []
    resizesSet.forEach(item => resize.push(item))

    const handleOnPause = () => {
        ref.current.pause()
        setStop(true)
    }

    const handleOnPlay = () => {
        ref.current.play()
        setStop(false)
    }

    const handleChange = (event) => {
        setVideoWidth(event.target.value)
    }
    return (
        <Stack
            spacing={1}
            padding={2}
            alignItems='center'
        >

            <Typography
                variant="h2"
                component="h2"
                sx={{
                    fontWeight: 'bold',
                    fontSize: "1.2rem"

                }}
                color="primary"
            >
                {title}
            </Typography>

            <video
                width={videoWidth}
                height="auto"
                ref={ref}
                onEnded={() => setStop(true)}
            >
                <source src={src} type={type} />
            </video>

            <Stack
                direction='row'
                spacing={1}
            >

                {stop ?
                    <IconButton
                        title='Play'
                        onClick={handleOnPlay}
                        disabled={!stop}
                    >
                        <PlayCircleIcon color={`${!stop ? '' : 'primary'}`} />
                    </IconButton>
                    :
                    <IconButton
                        title='Pause'
                        onClick={handleOnPause}
                        disabled={stop}
                    >
                        <PauseCircleIcon color={`${stop ? '' : 'primary'}`} />
                    </IconButton>
                }

                {resize.length > 1 &&
                    <FormControl fullWidth sx={{ minWidth: 120 }} size="small">
                        <InputLabel id="video-select-label">Width</InputLabel>
                        <Select
                            labelId="video-select-label"
                            id="video-select"
                            value={videoWidth}
                            label="Width"
                            onChange={handleChange}
                        >
                            {resize.map(value => (
                                <MenuItem key={value} value={value}>{`${value}px`}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                }

            </Stack>

        </Stack>

    )
}

export default VideoPlayer;