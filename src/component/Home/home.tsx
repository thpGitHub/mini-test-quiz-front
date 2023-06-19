import React from 'react'
import QuizList from '../QuizList/QuizList'

type QuizListProps = {
  quizs: {
    _id: string
    rounds: {
      questions: string
      responses: string[]
      corrects: number[]
    }[]
    categories: string[]
    name: string
  }[]
}

const Home = ({quizs}: QuizListProps) => {
  return (
    <div>
      <QuizList quizs={quizs} />
    </div>
  )
}

export default Home
