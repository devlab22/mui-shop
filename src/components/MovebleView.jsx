import React from 'react'
import { Box, Paper, Stack, Button } from '@mui/material'
import { Title, MessageDialog, LoadingCircle, Search, EndpointGroupList, EndpointList } from '../components'
import { default as DB } from '../API/apiService'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { v4 as uuidv4 } from 'uuid';

export default function MovebleView() {

    const [items, setItems] = React.useState([])  // EndpointGroups
    const [srcId, setSrcId] = React.useState('')   // source EndpointGroupId
    const [targetId, setTargetId] = React.useState('') // target EndpointGroupId
    const [elements, setElements] = React.useState([])
    const [message, setMessage] = React.useState('')
    const [error, setError] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const [searchGroupSrc, setSearchGroupSrc] = React.useState('')
    const [searchEndpointSrc, setSearchEndpointSrc] = React.useState('')

    const [searchGroupTarget, setSearchGroupTarget] = React.useState('')
    const [searchEndpointTarget, setSearchEndpointTarget] = React.useState('')

    const [endpointSrc, setEndpointSrc] = React.useState([])
    const [endpointTarget, setEndpointTarget] = React.useState([])



    React.useEffect(() => {

        async function loadData() {

            try {
                setIsLoading(true)
                await DB.getCountries()
            }
            catch (err) {
                console.log(err.message)
            }
            finally {
                setIsLoading(false)
            }
            const tmp = []
            for (var i = 1; i <= 50; i++) {
                tmp.push({ id: uuidv4(), name: `Group ${i}` })
            }

            setItems(tmp)
        }

        loadData()
    }, [])

    const genMAC = () => {
        var hexDigits = "0123456789ABCDEF";
        var macAddress = "";
        for (var i = 0; i < 6; i++) {
            macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
            macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
            if (i !== 5) macAddress += ":";
        }

        return macAddress;
    }

    const validateInput = (checkElements = true) => {

        if (srcId === '') {
            setMessage('set source Group')
            return false
        }
        if (targetId === '') {
            setMessage('set target Group')
            return false
        }
        if (srcId === targetId) {
            setMessage('source Group is equal target Group')
            return false
        }
        if (checkElements && elements.length === 0) {
            setMessage('set Endpoints to move')
            return false
        }

        return true
    }

    const getLabel = (title = '', groupId) => {

        const endpointGroup = items.find(item => item.id === groupId)
        if (endpointGroup) {
            title = `${title}: ${endpointGroup.name}`
        }

        return title

    }

    const handleOnCheckboxChange = (event) => {

        const checked = event['checked']
        const item = event['element']

        if (checked) {
            setElements(prev => [...prev, item])
        }
        else {
            setElements(prev => prev.filter(element => element['mac'] !== item['mac']))
        }

    }

    const handleOnItemMove = async (item) => {

        if (!validateInput(false)) {
            setError(true)
            return
        }

        await reloadEndpoints()
    }

    const clearContent = () => {

        setElements([])
        setSearchGroupSrc('')
        setSearchEndpointSrc('')
        setSearchEndpointTarget('')
        setSearchGroupTarget('')
    }

    const handleOnMoveClick = async () => {

        if (!validateInput()) {
            setError(true)
            return
        }

        await reloadEndpoints()

    }

    const reloadEndpoints = async () => {

        try {
            setIsLoading(true)
            clearContent()
            await DB.getCountries()
            const endSrc = await loadEndpoints(srcId)
            setEndpointSrc(endSrc)
            const endTarget = await loadEndpoints(targetId)
            setEndpointTarget(endTarget)
        }
        catch (err) {
            console.log(err.message)
        }
        finally {
            setIsLoading(false)
        }

    }

    const loadEndpoints = async (itemId) => {

        const data = []
        const endpointGroup = items.find(item => item.id === itemId)
        for (var i = 1; i <= 50; i++) {

            data.push({
                mac: genMAC(),
                name: `Endpoint ${i}`
            })
        }

        return data

    }

    const handleOnSrcClick = async (item, view) => {

        const itemId = item['id']


        if (itemId === '') {
            return
        }

        try {
            setIsLoading(true)
            await DB.getCountries()
            const data = await loadEndpoints(itemId)

            if (view === 'src') {
                setSrcId(itemId)
                setElements([])
                setEndpointSrc(data)
            }
            else {
                setTargetId(itemId)
                setEndpointTarget(data)
            }

        }
        catch (err) {
            console.log(err.message)
        }
        finally {
            setIsLoading(false)
        }


    }

    return (
        <Box
            component={Paper}
            sx={{
                pb: '20px',
                minWidth: '860px'
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

            {isLoading ?
                <LoadingCircle />
                :
                <Stack
                    direction='row'
                    gap={2}
                    justifyContent='space-around'
                >

                    <Stack
                        direction='column'
                        gap={2}
                    >

                        <Stack
                            alignItems='center'
                            direction='column'
                            gap={2}
                        >

                            <Title title={getLabel('source Entpointgroup', srcId)} />

                            <Stack
                                direction='row'
                                gap={2}
                            >

                                <Stack
                                    direction='column'
                                    gap={2}

                                >
                                    <Search
                                        label='Name'
                                        onChange={(e) => setSearchGroupSrc(e.target.value)}
                                    />
                                    <EndpointGroupList
                                        items={items}
                                        search={searchGroupSrc}
                                        selectedItem={srcId}
                                        onItemClick={(item) => handleOnSrcClick(item, 'src')}
                                    />

                                </Stack>

                                <Stack
                                    direction='column'
                                    gap={2}

                                >
                                    <Search
                                        label='Mac'
                                        onChange={(e) => setSearchEndpointSrc(e.target.value)}
                                    />
                                    <EndpointList
                                        items={endpointSrc}
                                        search={searchEndpointSrc}
                                        selected={elements}
                                        onCheckboxChange={handleOnCheckboxChange}
                                        onMoveItem={handleOnItemMove}
                                    />
                                </Stack>
                            </Stack>

                        </Stack>

                    </Stack>

                    <Button
                        color='primary'
                        variant="contained"
                        endIcon={<KeyboardDoubleArrowRightIcon />}
                        sx={{
                            height: '50px',
                            minWidth: '120px',
                            top: '300px',
                            position: 'sticky'
                        }}
                        onClick={handleOnMoveClick}
                    >
                        {`Move (${elements.length})`}
                    </Button>

                    <Stack
                        direction='column'
                        gap={2}
                    >

                        <Stack
                            alignItems='center'
                        >

                            <Title title={getLabel('target Endpointgroup', targetId)} />
                        </Stack>

                        <Stack
                            direction='row'
                            gap={2}
                        >

                            <Stack
                                direction='column'
                                gap={2}
                            >
                                <Search
                                    label='Name'
                                    onChange={(e) => setSearchGroupTarget(e.target.value)}
                                />

                                <EndpointGroupList
                                    items={items}
                                    search={searchGroupTarget}
                                    selectedItem={targetId}
                                    onItemClick={(item) => handleOnSrcClick(item, 'target')}
                                />

                            </Stack>

                            <Stack
                                direction='column'
                                gap={2}
                            >

                                <Search
                                    label='Mac'
                                    onChange={(e) => setSearchEndpointTarget(e.target.value)}

                                />

                                <EndpointList
                                    items={endpointTarget}
                                    search={searchEndpointTarget}
                                />

                            </Stack>
                        </Stack>
                    </Stack>

                </Stack>
            }

        </Box>
    )
}
