import {Link} from 'react-router-dom'
import useLogin from '../../hooks/useLogin'
import Alert from '@mui/material/Alert'
import Home from '../Home/home'
import './login.css'

const Login = () => {
  const {
    email,
    password,
    changeRoute,
    showAlert,
    messageAlert,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin()

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

export default Login
