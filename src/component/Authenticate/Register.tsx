import axios, {AxiosError} from 'axios'
import React, {useState, ChangeEvent, FormEvent} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Alert, {AlertColor} from '@mui/material/Alert'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showAlert, setShowAlert] = useState<AlertColor | undefined>()
  const [messageAlert, setMessageAlert] = useState('')

  const navigate = useNavigate()

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      // const response = await axios.post('http://localhost:3000/register', {
      // const response = await axios.post('https://mini-test-quiz-back-production.up.railway.app/register', {
      await axios.post(
        'https://mini-test-quiz-back-production.up.railway.app/register',
        {
          email,
          password,
        },
      )
      setShowAlert('success')
      setMessageAlert('Register OK, Login please')

      setMessage('Registration successful')

      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (error) {
      const axiosError = error as AxiosError<any>

      if (
        axiosError.response?.status === 400 &&
        axiosError.response?.data.error === 'Email already exists'
      ) {
        setMessage('Email already exists')
      } else {
        console.error('Error:', axiosError.message)
        console.log(message);
        
        setMessage('Registration failed')
      }
    }
  }

  return (
    <>
      <div className="login-showAlert-container">
        {showAlert && (
          <Alert severity={showAlert} className="quiz-details-alert">
            {messageAlert}
          </Alert>
        )}
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-label-container">
            <label className="login-form-label" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="login-form-input"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="login-form-label-container">
            <label className="login-form-label" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="login-form-input"
              value={password}
              onChange={handlePasswordChange}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-form-button">
            Register
          </button>
          <p className="login-form-message">
            You have an account?{' '}
            <Link to="/login" className="login-form-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default RegisterForm
