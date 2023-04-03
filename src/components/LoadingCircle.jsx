import React from 'react';
import { Circles, Blocks, Grid, ThreeDots, Bars, Dna, MagnifyingGlass, ProgressBar, RotatingSquare } from 'react-loader-spinner';
import { Stack } from '@mui/material';


export default function LoadingCircle({ typeContent = 'circle', color = '#1976D2', height = 120, width = 120 }) {

    const getContent = () => {

        switch (typeContent) {
            case 'circle':
                return (
                    <Circles
                        height={height}
                        width={width}
                        color={color}
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                )

            case 'blocks':
                return (
                    <Blocks
                        visible={true}
                        height={height}
                        width={width}
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                )

            case 'grid':
                return (
                    <Grid
                        height={height}
                        width={width}
                        color={color}
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                )
            case 'dots':
                return (
                    <ThreeDots
                        height={height}
                        width={width}
                        radius="9"
                        color={color}
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                )
            case 'bars':
                return (
                    <Bars
                        height={height}
                        width={width}
                        color={color}
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                )
            case 'dna':
                return (
                    <Dna
                        visible={true}
                        height={height}
                        width={width}
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                )
            case 'glass':
                return (
                    <MagnifyingGlass
                        visible={true}
                        height={height}
                        width={width}
                        ariaLabel="MagnifyingGlass-loading"
                        wrapperStyle={{}}
                        wrapperClass="MagnifyingGlass-wrapper"
                        glassColor='#c0efff'
                        color='#e15b64'
                    />
                )
            case 'progressbar':
                return (
                    <ProgressBar
                        height={height}
                        width={width}
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass="progress-bar-wrapper"
                        borderColor='#F4442E'
                        barColor='#51E5FF'
                    />
                )
            case 'rotatingSquare':
                return (
                    <RotatingSquare
                        height={height}
                        width={width}
                        color={color}
                        ariaLabel="rotating-square-loading"
                        strokeWidth="4"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                )
            default:
                return (
                    <Circles
                        height={height}
                        width={width}
                        color={color}
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                )
        }

    }
    return (
        <Stack
            alignItems='center'
        >
            {getContent()}
        </Stack>
    )
}