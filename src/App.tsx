import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './component/Home/home'
import QuizDetails from './component/QuizDetails/QuizDetails'
import CreateQuiz from './component/CreateQuiz/CreateQuiz'
import QuizContextProvider from './context/QuizContext'

function App() {
  return (
    <Router>
      <div>
        <QuizContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz/:id" element={<QuizDetails />} />
            <Route path="/createQuiz" element={<CreateQuiz />} />
          </Routes>
        </QuizContextProvider>
      </div>
    </Router>
  )
}

export default App