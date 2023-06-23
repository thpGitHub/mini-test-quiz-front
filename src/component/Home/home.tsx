import React, {useEffect, useState} from 'react'
import QuizList from '../QuizList/QuizList'
import Login from '../Authenticate/Login'

const Home = () => {
  const [token, setToken] = useState(false)
  // const {quizs} = useFetchQuizs()
  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if the token exists in local storage
    if (token) {
      setToken(true)
    }
  }, [])

  return (
    <div>
      {/* <QuizList quizs={quizs} /> */}
      {token ? <QuizList /> : <Login />}
    </div>
  )
}

export default Home
