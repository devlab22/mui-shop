import React from 'react'

import { Paper, Container, Button, Stack } from '@mui/material'
import { Title, MovebleList } from '../components'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function MovebleView() {

    const [items, setItems] = React.useState([])
    const [srcId, setSrcId] = React.useState('')
    const [targetId, setTargetId] = React.useState('')
    const [elements, setElements] = React.useState([])


    React.useEffect(() => {

        async function loadData() {
            const tmp = []
            for (var i = 1; i <= 10; i++) {
                tmp.push({ id: i, name: `Group ${i}` })
            }

            setItems(tmp)
        }

        loadData()
    }, [])


    return (
        <Container
            component={Paper}
            sx={{
                pb: '20px'
            }}
        >
            <Stack
                alignItems='center'
            >
                <Title title='Move Devices' />
            </Stack>

            <Stack
                direction='row'
                gap={2}
            >
                <MovebleList
                    moveble
                    items={items}
                    selectedItem={srcId}
                    onChangeItem={value => setSrcId(value)}
                    onCheckboxClick={(itemId) => console.log(itemId)}
                />

                <Button
                    variant='contained'
                    endIcon={<KeyboardDoubleArrowRightIcon />}
                    sx={{height: '50px'}}
                >
                    move
                </Button>

                <MovebleList
                    items={items}
                    selectedItem={targetId}
                    onChangeItem={(value) => setTargetId(value)}
                />
            </Stack>

        </Container>
    )
}
