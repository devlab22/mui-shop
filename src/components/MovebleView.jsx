import React from 'react'

import { Paper, Box, Button, Stack } from '@mui/material'
import { Title, MovebleList, MessageDialog } from '../components'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function MovebleView() {

    const [items, setItems] = React.useState([])
    const [srcId, setSrcId] = React.useState('')
    const [targetId, setTargetId] = React.useState('')
    const [elements, setElements] = React.useState([])
    const [reload, setReload] = React.useState(true)
    const [message, setMessage] = React.useState('')
    const [error, setError] = React.useState(false)

    React.useEffect(() => {

        async function loadData() {
            const tmp = []
            for (var i = 1; i <= 500; i++) {
                tmp.push({ id: i, name: `Group ${i}` })
            }

            setItems(tmp)
        }

        loadData()
    }, [])

    const handleOnCheckboxClick = (params) => {

        const line = {
            groupId: params['groupId'],
            mac: params['mac'],
            name: params['name']
        }

        if(params['checked'] === true){
            setElements(prev => [...prev, line])
        }
        else{
            setElements(prev => prev.filter(item => item['mac'] !== params['mac']))
        }
    }

    const validateInput = () => {

        if(srcId === ''){
            setMessage('set source Group')
            return false
        }
        if(targetId === ''){
            setMessage('set target Group')
            return false
        }
        if(srcId === targetId){
            setMessage('source Group is equal target Group')
            return false
        }
        if(elements.length === 0){
            setMessage('set Endpoints')
            return false
        }

        return true
    }
    const handleOnMoveClick = async () => {

        console.log('source GroupId', srcId)
        console.log('target GroupId', targetId)

        if(!validateInput()){
            setError(true)
            return
        }

        console.log('devices')
        console.log(elements)

        
        setElements([])
        setReload(!reload)
    }

    const getLabel = (title='', groupId) => {

        const endpointGroup = items.find(item => item.id === groupId)
        if(endpointGroup){
            title = `${title}: ${endpointGroup.name}`
        }

        return title

    }

    return (
        <Box
            component={Paper}
            sx={{
                pb: '20px',
                minWidth: '1000px'
            }}
        >
            <Stack
                alignItems='center'
            >
                <Title title='Move Endpoints' />
            </Stack>

            {error &&
                <MessageDialog
                    toggle={error}
                    title='Error'
                    message={message}
                    onReject={() => setError(false)}
                    severity='error'
                />
            }

            <Stack
                direction='row'
                gap={2}
                justifyContent='space-around'
            >
                <MovebleList
                    reload={reload}
                    items={items}
                    selectedItem={srcId}
                    setSelectedItem={setSrcId}
                    onCheckboxClick={handleOnCheckboxClick}
                    children={elements}
                    label={getLabel('source Entpointgroup', srcId)}
                />

                <Button
                    variant='contained'
                    endIcon={<KeyboardDoubleArrowRightIcon />}
                    sx={{
                        height: '48px',
                        top: '210px',
                        position: 'sticky',
                       
                    }}
                    onClick={handleOnMoveClick}
                >
                    move
                </Button>

                <MovebleList
                    reload={reload}
                    items={items}
                    selectedItem={targetId}
                    setSelectedItem={setTargetId}
                    label={getLabel('target Entpointgroup', targetId)}
                />
            </Stack>

        </Box>
    )
}
