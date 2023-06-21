import React, {useContext} from 'react'
import {Link} from 'react-router-dom'

import {Button} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import axios from 'axios'
import {QuizContext} from '../../context/QuizContext'

const QuizList = () => {
  const quizs = useContext(QuizContext)

  const handleDeleteQuiz = async (id: number) => {
    console.log('quiz ID', id)

    try {
      await axios.delete(`http://localhost:3000/quiz/${id}`)
    } catch (error) {
      console.error('Failed to delete quiz:', error)
      alert('Failed to delete quiz. Please try again later.')
    }
  }

  return (
    <div>
      <h1> List des Quizz</h1>
      <Link to={'/createQuiz'}>
        <Button variant="contained">Créer nouveau Quiz</Button>
      </Link>
      <div>
        {quizs
          ? quizs.map((quiz: any, index: number) => {
              return (
                <div key={index}>
                  <Link to={`/quiz/${index}`}>
                    <button>{quiz.name}</button>
                  </Link>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDeleteQuiz(quiz._id)}
                  >
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                  {}
                </div>
              )
            })
          : 'Aucun Quiz'}
      </div>
    </div>
  )
}

export default QuizList
