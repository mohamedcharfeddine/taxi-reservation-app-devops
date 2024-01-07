// ** React Imports
import { useState, Fragment } from 'react'
import { isEmail, isLength, isAlphanumeric } from 'validator'
import { register } from '../../api/appConfig'
import getConfig from 'next/config'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import RequireAdmin from 'src/@core/layouts/components/RequireAdmin'

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
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {
  // ** States
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if (validateFields()) {
      const response = await register(username, email, password)
      if (response.status === 201) {
        window.location.href = '/userManagement'
      } else {
        setError("Erreur d'inscription")
      }
    }
  }

  const validateFields = () => {
    let isValid = true

    // Réinitialiser les messages d'erreur
    setUsernameError('')
    setEmailError('')
    setPasswordError('')

    // Valider le champ username
    if (username.trim() === '') {
      setUsernameError('Username is required')
      isValid = false
    } else if (!isAlphanumeric(username)) {
      setUsernameError('Username must contain only letters and numbers')
      isValid = false
    } else if (!isLength(username, { min: 4, max: 20 })) {
      setUsernameError('Username must be between 4 and 20 characters')
      isValid = false
    }

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
    <RequireAdmin>
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={`/images/logos/logotaxivipjaune.png`} alt='logo' style={{ width: '90%', height: 'auto' }} />
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Adventure starts here 🚀
              </Typography>
              <Typography variant='body2'>Make your app management easy and fun!</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
              <TextField
                autoFocus
                required
                fullWidth
                id='username'
                label='Username'
                value={username}
                onChange={e => setUsername(e.target.value)}
                error={!!usernameError}
                helperText={usernameError}
                sx={{ marginBottom: 4 }}
              />
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
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
              <Button fullWidth type='submit' size='large' variant='contained' sx={{ marginBottom: 7, marginTop: 7 }}>
                Create
              </Button>
            </form>
          </CardContent>
        </Card>
        <FooterIllustrationsV1 />
      </Box>
    </RequireAdmin>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
