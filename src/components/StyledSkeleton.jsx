import React from 'react'
import { Skeleton, Stack } from '@mui/material'

export default function StyledSkeleton({ content="", width = "210px" }) {

    const renderContent = () => {

        switch(content){
            case 'grid':
                return(
                    <Stack
                        spacing={1}
                        alignItems="center"
                        sx={{ width: `${width}` }}
                    >
                        <Skeleton variant="rectangular" width="100%" height={30} />
                        <Skeleton variant="rectangular" width="100%" height={30} />
                        <Skeleton variant="rectangular" width="100%" height={30} />
                        <Skeleton variant="rectangular" width="100%" height={30} />
                    </Stack>
                )
            default:
                return(
                    <Stack
                        spacing={1}
                        alignItems="center"
                        sx={{ width: `${width}` }}
                    >
                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: "100%" }} />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rectangular" width="100%" height={60} />
                        <Skeleton variant="rounded" width="100%" height={60} />
                    </Stack>
                )
        }
        
    }
    return (
        <Stack
            spacing={1}
            alignItems="center"
            sx={{ p: "5px 0" }}
        >
           {renderContent()}
        </Stack>
    )
}
