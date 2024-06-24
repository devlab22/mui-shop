import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { default as API } from '../API/apiService'
import { Touchable, MessageDialog } from '../components'
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import AppContext from '../context';
import AodIcon from '@mui/icons-material/Aod';
import AppleIcon from '@mui/icons-material/Apple';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {

  const { config } = useContext(AppContext);

  const [url, setUrl] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [sapActions, setSapActions] = useState([])
  const [severity, setSeverity] = useState('info')

  React.useEffect(() => {

    async function loadData() {

      setSapActions([
        {
          id: 1, title: 'Set Endpoints',
          poster: getRandomImage(),
          avatar: <AodIcon />,
          keyValues: [{ key: 'key1', value: 'value 1' }],
          values: ['info 1', 'info 3'],
          description: 'Endpoints',
         /*  customButtons: [
            { id: 2, seqnr: 1, type: 'img', icon: <SaveIcon color='primary' />, title: 'set endpoints', onClick: handleOnSapAction, description: 'description other data' }

          ] */
        },
        {
          id: 2,
          poster: getRandomImage(),
          avatar: <AppleIcon />,
          /* customButtons: [
            { id: 2, seqnr: 1, type: 'img', icon: <SaveIcon color='primary' />, title: 'set endpoints', onClick: handleOnSapAction, description: 'description other data' }

          ], */
          title: 'Set other Data', values: ['info 3'], description: 'description other data'
        },
        { id: 3, poster: getRandomImage(), title: 'Set other Data', values: ['info 3'], description: 'description other data' },
        { id: 4, poster: getRandomImage(), title: 'Set other Data', values: ['info 3'], description: 'description other data' }
      ])
      try {

        var image = getRandomImage()
        setUrl(image)
      }
      catch (err) {

      }
    }

    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getRandomImage = () => {

    const images = config['images'] || []

    const image = API.getRandomImage(images)

    return image

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleOnSapAction = (id) => {
    console.log(sapActions)
    const action = sapActions.find(item => item.id === id)
    console.log(id)
    console.log(action)
    if (action) {
      setMessage(action['description'] || 'not found')
      setTitle(action['title'] || 'not found')
      setSeverity('info')
    }
    else {
      setMessage('')
      setTitle(`id ${id} not found`)
      setSeverity('error')
    }
    setOpen(true)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '89vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={6}
          sx={{
            backgroundImage: `url(${url})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={3} sm={2} md={2} component={Paper} elevation={6} square>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={9} sm={4} md={4} component={Paper} elevation={6} square>
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
                onCardClicked={(id) => handleOnSapAction(id)}
                buttons={[
                  { id: 1, seqnr: 2, type: 'img', icon: <InfoIcon color='primary' />, title: 'info', name: 'info', onClick: handleOnSapAction },
                  { id: 2, seqnr: 1, type: 'img', icon: <SaveIcon color='primary' />, title: 'set endpoints', name: 'set data', onClick: handleOnSapAction }

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
    </ThemeProvider>
  );
}