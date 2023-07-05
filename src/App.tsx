import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './component/Home/Home'
import QuizDetails from './component/QuizDetails/QuizDetails'
import CreateQuiz from './component/CreateQuiz/CreateQuiz'
import QuizContextProvider from './context/QuizContext'
import Login from './component/Authenticate/Login'
import Register from './component/Authenticate/Register'

function App() {
  return (
    <Router>
      <div>
        <QuizContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quiz/:id" element={<QuizDetails />} />
            <Route path="/createQuiz" element={<CreateQuiz />} />
          </Routes>
        </QuizContextProvider>
      </div>
    </Router>
  )
}

export default App
