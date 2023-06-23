import React, {useState, ChangeEvent, FormEvent} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './login.css'
import Home from '../../component/Home/home'
import Alert, {AlertColor} from '@mui/material/Alert'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [changeRoute, setChangeRoute] = useState(false)
  const [showAlert, setShowAlert] = useState<AlertColor | undefined>()
  const [messageAlert, setMessageAlert] = useState('')

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      // const response = await axios.post('http://localhost:3000/login', {
      const response = await axios.post(
        'https://mini-test-quiz-back-production.up.railway.app/login',
        {
          email,
          password,
        },
      )
      if (response.status === 200) {
        setShowAlert('success')
        setMessageAlert('Login OK')

        setTimeout(() => {
          setShowAlert(undefined)
        }, 3000)

        const token = response.data.token
        localStorage.setItem('token', token)

        setTimeout(() => {
          setChangeRoute(true)
        }, 3000)
      } else {
        console.error('Login Error:', response.data.error)
      }
    } catch (error) {
      console.error('Error:', (error as Error).message)
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
      {changeRoute ? (
        <Home />
      ) : (
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
              Login
            </button>
            <p className="login-form-message">
              Don't have an account?{' '}
              <Link to="/register" className="login-form-link">
                Register
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  )
}

export default LoginForm
