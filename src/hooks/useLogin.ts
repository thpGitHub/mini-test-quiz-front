import {useState, ChangeEvent, FormEvent} from 'react'
import axios from 'axios'
import {AlertColor} from '@mui/material/Alert'

type LoginFormState = {
  email: string
  password: string
  changeRoute: boolean
  showAlert: AlertColor | undefined
  messageAlert: string
}

const useLogin = () => {
  const [state, setState] = useState<LoginFormState>({
    email: '',
    password: '',
    changeRoute: false,
    showAlert: undefined,
    messageAlert: '',
  })

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({
      ...prevState,
      email: e.target.value,
    }))
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({
      ...prevState,
      password: e.target.value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://mini-test-quiz-back-production.up.railway.app'
      console.log(process.env.NODE_ENV)
      const response = await axios.post(`${baseUrl}/login`, {
        email: state.email,
        password: state.password,
      })

      if (response.status === 200) {
        setState(prevState => ({
          ...prevState,
          showAlert: 'success',
          messageAlert: 'Login OK',
        }))

        setTimeout(() => {
          setState(prevState => ({
            ...prevState,
            showAlert: undefined,
          }))
        }, 3000)

        const token = response.data.token
        localStorage.setItem('token', token)

        setTimeout(() => {
          setState(prevState => ({
            ...prevState,
            changeRoute: true,
          }))
        }, 3000)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const messageAxiosError = error?.response?.data.error
        setState(prevState => ({
          ...prevState,
          showAlert: 'error',
          messageAlert: messageAxiosError,
        }))
      } else {
        console.error(error)
      }
    }
  }

  return {
    email: state.email,
    password: state.password,
    changeRoute: state.changeRoute,
    showAlert: state.showAlert,
    messageAlert: state.messageAlert,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  }
}

export default useLogin
