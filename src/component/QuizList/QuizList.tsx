import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './quizList.css'

import {Button} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import axios from 'axios'
interface QuizData {
  name: string
  rounds: {
    questions: string
    responses: string[]
    corrects: number[]
  }[]
  categories: string[]
}

const QuizList = () => {
  const [quizs, setQuizs] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQuizs = async () => {
    try {
      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://mini-test-quiz-back-production.up.railway.app'

      const response = await axios.get(`${baseUrl}/quiz`)

      const data: QuizData = response.data
      setQuizs(data)
    } catch (err) {
      setError((err as Error).message)
      console.log(error)
      console.log(isLoading)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuizs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteQuiz = async (id: number) => {
    try {
      // await axios.delete(`http://localhost:3000/quiz/${id}`)
      await axios.delete(
        `https://mini-test-quiz-back-production.up.railway.app/quiz/${id}`,
      )
      fetchQuizs()
    } catch (error) {
      console.error('Failed to delete quiz:', error)
      alert('Failed to delete quiz. Please try again later.')
    }
  }

  return (
    <div className="quiz-list-container">
      <h1 className="quiz-list-heading">Liste des Quizz</h1>
      <Link to="/createQuiz" className="quiz-list-link">
        <Button
          variant="contained"
          sx={{marginBottom: '10px'}}
          className="quiz-list-button"
        >
          Créer nouveau Quiz
        </Button>
      </Link>
      <div>
        {quizs ? (
          quizs.map((quiz: any, index: number) => (
            <div className="quiz-list-item" key={index}>
              <Link to={`/quiz/${index}`} className="quiz-list-link">
                <button className="quiz-list-name">{quiz.name}</button>
              </Link>
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => handleDeleteQuiz(quiz._id)}
                className="quiz-list-delete-button"
              >
                <DeleteForeverOutlinedIcon />
              </IconButton>
            </div>
          ))
        ) : (
          <div>Aucun Quiz</div>
        )}
      </div>
    </div>
  )
}

export default QuizList
