import React, {useEffect, useState} from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './component/Home/home'
import QuizDetails from './component/QuizDetails/QuizDetails'
import CreateQuiz from './component/CreateQuiz/CreateQuiz'

function App() {
  const [data, setData] = useState<any>()

  useEffect(() => {
    const controller = new AbortController()
    const {signal} = controller

    fetch('http://localhost:3000/quiz', {signal})
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted')
        } else {
          console.log(error)
        }
      })

    return () => {
      controller.abort()
    }
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home quizs={data} />} />
          <Route path="/quiz/:id" element={<QuizDetails quizs={data} />} />
          <Route path="/createQuiz" element={<CreateQuiz />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
