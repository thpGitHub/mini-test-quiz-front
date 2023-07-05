import React, {useEffect, useState} from 'react'
import QuizList from '../QuizList/QuizList'
import Login from '../Authenticate/Login'

const Home = () => {
  const [token, setToken] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(true)
    }
  }, [])

  const renderContent = () => {
    return token ? <QuizList /> : <Login />
  }

  return <div>{renderContent()}</div>
}

export default Home
