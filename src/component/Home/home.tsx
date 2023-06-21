import React from 'react'
import QuizList from '../QuizList/QuizList'
import useFetchQuizs from '../../hooks/useFetchQuizs'
import QuizContextProvider from '../../context/QuizContext'

// type QuizListProps = {
//   quizs: {
//     _id: string
//     rounds: {
//       questions: string
//       responses: string[]
//       corrects: number[]
//     }[]
//     categories: string[]
//     name: string
//   }[]
// }

// const Home = ({quizs}: QuizListProps) => {
const Home = () => {
  // const {quizs} = useFetchQuizs()

  return (
    <div>
      {/* <QuizList quizs={quizs} /> */}
      <QuizList />
    </div>
  )
}

export default Home
