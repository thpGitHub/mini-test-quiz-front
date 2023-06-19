import React from 'react'
import {Link} from 'react-router-dom'

import {Button} from '@mui/material'

type QuizListProps = {
  quizs: any
}

const QuizList = ({quizs}: QuizListProps) => {
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
                </div>
              )
            })
          : 'Aucun Quiz'}
      </div>
    </div>
  )
}

export default QuizList
