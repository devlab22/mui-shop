import React from 'react'
import { Box, Paper, Stack } from '@mui/material'
import { Title, MessageDialog, LoadingCircle, Search, EndpointGroupList, EndpointList } from '../components'
import { default as DB } from '../API/apiService'


export default function MovebleView() {

    const [items, setItems] = React.useState([])  // EndpointGroups
    const [srcId, setSrcId] = React.useState('')   // source EndpointGroupId
    const [targetId, setTargetId] = React.useState('') // target EndpointGroupId
    const [elements, setElements] = React.useState([])
    const [reload, setReload] = React.useState(true)
    const [message, setMessage] = React.useState('')
    const [error, setError] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    
    const [searchGroupSrc, setSearchGroupSrc] = React.useState('')
    const [searchEndpointSrc, setSearchEndpointSrc] = React.useState('')

    const [searchGroupTarget, setSearchGroupTarget] = React.useState('')
    const [searchEndpointTarget, setSearchEndpointTarget] = React.useState('')

    const [endpointSrc, setEndpointSrc] = React.useState([])

   

    React.useEffect(() => {

        async function loadData() {

            try {
                setIsLoading(true)
                const countries = await DB.getCountries()
            }
            catch (err) {
                console.log(err.message)
            }
            finally {
                setIsLoading(false)
            }
            const tmp = []
            for (var i = 1; i <= 50; i++) {
                tmp.push({ id: i, name: `Group ${i}` })
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
            setMessage('set Endpoints')
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

    const handleOnItemMove = async (item) => {

        if (!validateInput(false)) {
            setError(true)
            return
        }

        console.log('move', item)
        try {
            setIsLoading(true)
            const countries = await DB.getCountries()
        }
        catch (err) {
            console.log(err.message)
        }
        finally {
            setIsLoading(false)
        }
        setReload(!reload)
    }

    const loadEndpoints = async (itemId) => {

        const data = []
        for (var i = 1; i <= 50; i++) {

            data.push({ mac: genMAC(), name: `Endpoint ${i} (${itemId})` })
        }

        return data

    }

   const handleOnSrcClick = async (item) => {
    
    const itemId = item['id']
    setSrcId(itemId)

    if (itemId === '') {
        return
    }

    try {
        setIsLoading(true)
        const countries = await DB.getCountries()
        const data = await loadEndpoints(itemId)
        setEndpointSrc(data)
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
                    direction='row'
                    >

                    <Stack
                        alignItems='center'
                        direction='column'
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
                           <Search onChange={(e) => setSearchGroupSrc(e.target.value)}/>
                           <EndpointGroupList items={items} search={searchGroupSrc} selectedItem={srcId} onItemClick={handleOnSrcClick}/>
                           
                        </Stack>

                      

                        <Stack
                            direction='column'
                            gap={2}
                           
                        >
                           <Search onChange={(e) => setSearchEndpointSrc(e.target.value)}/>
                            <EndpointList items={endpointSrc} search={searchEndpointSrc} onMoveItem={handleOnItemMove}/>
                        </Stack>
                    </Stack>

                    <Stack>
                    </Stack>

                    </Stack>
                    </Stack>

                   

                </Stack>
            }

        </Box>
    )
}
