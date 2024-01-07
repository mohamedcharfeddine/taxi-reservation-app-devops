// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { isEmail, isLength } from 'validator'
import { loginfunc } from '../../api/appConfig'
import getConfig from 'next/config'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import MuiFormControlLabel from '@mui/material/FormControlLabel'


// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const [accessToken, setAccessToken] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if (validateFields()) {
      try {
        const response = await loginfunc(email, password)
        const accessToken = response.accessToken
        localStorage.setItem('accessToken', accessToken)
        setAccessToken(accessToken)

        if (response.accessToken) {
          window.location.href = '/dashboard'
        } else {
          setError("L'e-mail ou le mot de passe est incorrect.")
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("L'e-mail ou le mot de passe est incorrect.")
        } else {
          console.error(error)
        }
      }
    }
  }

  const validateFields = () => {
    let isValid = true

    setEmailError('')
    setPasswordError('')

    // Valider le champ email
    if (email.trim() === '') {
      setEmailError('Email is required')
      isValid = false
    } else if (!isEmail(email)) {
      setEmailError('Invalid email format')
      isValid = false
    }

    // Valider le champ password
    if (password.trim() === '') {
      setPasswordError('Password is required')
      isValid = false
    } else if (!isLength(password, { min: 8, max: 20 })) {
      setPasswordError('Password must be between 8 and 20 characters')
      isValid = false
    }

    return isValid
  }



  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={`/images/logos/logotaxivipjaune.png`} alt='logo' style={{ width: '90%', height: 'auto' }} />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>

          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              required
              autoFocus
              fullWidth
              id='email'
              label='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              sx={{ marginBottom: 4 }}
            />

            <FormControl fullWidth>
              <TextField
                required
                name='password'
                id='password'
                value={password}
                label='Password'
                type='password'
                onChange={e => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
              />
            </FormControl>
            {error && <Typography color='error'>{error}</Typography>}


            <Button
              fullWidth
              type="submit"
              size='large'
              variant='contained'
              sx={{ marginTop: 7 }}

            >
              Login
            </Button>


          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
