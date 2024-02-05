import React from 'react'

import { Paper, Container, Button, Stack } from '@mui/material'
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
            for (var i = 1; i <= 50; i++) {
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
            setMessage('set Devices')
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


    return (
        <Container
            component={Paper}
            sx={{
                pb: '20px'
            }}
        >
            <Stack
                alignItems='center'
                sx={{pb: '10px'}}
            >
                <Title title='Move Devices' />
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
            >
                <MovebleList
                    reload={reload}
                    items={items}
                    selectedItem={srcId}
                    onChangeItem={value => setSrcId(value)}
                    onCheckboxClick={handleOnCheckboxClick}
                    children={elements}
                    label='source Group'
                />

                <Button
                    variant='contained'
                    endIcon={<KeyboardDoubleArrowRightIcon />}
                    sx={{
                        height: '45px',
                        mt: '5px'
                    }}
                    onClick={handleOnMoveClick}
                >
                    move
                </Button>

                <MovebleList
                    reload={reload}
                    items={items}
                    selectedItem={targetId}
                    onChangeItem={(value) => setTargetId(value)}
                    label='target Group'
                />
            </Stack>

        </Container>
    )
}
