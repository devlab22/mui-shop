import React from 'react';
import { Box } from '@mui/material';

export default function Toolbar({ buttons = [] }) {

    
    const setToolbar = () => {

        buttons.sort((a,b) => a.seqnr - b.seqnr);

        return(
            <Box>
                {
                    buttons.map(button => {

                        if(button.type === 'img'){
                            return setImageToolbar(button);
                        }
                        else{
                            return (<Box key='99'></Box>)
                        }
                    })
                }
            </Box>
        )
    }

    const setImageToolbar = (button) => {
        
        return (
            <img 
                height={48} 
                width='auto' 
                key={button.id} 
                src={button.image} 
                alt={button.name} 
                onClick={button.onClick} 
                title={button.name} 
                style={{
                    cursor: 'pointer',
                    marginRight: '10px',
                    opacity: 0.8,
                    "&:hover": {
                        opacity: 1
                      },

                }}
               
                />
        )
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                margin: '5px 0',
                overflow: 'auto',
                width: '100%',
                padding: '5px 0',
                mb: '15px',
                border: '1px solid grey'
            }}
        >
            {
                Array.isArray(buttons) && (
                    setToolbar()
                )
            }
        </Box>
    )
}
