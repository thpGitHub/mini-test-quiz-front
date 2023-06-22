import React, {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './quizList.css'

import {Button} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import axios from 'axios'
import {QuizContext} from '../../context/QuizContext'
import useFetchQuizs from '../../hooks/useFetchQuizs'
import {log} from 'console'

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
  // const {quizs, updateQuizs} = useContext(QuizContext)
  // const {quizs} = useFetchQuizs()
  console.log('quiz in QuizList', quizs)

  const fetchQuizs = async () => {
    try {
      const response = await fetch('http://localhost:3000/quiz')
      if (!response.ok) {
        throw new Error('Failed to fetch quizs')
      }
      const data: QuizData = await response.json()
      setQuizs(data)
    } catch (err) {
      setError((err as Error).message)
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('in useeffect')
    fetchQuizs()
  }, [])

  const handleDeleteQuiz = async (id: number) => {
    console.log('quiz ID', id)
    // await fetchQuizs()
    console.log('quiz in handleDeleteQuiz', quizs)
    // updateQuizs()

    try {
      await axios.delete(`http://localhost:3000/quiz/${id}`)
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
