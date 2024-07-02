import React from 'react';
import { Grid, Box, TextField, Avatar, CssBaseline, Paper, FormControlLabel, Checkbox } from '@mui/material'
import { Touchable, MessageDialog } from '../components'
import { Info, Save, Aod, Apple } from '@mui/icons-material';
import AppContext from '../context';
import { default as API } from '../API/apiService'

export default function SapActions() {

    const [open, setOpen] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [sapActions, setSapActions] = React.useState([])
    const [severity, setSeverity] = React.useState('info')
    const [signIn, setSignIn] = React.useState({
        username: '',
        password: '',
        url: '',
        client: '',
        remember: false
    })

    const { config } = React.useContext(AppContext);

    React.useEffect(() => {

        async function loadData() {

            setSapActions([
                {
                    id: 1, title: 'Set Endpoints',
                    poster: getRandomImage(),
                    // avatar: <Aod />,
                    // keyValues: [{ key: 'key1', value: 'value 1' }],
                    values: ['Description 1'],
                    description: 'Endpoints',
                },
                {
                    id: 2,
                    poster: getRandomImage(),
                    // avatar: <Apple />,
                    title: 'Set other Data',
                    values: ['Description 3'],
                    description: 'description other data'
                },
                {
                    id: 3,
                    poster: getRandomImage(),
                    title: 'Set other Data',
                    values: ['Description 3'],
                    description: 'description other data'

                },
                {
                    id: 4,
                    poster: getRandomImage(),
                    title: 'Set other Data',
                    values: ['Description 3'],
                    description: 'description other data'
                }
            ])

        }

        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getRandomImage = () => {

        const images = config['images'] || []

        const image = API.getRandomImage(images)

        return image

    }

    const showMessage = (title='', message='', severity='info') => {
        setTitle(title)
        setMessage(message)
        setSeverity(severity)
        setOpen(true)
    }

    const checkSignIn = () => {
        var checked = true

        if ((signIn.username.length === 0)
            || (signIn.password.length === 0)
            || (signIn.url === 0)
            || (signIn.client === 0)
        ) {
            checked = false
            showMessage('SAP Authorization', 'Login data is invalid', 'error')
            setOpen(true)
        }

        return checked
    }

    const handleOnSapAction = (id) => {

        const checked = checkSignIn()
        if (!checked) {
            return
        }

        const action = sapActions.find(item => item.id === id)

        if (action) {
            showMessage(action['title'], action['description'], 'info')
        }
        else {
            showMessage('SAP Action', `id ${id} not found`, 'error')
        }
    }

    const handleOnSapActionInfo = (id) => {

        const action = sapActions.find(item => item.id === id)

        if (action) {
            showMessage(action['title'], action['description'], 'info')
        }
        else {
            showMessage('SAP Action', `id ${id} not found`, 'error')
        }
    }

    return (
        <Grid container component='main' height='85vh'>
            <CssBaseline />
            <Grid item xs={3} sm={3} md={3} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '10px 20px'
                    }}
                >
                    <Avatar
                        alt='sap'
                        src='img/sap/sap_logo.png'
                        sx={{ width: 'auto', height: '120px' }}
                    />

                    {/* <Avatar
                        alt='sapui5'
                        src='img/sap/sapui5.png'
                        sx={{ width: 'auto', height: '8rem' }}
                    /> */}

                    <Box
                        component='form'
                        sx={{
                            padding: '0 0px'
                        }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Sap User"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={signIn.username}
                            onChange={(event) => setSignIn(prev => ({ ...prev, username: event.target.value }))}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="password"
                            value={signIn.password}
                            onChange={(event) => setSignIn(prev => ({ ...prev, password: event.target.value }))}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="url"
                            label="System Url"
                            name="url"
                            autoComplete="url"
                            value={signIn.url}
                            onChange={(event) => setSignIn(prev => ({ ...prev, url: event.target.value }))}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="client"
                            label="Client"
                            name="client"
                            autoComplete="client"
                            value={signIn.client}
                            onChange={(event) => setSignIn(prev => ({ ...prev, client: event.target.value }))}
                        />

                        <FormControlLabel
                            control={
                            <Checkbox 
                                value="remember" 
                                color="primary" 
                                checked={signIn.remember}
                                onChange={(event) => setSignIn(prev => ({ ...prev, remember: event.target.checked }))}
                                />
                            }
                            label="Remember me"
                        />

                    </Box>
                </Box>


            </Grid>
            <Grid item xs={9} sm={9} md={9} component={Paper} elevation={6} square>
                <Grid
                    container
                    alignItems='center'
                    justifyContent="start"
                    spacing={2}
                    sx={{ p: '10px' }}
                >

                    {sapActions.map(action => (

                        <Touchable
                            key={action.id}
                            minHeight={220}
                            // onCardClicked={(id) => handleOnSapActionInfo(id)}
                            buttons={[
                                { id: 1, seqnr: 2, type: 'img', icon: <Info color='primary' />, title: 'info', name: 'info', onClick: handleOnSapActionInfo },
                                { id: 2, seqnr: 1, type: 'img', icon: <Save color='primary' />, title: 'set endpoints', name: 'set data', onClick: handleOnSapAction }

                            ]}
                            {...action}
                        />

                    ))}

                    {open && (
                        <MessageDialog
                            toggle={open}
                            title={title}
                            message={message}
                            severity={severity}
                            onReject={() => setOpen(false)}
                        />
                    )}

                </Grid>
            </Grid>
        </Grid>
    )
}
